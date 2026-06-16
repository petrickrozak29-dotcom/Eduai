import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import subjectController from "../controllers/subjects.js";
const router = Router();
router.get("/", authenticate, subjectController.getAll);
router.get("/:id", authenticate, subjectController.getById);
router.post("/", authenticate, authorize("GURU", "DEVELOPER"), subjectController.create);
router.put("/:id", authenticate, authorize("GURU", "DEVELOPER"), subjectController.update);
router.delete("/:id", authenticate, authorize("DEVELOPER"), subjectController.remove);
export default router;
//# sourceMappingURL=subjects.js.map