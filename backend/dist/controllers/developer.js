import prisma from "../config/database.js";
import { sendError, sendSuccess } from "../utils/response.js";
export const dashboard = async (_req, res) => {
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
        const roleCount = (role) => usersByRole.find((item) => item.role === role)?._count.role ?? 0;
        sendSuccess(res, {
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
                teacher: { select: { mataPelajaran: true } },
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