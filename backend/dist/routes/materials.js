import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import materialController from "../controllers/materials.js";
import { Role } from "../generated/prisma/client.js";
const router = Router();
// Public routes (authenticated)
router.get("/", authenticate, materialController.getAll);
router.get("/:id", authenticate, materialController.getById);
// Protected routes
router.post("/", authenticate, authorize(Role.GURU, Role.DEVELOPER), materialController.create);
router.put("/:id", authenticate, authorize(Role.GURU, Role.DEVELOPER), materialController.update);
router.delete("/:id", authenticate, authorize(Role.DEVELOPER), materialController.remove);
export default router;
//# sourceMappingURL=materials.js.map