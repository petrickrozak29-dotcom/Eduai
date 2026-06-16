import prisma from "../config/database.js";
import { sendError, sendSuccess } from "../utils/response.js";
export const dashboard = async (_req, res) => {
    try {
        const [usersByRole, totalSubjects, totalMaterials, totalQuizzes, logs] = await Promise.all([
            prisma.user.groupBy({ by: ["role"], _count: { role: true } }),
            prisma.subject.count(),
            prisma.material.count(),
            prisma.quiz.count(),
            prisma.systemLog.findMany({
                take: 10,
                orderBy: { createdAt: "desc" },
                include: { user: { select: { name: true, role: true } } },
            }),
        ]);
        sendSuccess(res, {
            usersByRole,
            platform: {
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
        }, "Dashboard developer berhasil diambil");
    }
    catch (error) {
        sendError(res, "Gagal mengambil dashboard developer", 500, error.message);
    }
};
export const users = async (_req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                kelas: true,
                nip: true,
                nis: true,
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
            take: 100,
        });
        sendSuccess(res, users, "Daftar user berhasil diambil");
    }
    catch (error) {
        sendError(res, "Gagal mengambil daftar user", 500, error.message);
    }
};
export default { dashboard, users };
//# sourceMappingURL=developer.js.map