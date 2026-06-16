import { Router } from "express";
import developerController from "../controllers/developer.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { Role } from "../generated/prisma/client.js";
const router = Router();
router.get("/dashboard", authenticate, authorize(Role.DEVELOPER), developerController.dashboard);
router.get("/users", authenticate, authorize(Role.DEVELOPER), developerController.users);
export default router;
//# sourceMappingURL=developer.js.map