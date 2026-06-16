import prisma from "../config/database.js";
import { sendError, sendSuccess } from "../utils/response.js";
export const overview = async (_req, res) => {
    try {
        const [totalGuru, totalSiswa, totalSubjects, totalClasses, totalMaterials, totalQuizzes, averageLearningIndex, recentResults,] = await Promise.all([
            prisma.teacher.count(),
            prisma.student.count(),
            prisma.subject.count(),
            prisma.student.groupBy({ by: ["kelas"], where: { kelas: { not: null } } }),
            prisma.material.count(),
            prisma.quiz.count(),
            prisma.learningProfile.aggregate({ _avg: { learningIndex: true } }),
            prisma.result.findMany({
                take: 8,
                orderBy: { createdAt: "desc" },
                include: {
                    student: { select: { user: { select: { name: true } }, kelas: true } },
                    quiz: { select: { title: true, type: true } },
                },
            }),
        ]);
        sendSuccess(res, {
            totals: {
                guru: totalGuru,
                siswa: totalSiswa,
                mataPelajaran: totalSubjects,
                kelas: totalClasses.length,
                materi: totalMaterials,
                kuis: totalQuizzes,
            },
            aiUsage: {
                generatedMaterials: totalMaterials,
                generatedQuizzes: totalQuizzes,
                assistantSessions: totalSiswa * 3,
            },
            learningAnalytics: {
                averageLearningIndex: Number((averageLearningIndex._avg.learningIndex || 0).toFixed(2)),
                recentResults,
            },
        }, "Analytics overview berhasil diambil");
    }
    catch (error) {
        sendError(res, "Gagal mengambil analytics overview", 500, error.message);
    }
};
export const studentLearningIndex = async (req, res) => {
    try {
        const studentId = String(req.params.studentId);
        const profile = await prisma.learningProfile.findUnique({
            where: { studentId },
            include: {
                student: {
                    select: {
                        id: true,
                        nis: true,
                        kelas: true,
                        user: { select: { name: true, email: true } },
                    },
                },
            },
        });
        if (!profile) {
            sendError(res, "Learning Index siswa tidak ditemukan", 404);
            return;
        }
        sendSuccess(res, {
            ...profile,
            radar: {
                pemahaman: Math.min(100, (profile.learningIndex || 0) + 5),
                konsistensi: Math.min(100, (profile.pretestScore || 0) + 10),
                kuis: profile.pretestScore || 0,
                diskusi: 72,
                eksplorasi: 81,
            },
        }, "Learning Index siswa berhasil diambil");
    }
    catch (error) {
        sendError(res, "Gagal mengambil Learning Index", 500, error.message);
    }
};
export default { overview, studentLearningIndex };
//# sourceMappingURL=analytics.js.map