import { Router } from "express";
import resultController from "../controllers/results.js";
import { authenticate } from "../middleware/auth.js";
const router = Router();
router.get("/student/:studentId", authenticate, resultController.getStudentResults);
router.get("/:id", authenticate, resultController.getById);
export default router;
//# sourceMappingURL=results.js.map