import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import * as teacherController from "../controllers/teachers.js";
import { Role } from "../generated/prisma/client.js";

const router = Router();

router.get("/", authenticate, authorize(Role.DEVELOPER), teacherController.getAll);
router.get("/:id", authenticate, teacherController.getById);
router.put("/:id", authenticate, authorize(Role.GURU, Role.DEVELOPER), teacherController.update);
router.delete("/:id", authenticate, authorize(Role.DEVELOPER), teacherController.remove);
router.get("/:id/subjects", authenticate, teacherController.getTeacherSubjects);

export default router;
