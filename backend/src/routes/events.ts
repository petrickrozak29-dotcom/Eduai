import { Router } from "express";
import eventController from "../controllers/events.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticate, eventController.getAll);
router.get("/:id", authenticate, eventController.getById);
router.post("/", authenticate, authorize("GURU", "DEVELOPER"), eventController.create);
router.put("/:id", authenticate, authorize("GURU", "DEVELOPER"), eventController.update);
router.delete("/:id", authenticate, authorize("DEVELOPER"), eventController.remove);

export default router;
