import { Router } from "express";
import developerController from "../controllers/developer.js";
import { authenticate, authorize } from "../middleware/auth.js";
const router = Router();
router.get("/dashboard", authenticate, authorize("DEVELOPER"), developerController.dashboard);
router.get("/users", authenticate, authorize("DEVELOPER"), developerController.users);
export default router;
//# sourceMappingURL=developer.js.map