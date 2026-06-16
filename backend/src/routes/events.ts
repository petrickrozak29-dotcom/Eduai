import { Router } from "express";
import eventController from "../controllers/events.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { Role } from "../generated/prisma/client.js";

const router = Router();

router.get("/", authenticate, eventController.getAll);
router.get("/:id", authenticate, eventController.getById);
router.post("/", authenticate, authorize(Role.GURU, Role.DEVELOPER), eventController.create);
router.put("/:id", authenticate, authorize(Role.GURU, Role.DEVELOPER), eventController.update);
router.delete("/:id", authenticate, authorize(Role.DEVELOPER), eventController.remove);

export default router;
