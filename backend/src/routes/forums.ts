import { Router } from "express";
import forumController from "../controllers/forums.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticate, forumController.getAll);
router.get("/:id", authenticate, forumController.getById);
router.post("/", authenticate, forumController.create);
router.post("/:id/replies", authenticate, forumController.reply);

export default router;

