import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import quizController from "../controllers/quizzes.js";

const router = Router();

router.get("/", authenticate, quizController.getAll);
router.get("/:id", authenticate, quizController.getById);
router.post("/", authenticate, authorize("GURU", "DEVELOPER"), quizController.create);
router.put("/:id", authenticate, authorize("GURU", "DEVELOPER"), quizController.update);
router.delete("/:id", authenticate, authorize("DEVELOPER"), quizController.remove);
router.post("/:id/submit", authenticate, authorize("SISWA"), quizController.submit);

export default router;
