import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import subjectController from "../controllers/subjects.js";
import { Role } from "../generated/prisma/client.js";
const router = Router();
// Public routes (authenticated)
router.get("/", authenticate, subjectController.getAll);
router.get("/:id", authenticate, subjectController.getById);
// Protected routes
router.post("/", authenticate, authorize(Role.GURU, Role.DEVELOPER), subjectController.create);
router.put("/:id", authenticate, authorize(Role.GURU, Role.DEVELOPER), subjectController.update);
router.delete("/:id", authenticate, authorize(Role.DEVELOPER), subjectController.remove);
export default router;
//# sourceMappingURL=subjects.js.map