import prisma from "../config/database.js";
import { sendSuccess, sendError } from "../utils/response.js";
export const subjectController = {
    async getAll(req, res) {
        try {
            const { kelas, teacherId } = req.query;
            const where = {};
            if (kelas)
                where.kelas = String(kelas);
            if (teacherId)
                where.teacherId = String(teacherId);
            const subjects = await prisma.subject.findMany({
                where,
                include: {
                    teacher: {
                        select: {
                            id: true,
                            userId: true,
                            nip: true,
                            user: { select: { name: true, email: true } },
                        },
                    },
                    _count: {
                        select: {
                            chapters: true,
                            materials: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
            });
            sendSuccess(res, subjects, "Subjects retrieved successfully");
        }
        catch (error) {
            sendError(res, "Failed to retrieve subjects", 500, error.message);
        }
    },
    async getById(req, res) {
        try {
            const id = String(req.params.id);
            const subject = await prisma.subject.findUnique({
                where: { id },
                include: {
                    teacher: {
                        select: {
                            id: true,
                            userId: true,
                            nip: true,
                            user: { select: { name: true, email: true } },
                        },
                    },
                    chapters: {
                        orderBy: { order: "asc" },
                        include: {
                            materials: {
                                orderBy: { createdAt: "asc" },
                            },
                            _count: { select: { quizzes: true } },
                        },
                    },
                    materials: {
                        orderBy: { createdAt: "desc" },
                        include: {
                            chapter: { select: { id: true, title: true, order: true } },
                        },
                    },
                },
            });
            if (!subject) {
                sendError(res, "Subject not found", 404);
                return;
            }
            sendSuccess(res, subject, "Subject retrieved successfully");
        }
        catch (error) {
            sendError(res, "Failed to retrieve subject", 500, error.message);
        }
    },
    async create(req, res) {
        try {
            const { name, description, kelas, teacherId, imageUrl } = req.body;
            if (!name) {
                sendError(res, "Subject name is required", 400);
                return;
            }
            // If teacherId is provided, validate teacher exists
            if (teacherId) {
                const teacher = await prisma.teacher.findUnique({ where: { id: teacherId } });
                if (!teacher) {
                    sendError(res, "Teacher not found", 404);
                    return;
                }
            }
            const subject = await prisma.subject.create({
                data: {
                    name,
                    description: description || null,
                    kelas: kelas || null,
                    teacherId: teacherId || null,
                    imageUrl: imageUrl || null,
                },
                include: {
                    teacher: {
                        select: {
                            id: true,
                            nip: true,
                            user: { select: { name: true, email: true } },
                        },
                    },
                },
            });
            sendSuccess(res, subject, "Subject created successfully", 201);
        }
        catch (error) {
            sendError(res, "Failed to create subject", 500, error.message);
        }
    },
    async update(req, res) {
        try {
            const id = String(req.params.id);
            const { name, description, kelas, teacherId, imageUrl } = req.body;
            const existing = await prisma.subject.findUnique({ where: { id } });
            if (!existing) {
                sendError(res, "Subject not found", 404);
                return;
            }
            // If teacherId is provided, validate teacher exists
            if (teacherId) {
                const teacher = await prisma.teacher.findUnique({ where: { id: teacherId } });
                if (!teacher) {
                    sendError(res, "Teacher not found", 404);
                    return;
                }
            }
            const subject = await prisma.subject.update({
                where: { id },
                data: {
                    ...(name !== undefined && { name }),
                    ...(description !== undefined && { description }),
                    ...(kelas !== undefined && { kelas }),
                    ...(teacherId !== undefined && { teacherId }),
                    ...(imageUrl !== undefined && { imageUrl }),
                },
                include: {
                    teacher: {
                        select: {
                            id: true,
                            nip: true,
                            user: { select: { name: true, email: true } },
                        },
                    },
                },
            });
            sendSuccess(res, subject, "Subject updated successfully");
        }
        catch (error) {
            sendError(res, "Failed to update subject", 500, error.message);
        }
    },
    async remove(req, res) {
        try {
            const id = String(req.params.id);
            const existing = await prisma.subject.findUnique({ where: { id } });
            if (!existing) {
                sendError(res, "Subject not found", 404);
                return;
            }
            await prisma.subject.delete({ where: { id } });
            sendSuccess(res, null, "Subject deleted successfully");
        }
        catch (error) {
            sendError(res, "Failed to delete subject", 500, error.message);
        }
    },
};
export default subjectController;
//# sourceMappingURL=subjects.js.map