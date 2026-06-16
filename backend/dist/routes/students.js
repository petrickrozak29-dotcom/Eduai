import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import * as studentController from "../controllers/students.js";
const router = Router();
router.get("/", authenticate, authorize("GURU", "DEVELOPER"), studentController.getAll);
router.get("/:id", authenticate, studentController.getById);
router.put("/:id", authenticate, authorize("SISWA", "DEVELOPER"), studentController.update);
router.delete("/:id", authenticate, authorize("DEVELOPER"), studentController.remove);
export default router;
//# sourceMappingURL=students.js.map