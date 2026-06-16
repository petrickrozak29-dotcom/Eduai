import { Response } from "express";
import prisma from "../config/database.js";
import { AuthRequestType } from "../middleware/auth.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const materialController = {
  async getAll(req: AuthRequestType, res: Response): Promise<void> {
    try {
      const { subjectId, chapterId } = req.query;

      const where: Record<string, unknown> = {};
      if (subjectId) where.subjectId = subjectId;
      if (chapterId) where.chapterId = chapterId;

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
    } catch (error) {
      sendError(res, "Failed to retrieve materials", 500, (error as Error).message);
    }
  },

  async getById(req: AuthRequestType, res: Response): Promise<void> {
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
    } catch (error) {
      sendError(res, "Failed to retrieve material", 500, (error as Error).message);
    }
  },

  async create(req: AuthRequestType, res: Response): Promise<void> {
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
    } catch (error) {
      sendError(res, "Failed to create material", 500, (error as Error).message);
    }
  },

  async update(req: AuthRequestType, res: Response): Promise<void> {
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
    } catch (error) {
      sendError(res, "Failed to update material", 500, (error as Error).message);
    }
  },

  async remove(req: AuthRequestType, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);

      const existing = await prisma.material.findUnique({ where: { id } });
      if (!existing) {
        sendError(res, "Material not found", 404);
        return;
      }

      await prisma.material.delete({ where: { id } });

      sendSuccess(res, null, "Material deleted successfully");
    } catch (error) {
      sendError(res, "Failed to delete material", 500, (error as Error).message);
    }
  },
};

export default materialController;
