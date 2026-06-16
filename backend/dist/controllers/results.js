import prisma from "../config/database.js";
import { sendSuccess, sendError } from "../utils/response.js";
export const getStudentResults = async (req, res) => {
    try {
        const studentId = String(req.params.studentId);
        const results = await prisma.result.findMany({
            where: { studentId },
            include: {
                answers: {
                    select: {
                        isCorrect: true,
                    },
                },
                quiz: {
                    select: {
                        id: true,
                        title: true,
                        type: true,
                        subject: {
                            select: { id: true, name: true },
                        },
                        chapter: {
                            select: { id: true, title: true },
                        },
                    },
                },
                _count: {
                    select: { answers: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });
        const resultsWithCorrectCount = results.map((result) => ({
            ...result,
            correctCount: result.answers?.filter((a) => a.isCorrect).length ?? 0,
        }));
        sendSuccess(res, resultsWithCorrectCount, "Student results retrieved successfully");
    }
    catch (error) {
        console.error("Error getting student results:", error);
        sendError(res, "Failed to retrieve student results", 500);
    }
};
export const getById = async (req, res) => {
    try {
        const id = String(req.params.id);
        const result = await prisma.result.findUnique({
            where: { id },
            include: {
                answers: {
                    include: {
                        question: {
                            select: {
                                id: true,
                                text: true,
                                options: true,
                                correctAnswer: true,
                                points: true,
                            },
                        },
                    },
                    orderBy: { createdAt: "asc" },
                },
                quiz: {
                    select: {
                        id: true,
                        title: true,
                        type: true,
                        subject: {
                            select: { id: true, name: true },
                        },
                        chapter: {
                            select: { id: true, title: true },
                        },
                    },
                },
                student: {
                    select: {
                        id: true,
                        nis: true,
                        kelas: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
        if (!result) {
            sendError(res, "Result not found", 404);
            return;
        }
        const enrichedResult = {
            ...result,
            correctCount: result.answers.filter((a) => a.isCorrect).length,
            incorrectCount: result.answers.filter((a) => !a.isCorrect).length,
        };
        sendSuccess(res, enrichedResult, "Result retrieved successfully");
    }
    catch (error) {
        console.error("Error getting result:", error);
        sendError(res, "Failed to retrieve result", 500);
    }
};
export default { getStudentResults, getById };
//# sourceMappingURL=results.js.map