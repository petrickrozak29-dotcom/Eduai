import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import materialController from "../controllers/materials.js";
const router = Router();
router.get("/", authenticate, materialController.getAll);
router.get("/:id", authenticate, materialController.getById);
router.post("/", authenticate, authorize("GURU", "DEVELOPER"), materialController.create);
router.put("/:id", authenticate, authorize("GURU", "DEVELOPER"), materialController.update);
router.delete("/:id", authenticate, authorize("DEVELOPER"), materialController.remove);
export default router;
//# sourceMappingURL=materials.js.map