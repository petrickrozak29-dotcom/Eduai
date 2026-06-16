import prisma from "../config/database.js";
import { sendSuccess, sendError } from "../utils/response.js";
export const getAll = async (_req, res) => {
    try {
        const teachers = await prisma.teacher.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        role: true,
                        avatar: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });
        sendSuccess(res, teachers, "Daftar guru berhasil diambil");
    }
    catch (error) {
        sendError(res, "Gagal mengambil daftar guru", 500);
    }
};
export const getById = async (req, res) => {
    try {
        const id = String(req.params.id);
        const teacher = await prisma.teacher.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        role: true,
                        avatar: true,
                    },
                },
                subjects: true,
            },
        });
        if (!teacher) {
            sendError(res, "Guru tidak ditemukan", 404);
            return;
        }
        sendSuccess(res, teacher, "Data guru berhasil diambil");
    }
    catch (error) {
        sendError(res, "Gagal mengambil data guru", 500);
    }
};
export const update = async (req, res) => {
    try {
        const id = String(req.params.id);
        const { nip, mataPelajaran, name } = req.body;
        const existingTeacher = await prisma.teacher.findUnique({
            where: { id },
            include: { user: true },
        });
        if (!existingTeacher) {
            sendError(res, "Guru tidak ditemukan", 404);
            return;
        }
        const updatedTeacher = await prisma.teacher.update({
            where: { id },
            data: {
                ...(nip !== undefined && { nip }),
                ...(mataPelajaran !== undefined && { mataPelajaran }),
                user: {
                    update: {
                        ...(name !== undefined && { name }),
                    },
                },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        role: true,
                        avatar: true,
                    },
                },
                subjects: true,
            },
        });
        sendSuccess(res, updatedTeacher, "Data guru berhasil diperbarui");
    }
    catch (error) {
        sendError(res, "Gagal memperbarui data guru", 500);
    }
};
export const remove = async (req, res) => {
    try {
        const id = String(req.params.id);
        const existingTeacher = await prisma.teacher.findUnique({
            where: { id },
        });
        if (!existingTeacher) {
            sendError(res, "Guru tidak ditemukan", 404);
            return;
        }
        await prisma.teacher.delete({ where: { id } });
        sendSuccess(res, null, "Guru berhasil dihapus");
    }
    catch (error) {
        sendError(res, "Gagal menghapus guru", 500);
    }
};
export const getTeacherSubjects = async (req, res) => {
    try {
        const id = String(req.params.id);
        const teacher = await prisma.teacher.findUnique({
            where: { id },
            select: { id: true },
        });
        if (!teacher) {
            sendError(res, "Guru tidak ditemukan", 404);
            return;
        }
        const subjects = await prisma.subject.findMany({
            where: { teacherId: id },
            include: {
                chapters: {
                    orderBy: { order: "asc" },
                },
            },
            orderBy: { createdAt: "desc" },
        });
        sendSuccess(res, subjects, "Mata pelajaran guru berhasil diambil");
    }
    catch (error) {
        sendError(res, "Gagal mengambil mata pelajaran guru", 500);
    }
};
//# sourceMappingURL=teachers.js.map