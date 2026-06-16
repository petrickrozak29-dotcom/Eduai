import { Response } from "express";
import prisma from "../config/database.js";
import { AuthRequestType } from "../middleware/auth.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const getAll = async (req: AuthRequestType, res: Response): Promise<void> => {
  try {
    const { subjectId, chapterId, type } = req.query;

    const where: any = {};
    if (subjectId) where.subjectId = subjectId as string;
    if (chapterId) where.chapterId = chapterId as string;
    if (type) where.type = type as string;

    const quizzes = await prisma.quiz.findMany({
      where,
      include: {
        _count: {
          select: { questions: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    sendSuccess(res, quizzes, "Quiz list retrieved successfully");
  } catch (error) {
    console.error("Error getting quizzes:", error);
    sendError(res, "Failed to retrieve quizzes", 500);
  }
};

export const getById = async (req: AuthRequestType, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);

    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          select: {
            id: true,
            text: true,
            options: true,
            points: true,
          },
          orderBy: { createdAt: "asc" },
        },
        subject: {
          select: { id: true, name: true },
        },
        chapter: {
          select: { id: true, title: true },
        },
      },
    });

    if (!quiz) {
      sendError(res, "Quiz not found", 404);
      return;
    }

    sendSuccess(res, quiz, "Quiz retrieved successfully");
  } catch (error) {
    console.error("Error getting quiz:", error);
    sendError(res, "Failed to retrieve quiz", 500);
  }
};

export const create = async (req: AuthRequestType, res: Response): Promise<void> => {
  try {
    const { chapterId, subjectId, title, type, questions } = req.body;

    if (!subjectId || !title) {
      sendError(res, "subjectId and title are required", 400);
      return;
    }

    const quiz = await prisma.quiz.create({
      data: {
        chapterId: chapterId || null,
        subjectId,
        title,
        type: type || "bab",
        questions: questions && questions.length > 0
          ? {
              create: questions.map((q: { text: string; options: Record<string, string>; correctAnswer: string; points?: number }) => ({
                text: q.text,
                options: q.options,
                correctAnswer: q.correctAnswer,
                points: q.points || 10,
              })),
            }
          : undefined,
      },
      include: {
        questions: true,
      },
    });

    sendSuccess(res, quiz, "Quiz created successfully", 201);
  } catch (error) {
    console.error("Error creating quiz:", error);
    sendError(res, "Failed to create quiz", 500);
  }
};

export const update = async (req: AuthRequestType, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { chapterId, subjectId, title, type, questions } = req.body;

    const existing = await prisma.quiz.findUnique({ where: { id } });
    if (!existing) {
      sendError(res, "Quiz not found", 404);
      return;
    }

    // Update quiz fields
    const quiz = await prisma.quiz.update({
      where: { id },
      data: {
        ...(chapterId !== undefined && { chapterId: chapterId || null }),
        ...(subjectId !== undefined && { subjectId }),
        ...(title !== undefined && { title }),
        ...(type !== undefined && { type }),
      },
    });

    // If questions provided, replace them
    if (questions && questions.length > 0) {
      await prisma.question.deleteMany({ where: { quizId: id } });
      await prisma.question.createMany({
        data: questions.map((q: { text: string; options: Record<string, string>; correctAnswer: string; points?: number }) => ({
          quizId: id,
          text: q.text,
          options: q.options,
          correctAnswer: q.correctAnswer,
          points: q.points || 10,
        })),
      });
    }

    const updated = await prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });

    sendSuccess(res, updated, "Quiz updated successfully");
  } catch (error) {
    console.error("Error updating quiz:", error);
    sendError(res, "Failed to update quiz", 500);
  }
};

export const remove = async (req: AuthRequestType, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);

    const existing = await prisma.quiz.findUnique({ where: { id } });
    if (!existing) {
      sendError(res, "Quiz not found", 404);
      return;
    }

    await prisma.quiz.delete({ where: { id } });

    sendSuccess(res, null, "Quiz deleted successfully");
  } catch (error) {
    console.error("Error deleting quiz:", error);
    sendError(res, "Failed to delete quiz", 500);
  }
};

export const submit = async (req: AuthRequestType, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      sendError(res, "answers array is required", 400);
      return;
    }

    // Verify the quiz exists
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          select: {
            id: true,
            correctAnswer: true,
            points: true,
          },
        },
      },
    });

    if (!quiz) {
      sendError(res, "Quiz not found", 404);
      return;
    }

    // Get student record from authenticated user
    const student = await prisma.student.findUnique({
      where: { userId: req.user!.userId },
    });

    if (!student) {
      sendError(res, "Student profile not found", 404);
      return;
    }

    // Map answers for quick lookup
    const answerMap = new Map<string, string>();
    for (const a of answers) {
      answerMap.set(a.questionId, a.answer);
    }

    // Calculate score
    let score = 0;
    let totalPoints = 0;
    const answerRecords: Array<{
      questionId: string;
      resultId: string;
      answer: string;
      isCorrect: boolean;
    }> = [];

    for (const question of quiz.questions) {
      totalPoints += question.points;
      const studentAnswer = answerMap.get(question.id);
      const isCorrect = studentAnswer === question.correctAnswer;
      if (isCorrect) {
        score += question.points;
      }

      answerRecords.push({
        questionId: question.id,
        resultId: "", // will be set after result creation
        answer: studentAnswer || "",
        isCorrect,
      });
    }

    const percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;

    // Create result with answers
    const result = await prisma.result.create({
      data: {
        studentId: student.id,
        quizId: id,
        score,
        totalPoints,
        percentage,
        answers: {
          create: answerRecords.map((rec) => ({
            questionId: rec.questionId,
            answer: rec.answer,
            isCorrect: rec.isCorrect,
          })),
        },
      },
      include: {
        answers: {
          include: {
            question: {
              select: {
                id: true,
                text: true,
                correctAnswer: true,
                points: true,
              },
            },
          },
        },
        quiz: {
          select: {
            id: true,
            title: true,
            type: true,
          },
        },
      },
    });

    sendSuccess(res, result, "Quiz submitted successfully");
  } catch (error) {
    console.error("Error submitting quiz:", error);
    sendError(res, "Failed to submit quiz", 500);
  }
};

export default { getAll, getById, create, update, remove, submit };
