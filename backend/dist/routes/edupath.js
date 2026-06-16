import { Router } from "express";
import edupathController from "../controllers/edupath.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { Role } from "../generated/prisma/client.js";
const router = Router();
router.post("/generate", authenticate, authorize(Role.GURU, Role.DEVELOPER), edupathController.generateLearningPackage);
router.post("/pretest-profile", authenticate, authorize(Role.SISWA, Role.GURU, Role.DEVELOPER), edupathController.submitPretestProfile);
router.get("/learning-path", authenticate, edupathController.getLearningPath);
router.post("/assistant", authenticate, edupathController.askAssistant);
export default router;
//# sourceMappingURL=edupath.js.map