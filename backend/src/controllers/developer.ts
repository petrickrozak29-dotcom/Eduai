import { Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../config/database.js";
import { AuthRequestType } from "../middleware/auth.js";
import { sendError, sendSuccess } from "../utils/response.js";

const userSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  kelas: true,
  nip: true,
  nis: true,
  createdAt: true,
  teacher: { select: { id: true, mataPelajaran: true } },
  student: { select: { id: true, kelas: true } },
  developer: { select: { id: true } },
};

export const dashboard = async (_req: AuthRequestType, res: Response): Promise<void> => {
  try {
    const [usersByRole, totalClasses, totalSubjects, totalMaterials, totalQuizzes, logs, recentUsers] = await Promise.all([
      prisma.user.groupBy({ by: ["role"], _count: { role: true } }),
      prisma.kelas.count(),
      prisma.subject.count(),
      prisma.material.count(),
      prisma.quiz.count(),
      prisma.systemLog.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true, role: true } } },
      }),
      prisma.user.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          nip: true,
          nis: true,
          kelas: true,
          createdAt: true,
          teacher: { select: { mataPelajaran: true } },
        },
      }),
    ]);

    const roleCount = (role: "GURU" | "SISWA" | "DEVELOPER") =>
      usersByRole.find((item) => item.role === role)?._count.role ?? 0;

    sendSuccess(
      res,
      {
        usersByRole,
        totals: {
          guru: roleCount("GURU"),
          siswa: roleCount("SISWA"),
          developer: roleCount("DEVELOPER"),
          classes: totalClasses,
          subjects: totalSubjects,
          materials: totalMaterials,
          quizzes: totalQuizzes,
        },
        platform: {
          totalClasses,
          totalSubjects,
          totalMaterials,
          totalQuizzes,
          uptime: "99.8%",
          aiQueue: "normal",
        },
        monitoring: {
          apiStatus: "healthy",
          aiUsage: totalMaterials + totalQuizzes,
          dailyActivity: totalMaterials * 2 + totalQuizzes,
        },
        logs,
        recentUsers,
      },
      "Dashboard developer berhasil diambil"
    );
  } catch (error) {
    sendError(res, "Gagal mengambil dashboard developer", 500, (error as Error).message);
  }
};

export const users = async (_req: AuthRequestType, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: userSelect,
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    sendSuccess(res, users, "Daftar user berhasil diambil");
  } catch (error) {
    sendError(res, "Gagal mengambil daftar user", 500, (error as Error).message);
  }
};

export const createUser = async (req: AuthRequestType, res: Response): Promise<void> => {
  try {
    const { email, password, name, role, nip, nis, kelas, mataPelajaran } = req.body;
    const parsedRole = ["SISWA", "GURU", "DEVELOPER"].includes(role) ? role : "SISWA";

    if (!email || !password || !name) {
      sendError(res, "Email, password, dan nama wajib diisi", 400);
      return;
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      sendError(res, "Email sudah terdaftar", 409);
      return;
    }

    const generatedIdentity = `${parsedRole}-${Date.now()}`;
    const teacherNip = nip || generatedIdentity;
    const studentNis = nis || generatedIdentity;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: parsedRole,
        nip: parsedRole === "GURU" ? teacherNip : null,
        nis: parsedRole === "SISWA" ? studentNis : null,
        kelas: parsedRole === "SISWA" ? kelas || null : null,
        ...(parsedRole === "GURU" && {
          teacher: { create: { nip: teacherNip, mataPelajaran: mataPelajaran || null } },
        }),
        ...(parsedRole === "SISWA" && {
          student: {
            create: {
              nis: studentNis,
              kelas: kelas || null,
              learningProfile: { create: { learningIndex: 0, recommendations: [] } },
            },
          },
        }),
        ...(parsedRole === "DEVELOPER" && { developer: { create: {} } }),
      } as any,
      select: userSelect,
    });

    await prisma.systemLog.create({
      data: {
        action: "CREATE_USER",
        userId: req.user?.userId,
        details: { targetUserId: user.id, role: user.role },
      },
    });

    sendSuccess(res, user, "Akun berhasil dibuat", 201);
  } catch (error) {
    sendError(res, "Gagal membuat akun", 500, (error as Error).message);
  }
};

export const updateUser = async (req: AuthRequestType, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { email, password, name, nip, nis, kelas, mataPelajaran } = req.body;

    const existing = await prisma.user.findUnique({
      where: { id },
      include: { teacher: true, student: true, developer: true },
    });

    if (!existing) {
      sendError(res, "Akun tidak ditemukan", 404);
      return;
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(email !== undefined && { email }),
        ...(name !== undefined && { name }),
        ...(hashedPassword && { password: hashedPassword }),
        ...(existing.role === "GURU" && nip !== undefined && { nip }),
        ...(existing.role === "SISWA" && nis !== undefined && { nis }),
        ...(existing.role === "SISWA" && kelas !== undefined && { kelas }),
        ...(existing.role === "GURU" &&
          existing.teacher && {
            teacher: {
              update: {
                ...(nip !== undefined && { nip }),
                ...(mataPelajaran !== undefined && { mataPelajaran }),
              },
            },
          }),
        ...(existing.role === "SISWA" &&
          existing.student && {
            student: {
              update: {
                ...(nis !== undefined && { nis }),
                ...(kelas !== undefined && { kelas }),
              },
            },
          }),
      } as any,
      select: userSelect,
    });

    await prisma.systemLog.create({
      data: {
        action: "UPDATE_USER",
        userId: req.user?.userId,
        details: { targetUserId: user.id, role: user.role },
      },
    });

    sendSuccess(res, user, "Akun berhasil diperbarui");
  } catch (error) {
    sendError(res, "Gagal memperbarui akun", 500, (error as Error).message);
  }
};

export const deleteUser = async (req: AuthRequestType, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);

    if (req.user?.userId === id) {
      sendError(res, "Akun yang sedang digunakan tidak bisa dihapus", 400);
      return;
    }

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      sendError(res, "Akun tidak ditemukan", 404);
      return;
    }

    await prisma.systemLog.create({
      data: {
        action: "DELETE_USER",
        userId: req.user?.userId,
        details: { targetUserId: id, role: existing.role },
      },
    });
    await prisma.systemLog.updateMany({ where: { userId: id }, data: { userId: null } });
    await prisma.user.delete({ where: { id } });

    sendSuccess(res, null, "Akun berhasil dihapus");
  } catch (error) {
    sendError(res, "Gagal menghapus akun", 500, (error as Error).message);
  }
};

export default { dashboard, users, createUser, updateUser, deleteUser };
