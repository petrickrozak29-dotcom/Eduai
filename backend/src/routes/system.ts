import { Router } from "express";
import systemController from "../controllers/system.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { Role } from "../generated/prisma/client.js";

const router = Router();

router.get("/status", authenticate, systemController.status);
router.get("/logs", authenticate, authorize(Role.DEVELOPER), systemController.logs);
router.post("/logs", authenticate, systemController.createLog);

export default router;
