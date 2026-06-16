import { Router } from "express";
import edupathController from "../controllers/edupath.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();

router.post("/generate", authenticate, authorize("GURU", "DEVELOPER"), edupathController.generateLearningPackage);
router.post("/pretest-profile", authenticate, authorize("SISWA", "GURU", "DEVELOPER"), edupathController.submitPretestProfile);
router.get("/learning-path", authenticate, edupathController.getLearningPath);
router.post("/assistant", authenticate, edupathController.askAssistant);

export default router;
