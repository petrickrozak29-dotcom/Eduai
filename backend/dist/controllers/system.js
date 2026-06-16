import prisma from "../config/database.js";
import { sendError, sendSuccess } from "../utils/response.js";
export const status = async (_req, res) => {
    try {
        const [users, subjects, materials, quizzes] = await Promise.all([
            prisma.user.count(),
            prisma.subject.count(),
            prisma.material.count(),
            prisma.quiz.count(),
        ]);
        sendSuccess(res, {
            service: "EduPath-AI Backend",
            status: "healthy",
            timestamp: new Date().toISOString(),
            counters: { users, subjects, materials, quizzes },
        }, "Status sistem berhasil diambil");
    }
    catch (error) {
        sendError(res, "Gagal mengambil status sistem", 500, error.message);
    }
};
export const logs = async (_req, res) => {
    try {
        const systemLogs = await prisma.systemLog.findMany({
            take: 100,
            orderBy: { createdAt: "desc" },
            include: { user: { select: { id: true, name: true, role: true } } },
        });
        sendSuccess(res, systemLogs, "Log sistem berhasil diambil");
    }
    catch (error) {
        sendError(res, "Gagal mengambil log sistem", 500, error.message);
    }
};
export const createLog = async (req, res) => {
    try {
        const { action, details } = req.body;
        if (!action) {
            sendError(res, "Action wajib diisi", 400);
            return;
        }
        const log = await prisma.systemLog.create({
            data: {
                action,
                details: details || {},
                userId: req.user?.userId || null,
            },
        });
        sendSuccess(res, log, "Log sistem berhasil dibuat", 201);
    }
    catch (error) {
        sendError(res, "Gagal membuat log sistem", 500, error.message);
    }
};
export default { status, logs, createLog };
//# sourceMappingURL=system.js.map