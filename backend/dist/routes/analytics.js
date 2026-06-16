import { Router } from "express";
import analyticsController from "../controllers/analytics.js";
import { authenticate } from "../middleware/auth.js";
const router = Router();
router.get("/overview", authenticate, analyticsController.overview);
router.get("/students/:studentId/learning-index", authenticate, analyticsController.studentLearningIndex);
export default router;
//# sourceMappingURL=analytics.js.map