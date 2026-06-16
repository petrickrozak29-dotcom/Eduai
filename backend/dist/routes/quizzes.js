import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import quizController from "../controllers/quizzes.js";
import { Role } from "../generated/prisma/client.js";
const router = Router();
router.get("/", authenticate, quizController.getAll);
router.get("/:id", authenticate, quizController.getById);
router.post("/", authenticate, authorize(Role.GURU, Role.DEVELOPER), quizController.create);
router.put("/:id", authenticate, authorize(Role.GURU, Role.DEVELOPER), quizController.update);
router.delete("/:id", authenticate, authorize(Role.DEVELOPER), quizController.remove);
router.post("/:id/submit", authenticate, authorize(Role.SISWA), quizController.submit);
export default router;
//# sourceMappingURL=quizzes.js.map