import { Response } from "express";
import prisma from "../config/database.js";
import { AuthRequestType } from "../middleware/auth.js";
import { sendError, sendSuccess } from "../utils/response.js";

export const getAll = async (req: AuthRequestType, res: Response): Promise<void> => {
  try {
    const { type, upcoming } = req.query;
    const events = await prisma.event.findMany({
      where: {
        ...(type && { type: String(type) }),
        ...(upcoming === "true" && { date: { gte: new Date() } }),
      },
      include: {
        user: { select: { id: true, name: true, role: true } },
      },
      orderBy: { date: "asc" },
    });

    sendSuccess(res, events, "Event berhasil diambil");
  } catch (error) {
    sendError(res, "Gagal mengambil event", 500, (error as Error).message);
  }
};

export const getById = async (req: AuthRequestType, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const event = await prisma.event.findUnique({
      where: { id },
      include: { user: { select: { id: true, name: true, role: true } } },
    });

    if (!event) {
      sendError(res, "Event tidak ditemukan", 404);
      return;
    }

    sendSuccess(res, event, "Detail event berhasil diambil");
  } catch (error) {
    sendError(res, "Gagal mengambil detail event", 500, (error as Error).message);
  }
};

export const create = async (req: AuthRequestType, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      sendError(res, "Unauthorized", 401);
      return;
    }

    const { title, description, date, type } = req.body;
    if (!title || !date) {
      sendError(res, "Title dan date wajib diisi", 400);
      return;
    }

    const event = await prisma.event.create({
      data: {
        title,
        description: description || null,
        date: new Date(date),
        type: type || "academic",
        category: req.body.category || type || "academic",
        penyelenggara: req.body.penyelenggara || null,
        photoUrl: req.body.photoUrl || null,
        link: req.body.link || null,
        kelasId: req.body.kelasId || null,
        userId: req.user.userId,
      },
      include: { user: { select: { name: true, role: true } } },
    });

    sendSuccess(res, event, "Event berhasil dibuat", 201);
  } catch (error) {
    sendError(res, "Gagal membuat event", 500, (error as Error).message);
  }
};

export const update = async (req: AuthRequestType, res: Response): Promise<void> => {
  try {
    const { title, description, date, type, category, penyelenggara, photoUrl, link, kelasId } = req.body;
    const id = String(req.params.id);
    const existing = await prisma.event.findUnique({ where: { id } });

    if (!existing) {
      sendError(res, "Event tidak ditemukan", 404);
      return;
    }

    if (req.user?.role !== "DEVELOPER" && existing.userId !== req.user?.userId) {
      sendError(res, "Tidak memiliki akses mengubah event ini", 403);
      return;
    }

    const event = await prisma.event.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(date !== undefined && { date: new Date(date) }),
        ...(type !== undefined && { type }),
        ...(category !== undefined && { category }),
        ...(penyelenggara !== undefined && { penyelenggara }),
        ...(photoUrl !== undefined && { photoUrl }),
        ...(link !== undefined && { link }),
        ...(kelasId !== undefined && { kelasId: kelasId || null }),
      },
    });

    sendSuccess(res, event, "Event berhasil diperbarui");
  } catch (error) {
    sendError(res, "Gagal memperbarui event", 500, (error as Error).message);
  }
};

export const remove = async (req: AuthRequestType, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const existing = await prisma.event.findUnique({ where: { id } });

    if (!existing) {
      sendError(res, "Event tidak ditemukan", 404);
      return;
    }

    if (req.user?.role !== "DEVELOPER" && existing.userId !== req.user?.userId) {
      sendError(res, "Tidak memiliki akses menghapus event ini", 403);
      return;
    }

    await prisma.event.delete({ where: { id } });
    sendSuccess(res, null, "Event berhasil dihapus");
  } catch (error) {
    sendError(res, "Gagal menghapus event", 500, (error as Error).message);
  }
};

export default { getAll, getById, create, update, remove };
