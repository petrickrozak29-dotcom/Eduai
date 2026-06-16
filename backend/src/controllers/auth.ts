import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../config/database.js";
import { generateToken, AuthRequestType } from "../middleware/auth.js";
import { sendError, sendSuccess } from "../utils/response.js";
import { Role } from "../generated/prisma/client.js";

const safeUserSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  nip: true,
  nis: true,
  kelas: true,
  avatar: true,
  createdAt: true,
  teacher: true,
  student: {
    include: {
      learningProfile: true,
    },
  },
  developer: true,
};

function parseRole(role?: string): Role {
  if (role === Role.GURU || role === Role.DEVELOPER || role === Role.SISWA) {
    return role;
  }
  return Role.SISWA;
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, role, nip, nis, kelas, avatar, mataPelajaran } = req.body;

    if (!email || !password || !name) {
      sendError(res, "Email, password, dan nama wajib diisi", 400);
      return;
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      sendError(res, "Email sudah terdaftar", 409);
      return;
    }

    const parsedRole = parseRole(role);
    const hashedPassword = await bcrypt.hash(password, 10);
    const generatedIdentity = `${parsedRole}-${Date.now()}`;
    const teacherNip = nip || generatedIdentity;
    const studentNis = nis || generatedIdentity;

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: parsedRole,
        avatar: avatar || null,
        nip: parsedRole === Role.GURU ? teacherNip : null,
        nis: parsedRole === Role.SISWA ? studentNis : null,
        kelas: parsedRole === Role.SISWA ? kelas || null : null,
        ...(parsedRole === Role.GURU && {
          teacher: {
            create: {
              nip: teacherNip,
              mataPelajaran: mataPelajaran || null,
            },
          },
        }),
        ...(parsedRole === Role.SISWA && {
          student: {
            create: {
              nis: studentNis,
              kelas: kelas || null,
              learningProfile: {
                create: {
                  learningStyle: null,
                  cognitiveLevel: null,
                  pretestScore: null,
                  learningIndex: 0,
                  recommendations: [],
                },
              },
            },
          },
        }),
        ...(parsedRole === Role.DEVELOPER && {
          developer: {
            create: {},
          },
        }),
      },
      select: safeUserSelect,
    });

    const token = generateToken({ userId: user.id, email: user.email, role: user.role });
    sendSuccess(res, { user, token }, "Registrasi berhasil", 201);
  } catch (error) {
    sendError(res, "Gagal melakukan registrasi", 500, (error as Error).message);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      sendError(res, "Email dan password wajib diisi", 400);
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        teacher: true,
        student: { include: { learningProfile: true } },
        developer: true,
      },
    });

    if (!user) {
      sendError(res, "Email atau password salah", 401);
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      sendError(res, "Email atau password salah", 401);
      return;
    }

    const { password: _password, ...safeUser } = user;
    const token = generateToken({ userId: user.id, email: user.email, role: user.role });

    sendSuccess(res, { user: safeUser, token }, "Login berhasil");
  } catch (error) {
    sendError(res, "Gagal melakukan login", 500, (error as Error).message);
  }
};

export const me = async (req: AuthRequestType, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      sendError(res, "Unauthorized", 401);
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: safeUserSelect,
    });

    if (!user) {
      sendError(res, "User tidak ditemukan", 404);
      return;
    }

    sendSuccess(res, user, "Profil berhasil diambil");
  } catch (error) {
    sendError(res, "Gagal mengambil profil", 500, (error as Error).message);
  }
};

export default { register, login, me };
