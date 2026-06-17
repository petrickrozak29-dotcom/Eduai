import { Response } from "express";
import prisma from "../config/database.js";
import { AuthRequestType } from "../middleware/auth.js";
import { sendSuccess, sendError } from "../utils/response.js";

const validSpecializations = ["MIPA", "IPS", "BAHASA", "VOKASI"];

function generateClassCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function normalizeCode(code?: string): string {
  return String(code || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 8);
}

function normalizeSpecialization(value?: string | null): string | null {
  if (!value) return null;
  const normalized = value.toUpperCase();
  return validSpecializations.includes(normalized) ? normalized : null;
}

function pretestLevel(score: number): "TIDAK_PAHAM" | "KURANG_PAHAM" | "PAHAM" {
  if (score < 40) return "TIDAK_PAHAM";
  if (score < 80) return "KURANG_PAHAM";
  return "PAHAM";
}

async function createUniqueClassCode(preferred?: string): Promise<string> {
  const cleaned = normalizeCode(preferred);
  if (cleaned.length >= 5) {
    const existing = await prisma.kelas.findUnique({ where: { classCode: cleaned } });
    if (!existing) return cleaned;
  }

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const generated = generateClassCode();
    const existing = await prisma.kelas.findUnique({ where: { classCode: generated } });
    if (!existing) return generated;
  }

  return `${Date.now()}`.slice(-8);
}

