import prisma from "../config/database.js";
import { sendSuccess, sendError, sendPaginated } from "../utils/response.js";
export const getAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const [students, total] = await Promise.all([
            prisma.student.findMany({
                skip,
                take: limit,
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
            }),
            prisma.student.count(),
        ]);
        sendPaginated(res, students, total, page, limit, "Daftar siswa berhasil diambil");
    }
    catch (error) {
        sendError(res, "Gagal mengambil daftar siswa", 500);
    }
};
export const getById = async (req, res) => {
    try {
        const id = String(req.params.id);
        const student = await prisma.student.findUnique({
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
                learningProfile: true,
                results: {
                    include: {
                        quiz: {
                            select: {
                                id: true,
                                title: true,
                                type: true,
                            },
                        },
                    },
                    orderBy: { createdAt: "desc" },
                },
            },
        });
        if (!student) {
            sendError(res, "Siswa tidak ditemukan", 404);
            return;
        }
        sendSuccess(res, student, "Data siswa berhasil diambil");
    }
    catch (error) {
        sendError(res, "Gagal mengambil data siswa", 500);
    }
};
export const update = async (req, res) => {
    try {
        const id = String(req.params.id);
        const { kelas, nis, name } = req.body;
        const existingStudent = await prisma.student.findUnique({
            where: { id },
            include: { user: true },
        });
        if (!existingStudent) {
            sendError(res, "Siswa tidak ditemukan", 404);
            return;
        }
        const updatedStudent = await prisma.student.update({
            where: { id },
            data: {
                ...(kelas !== undefined && { kelas }),
                ...(nis !== undefined && { nis }),
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
                learningProfile: true,
            },
        });
        sendSuccess(res, updatedStudent, "Data siswa berhasil diperbarui");
    }
    catch (error) {
        sendError(res, "Gagal memperbarui data siswa", 500);
    }
};
export const remove = async (req, res) => {
    try {
        const id = String(req.params.id);
        const existingStudent = await prisma.student.findUnique({
            where: { id },
        });
        if (!existingStudent) {
            sendError(res, "Siswa tidak ditemukan", 404);
            return;
        }
        // Cascade delete: the Student delete will cascade to user due to onDelete: Cascade
        await prisma.student.delete({ where: { id } });
        sendSuccess(res, null, "Siswa berhasil dihapus");
    }
    catch (error) {
        sendError(res, "Gagal menghapus siswa", 500);
    }
};
//# sourceMappingURL=students.js.map