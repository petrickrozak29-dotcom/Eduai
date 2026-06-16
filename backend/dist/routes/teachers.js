import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import * as teacherController from "../controllers/teachers.js";
const router = Router();
router.get("/", authenticate, authorize("DEVELOPER"), teacherController.getAll);
router.get("/:id", authenticate, teacherController.getById);
router.put("/:id", authenticate, authorize("GURU", "DEVELOPER"), teacherController.update);
router.delete("/:id", authenticate, authorize("DEVELOPER"), teacherController.remove);
router.get("/:id/subjects", authenticate, teacherController.getTeacherSubjects);
export default router;
//# sourceMappingURL=teachers.js.map