export const classController = {
  async getAll(req: AuthRequestType, res: Response): Promise<void> {
    try {
      const classes = await prisma.kelas.findMany({
        include: {
          teacher: {
            select: { id: true, nip: true, user: { select: { name: true, email: true } } },
          },
          subject: { select: { id: true, name: true } },
          _count: { select: { enrollments: true, materials: true } },
        },
        orderBy: { createdAt: "desc" },
      });
      sendSuccess(res, classes, "Classes retrieved");
    } catch (error) {
      sendError(res, "Failed to get classes", 500, (error as Error).message);
    }
  },

  async getMyClasses(req: AuthRequestType, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;
      const teacher = await prisma.teacher.findUnique({ where: { userId } });
      if (!teacher) { sendError(res, "Teacher not found", 404); return; }
      const classes = await prisma.kelas.findMany({
        where: { teacherId: teacher.id },
        include: {
          subject: { select: { id: true, name: true, category: true, specialization: true } },
          _count: { select: { enrollments: true, materials: true } },
          enrollments: {
            include: {
              student: {
                select: { id: true, nis: true, user: { select: { name: true, email: true } } },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
      sendSuccess(res, classes, "My classes retrieved");
    } catch (error) {
      sendError(res, "Failed to get classes", 500, (error as Error).message);
    }
  },

  async getById(req: AuthRequestType, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const cls = await prisma.kelas.findUnique({
        where: { id },
        include: {
          teacher: { include: { user: { select: { name: true } } } },
          subject: true,
          enrollments: {
            include: {
              student: {
                include: {
                  user: { select: { name: true, email: true } },
                  learningProfile: true,
                  results: { orderBy: { createdAt: "desc" }, take: 10 },
                },
              },
            },
          },
          materials: { include: { material: true } },
        },
      });
      if (!cls) { sendError(res, "Class not found", 404); return; }
      sendSuccess(res, cls, "Class retrieved");
    } catch (error) {
      sendError(res, "Failed to get class", 500, (error as Error).message);
    }
  },

  async create(req: AuthRequestType, res: Response): Promise<void> {
    try {
      const { name, phase, classLevel, specialization, category, subjectId, subjectName, classCode, description } = req.body;
      if (!name || !phase) { sendError(res, "Nama kelas dan fase wajib diisi", 400); return; }
      if (!["E", "F"].includes(String(phase))) { sendError(res, "Fase harus E atau F", 400); return; }
      if (!subjectId && !subjectName) { sendError(res, "Mata pelajaran wajib diisi", 400); return; }

      const userId = req.user!.userId;
      const teacher = await prisma.teacher.findUnique({ where: { userId } });
      if (!teacher) { sendError(res, "Teacher not found", 404); return; }

      const normalizedSpecialization = normalizeSpecialization(specialization);
      const resolvedCategory = category === "peminatan" && normalizedSpecialization ? "peminatan" : "umum";
      const resolvedSubject = subjectId
        ? await prisma.subject.findUnique({ where: { id: String(subjectId) } })
        : await prisma.subject.create({
            data: {
              name: String(subjectName).trim(),
              category: resolvedCategory,
              specialization: normalizedSpecialization as any,
              teacherId: teacher.id,
              kelas: phase === "E" ? "X" : String(classLevel || "XI"),
            },
          });

      if (!resolvedSubject) { sendError(res, "Mata pelajaran tidak ditemukan", 404); return; }

      const uniqueClassCode = await createUniqueClassCode(classCode);

      const cls = await prisma.kelas.create({
        data: {
          name,
          classCode: uniqueClassCode,
          phase: phase as any,
          classLevel: phase === "E" ? "X" : String(classLevel || "XI"),
          specialization: normalizedSpecialization as any,
          category: resolvedCategory,
          teacherId: teacher.id,
          subjectId: resolvedSubject.id,
          description: description || null,
        },
        include: {
          subject: true,
          enrollments: {
            include: { student: { select: { id: true, nis: true, user: { select: { name: true, email: true } } } } },
          },
          _count: { select: { enrollments: true, materials: true } },
        },
      });
      sendSuccess(res, cls, "Class created", 201);
    } catch (error) {
      sendError(res, "Failed to create class", 500, (error as Error).message);
    }
  },

  async update(req: AuthRequestType, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const { name, phase, classLevel, specialization, subjectId, description, isActive } = req.body;
      const existing = await prisma.kelas.findUnique({ where: { id } });
      if (!existing) { sendError(res, "Class not found", 404); return; }

      const cls = await prisma.kelas.update({
        where: { id },
        data: {
          ...(name !== undefined && { name }),
          ...(phase !== undefined && { phase }),
          ...(classLevel !== undefined && { classLevel }),
          ...(specialization !== undefined && { specialization: normalizeSpecialization(specialization) as any }),
          ...(subjectId !== undefined && { subjectId }),
          ...(description !== undefined && { description }),
          ...(isActive !== undefined && { isActive }),
        },
      });
      sendSuccess(res, cls, "Class updated");
    } catch (error) {
      sendError(res, "Failed to update class", 500, (error as Error).message);
    }
  },

  async remove(req: AuthRequestType, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      await prisma.kelas.delete({ where: { id } });
      sendSuccess(res, null, "Class deleted");
    } catch (error) {
      sendError(res, "Failed to delete class", 500, (error as Error).message);
    }
  },

  async joinByCode(req: AuthRequestType, res: Response): Promise<void> {
    try {
      const { classCode } = req.body;
      if (!classCode) { sendError(res, "Class code required", 400); return; }

      const cls = await prisma.kelas.findUnique({ where: { classCode, isActive: true } });
      if (!cls) { sendError(res, "Class not found or inactive", 404); return; }

      const userId = req.user!.userId;
      const student = await prisma.student.findUnique({ where: { userId } });
      if (!student) { sendError(res, "Student not found", 404); return; }

      const existing = await prisma.classStudent.findUnique({
        where: { kelasId_studentId: { kelasId: cls.id, studentId: student.id } },
      });
      if (existing) { sendError(res, "Already enrolled in this class", 409); return; }

      const enrollment = await prisma.classStudent.create({
        data: { kelasId: cls.id, studentId: student.id },
        include: { kelas: { include: { subject: true, teacher: { include: { user: { select: { name: true } } } } } } },
      });
      sendSuccess(res, enrollment, "Joined class successfully", 201);
    } catch (error) {
      sendError(res, "Failed to join class", 500, (error as Error).message);
    }
  },

  async getStudentClasses(req: AuthRequestType, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;
      const student = await prisma.student.findUnique({ where: { userId } });
      if (!student) { sendError(res, "Student not found", 404); return; }

      const enrollments = await prisma.classStudent.findMany({
        where: { studentId: student.id },
        include: {
          kelas: {
            include: {
              subject: true,
              teacher: { include: { user: { select: { name: true } } } },
              materials: { include: { material: true } },
              _count: { select: { forums: true } },
            },
          },
        },
        orderBy: { joinedAt: "desc" },
      });
      sendSuccess(res, enrollments, "Student classes retrieved");
    } catch (error) {
      sendError(res, "Failed to get classes", 500, (error as Error).message);
    }
  },

  async submitPretest(req: AuthRequestType, res: Response): Promise<void> {
    try {
      const kelasId = String(req.params.id);
      const score = Math.max(0, Math.min(100, Number(req.body.score ?? 0)));
      const level = pretestLevel(score);

      const userId = req.user!.userId;
      const student = await prisma.student.findUnique({ where: { userId } });
      if (!student) { sendError(res, "Student not found", 404); return; }

      const enrollment = await prisma.classStudent.findUnique({
        where: { kelasId_studentId: { kelasId, studentId: student.id } },
      });
      if (!enrollment) { sendError(res, "Siswa belum bergabung di kelas ini", 404); return; }

      const updated = await prisma.classStudent.update({
        where: { id: enrollment.id },
        data: {
          pretestScore: score,
          pretestLevel: level,
          learningIndex: score,
        },
        include: { kelas: { include: { subject: true, materials: { include: { material: true } } } } },
      });

      await prisma.learningProfile.upsert({
        where: { studentId: student.id },
        create: {
          studentId: student.id,
          pretestScore: score,
          cognitiveLevel: level,
          learningIndex: score,
          recommendations: ["Baca materi sesuai level pretest", "Kerjakan kuis per bab", "Gunakan AI Assistant saat menemui konsep sulit"],
        },
        update: {
          pretestScore: score,
          cognitiveLevel: level,
          learningIndex: score,
        },
      });

      sendSuccess(res, updated, "Pretest berhasil disimpan");
    } catch (error) {
      sendError(res, "Failed to submit pretest", 500, (error as Error).message);
    }
  },

  async addMaterial(req: AuthRequestType, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const { materialId } = req.body;
      if (!materialId) { sendError(res, "Material ID required", 400); return; }

      const cm = await prisma.classMaterial.create({
        data: { kelasId: id, materialId },
        include: { material: true },
      });
      sendSuccess(res, cm, "Material added to class", 201);
    } catch (error) {
      sendError(res, "Failed to add material", 500, (error as Error).message);
    }
  },

  async removeMaterial(req: AuthRequestType, res: Response): Promise<void> {
    try {
      const id = String(req.params.materialId);
      await prisma.classMaterial.delete({ where: { id } });
      sendSuccess(res, null, "Material removed");
    } catch (error) {
      sendError(res, "Failed to remove material", 500, (error as Error).message);
    }
  },
};

export default classController;
