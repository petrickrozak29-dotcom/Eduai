import prisma from "../config/database.js";
import { sendSuccess, sendError } from "../utils/response.js";
export const materialController = {
    async getAll(req, res) {
        try {
            const { subjectId, chapterId } = req.query;
            const where = {};
            if (subjectId)
                where.subjectId = subjectId;
            if (chapterId)
                where.chapterId = chapterId;
            const materials = await prisma.material.findMany({
                where,
                include: {
                    subject: {
                        select: { id: true, name: true, kelas: true },
                    },
                    chapter: {
                        select: { id: true, title: true, order: true },
                    },
                },
                orderBy: { createdAt: "desc" },
            });
            sendSuccess(res, materials, "Materials retrieved successfully");
        }
        catch (error) {
            sendError(res, "Failed to retrieve materials", 500, error.message);
        }
    },
    async getById(req, res) {
        try {
            const id = String(req.params.id);
            const material = await prisma.material.findUnique({
                where: { id },
                include: {
                    subject: {
                        select: { id: true, name: true, kelas: true },
                    },
                    chapter: {
                        select: { id: true, title: true, order: true },
                    },
                },
            });
            if (!material) {
                sendError(res, "Material not found", 404);
                return;
            }
            sendSuccess(res, material, "Material retrieved successfully");
        }
        catch (error) {
            sendError(res, "Failed to retrieve material", 500, error.message);
        }
    },
    async create(req, res) {
        try {
            const { subjectId, chapterId, title, content, contentType } = req.body;
            if (!subjectId || !title) {
                sendError(res, "Subject ID and title are required", 400);
                return;
            }
            // Validate subject exists
            const subject = await prisma.subject.findUnique({ where: { id: subjectId } });
            if (!subject) {
                sendError(res, "Subject not found", 404);
                return;
            }
            // Validate chapter if provided
            if (chapterId) {
                const chapter = await prisma.chapter.findUnique({ where: { id: chapterId } });
                if (!chapter) {
                    sendError(res, "Chapter not found", 404);
                    return;
                }
            }
            const material = await prisma.material.create({
                data: {
                    subjectId,
                    chapterId: chapterId || null,
                    title,
                    content: content || "",
                    contentType: contentType || "text",
                },
                include: {
                    subject: {
                        select: { id: true, name: true, kelas: true },
                    },
                    chapter: {
                        select: { id: true, title: true, order: true },
                    },
                },
            });
            sendSuccess(res, material, "Material created successfully", 201);
        }
        catch (error) {
            sendError(res, "Failed to create material", 500, error.message);
        }
    },
    async update(req, res) {
        try {
            const id = String(req.params.id);
            const { subjectId, chapterId, title, content, contentType, imageUrl, profilA, profilB, profilC } = req.body;
            const existing = await prisma.material.findUnique({ where: { id } });
            if (!existing) {
                sendError(res, "Material not found", 404);
                return;
            }
            const material = await prisma.material.update({
                where: { id },
                data: {
                    ...(subjectId !== undefined && { subjectId }),
                    ...(chapterId !== undefined && { chapterId }),
                    ...(title !== undefined && { title }),
                    ...(content !== undefined && { content }),
                    ...(contentType !== undefined && { contentType }),
                    ...(imageUrl !== undefined && { imageUrl }),
                    ...(profilA !== undefined && { profilA }),
                    ...(profilB !== undefined && { profilB }),
                    ...(profilC !== undefined && { profilC }),
                },
                include: {
                    subject: {
                        select: { id: true, name: true },
                    },
                    chapter: {
                        select: { id: true, title: true, order: true },
                    },
                },
            });
            sendSuccess(res, material, "Material updated successfully");
        }
        catch (error) {
            sendError(res, "Failed to update material", 500, error.message);
        }
    },
    async remove(req, res) {
        try {
            const id = String(req.params.id);
            const existing = await prisma.material.findUnique({ where: { id } });
            if (!existing) {
                sendError(res, "Material not found", 404);
                return;
            }
            await prisma.material.delete({ where: { id } });
            sendSuccess(res, null, "Material deleted successfully");
        }
        catch (error) {
            sendError(res, "Failed to delete material", 500, error.message);
        }
    },
};
export default materialController;
//# sourceMappingURL=materials.js.map