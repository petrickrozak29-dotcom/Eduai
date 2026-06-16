import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import * as studentController from "../controllers/students.js";
import { Role } from "../generated/prisma/client.js";

const router = Router();

router.get("/", authenticate, authorize(Role.GURU, Role.DEVELOPER), studentController.getAll);
router.get("/:id", authenticate, studentController.getById);
router.put("/:id", authenticate, authorize(Role.SISWA, Role.DEVELOPER), studentController.update);
router.delete("/:id", authenticate, authorize(Role.DEVELOPER), studentController.remove);

export default router;
