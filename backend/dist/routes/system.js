import { Router } from "express";
import systemController from "../controllers/system.js";
import { authenticate, authorize } from "../middleware/auth.js";
const router = Router();
router.get("/status", authenticate, systemController.status);
router.get("/logs", authenticate, authorize("DEVELOPER"), systemController.logs);
router.post("/logs", authenticate, systemController.createLog);
export default router;
//# sourceMappingURL=system.js.map