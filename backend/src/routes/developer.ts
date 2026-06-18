import { Router } from "express";
import developerController from "../controllers/developer.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/dashboard", authenticate, authorize("DEVELOPER"), developerController.dashboard);
router.get("/users", authenticate, authorize("DEVELOPER"), developerController.users);
router.post("/users", authenticate, authorize("DEVELOPER"), developerController.createUser);
router.put("/users/:id", authenticate, authorize("DEVELOPER"), developerController.updateUser);
router.delete("/users/:id", authenticate, authorize("DEVELOPER"), developerController.deleteUser);

export default router;
