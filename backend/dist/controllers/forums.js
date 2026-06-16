import prisma from "../config/database.js";
import { sendError, sendSuccess } from "../utils/response.js";
export const getAll = async (req, res) => {
    try {
        const { subjectId } = req.query;
        const forums = await prisma.forum.findMany({
            where: subjectId ? { subjectId: String(subjectId) } : {},
            include: {
                user: { select: { id: true, name: true, role: true, avatar: true } },
                subject: { select: { id: true, name: true } },
                _count: { select: { replies: true } },
            },
            orderBy: { createdAt: "desc" },
        });
        sendSuccess(res, forums, "Forum berhasil diambil");
    }
    catch (error) {
        sendError(res, "Gagal mengambil forum", 500, error.message);
    }
};
export const getById = async (req, res) => {
    try {
        const id = String(req.params.id);
        const forum = await prisma.forum.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, name: true, role: true, avatar: true } },
                subject: { select: { id: true, name: true } },
                replies: {
                    include: { user: { select: { id: true, name: true, role: true, avatar: true } } },
                    orderBy: { createdAt: "asc" },
                },
            },
        });
        if (!forum) {
            sendError(res, "Forum tidak ditemukan", 404);
            return;
        }
        sendSuccess(res, forum, "Detail forum berhasil diambil");
    }
    catch (error) {
        sendError(res, "Gagal mengambil detail forum", 500, error.message);
    }
};
export const create = async (req, res) => {
    try {
        if (!req.user) {
            sendError(res, "Unauthorized", 401);
            return;
        }
        const { title, content, subjectId } = req.body;
        if (!title || !content) {
            sendError(res, "Title dan content wajib diisi", 400);
            return;
        }
        const forum = await prisma.forum.create({
            data: {
                title,
                content,
                subjectId: subjectId || null,
                userId: req.user.userId,
            },
            include: { user: { select: { name: true, role: true } }, subject: true },
        });
        sendSuccess(res, forum, "Forum berhasil dibuat", 201);
    }
    catch (error) {
        sendError(res, "Gagal membuat forum", 500, error.message);
    }
};
export const reply = async (req, res) => {
    try {
        if (!req.user) {
            sendError(res, "Unauthorized", 401);
            return;
        }
        const { content } = req.body;
        if (!content) {
            sendError(res, "Content wajib diisi", 400);
            return;
        }
        const id = String(req.params.id);
        const existing = await prisma.forum.findUnique({ where: { id } });
        if (!existing) {
            sendError(res, "Forum tidak ditemukan", 404);
            return;
        }
        const forumReply = await prisma.forumReply.create({
            data: {
                forumId: id,
                userId: req.user.userId,
                content,
            },
            include: { user: { select: { name: true, role: true, avatar: true } } },
        });
        sendSuccess(res, forumReply, "Balasan forum berhasil dibuat", 201);
    }
    catch (error) {
        sendError(res, "Gagal membalas forum", 500, error.message);
    }
};
export default { getAll, getById, create, reply };
//# sourceMappingURL=forums.js.map