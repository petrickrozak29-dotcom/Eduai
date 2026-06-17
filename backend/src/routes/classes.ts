import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import classController from "../controllers/classes.js";

const router = Router();

router.get("/", authenticate, classController.getAll);
router.get("/my-classes", authenticate, authorize("GURU"), classController.getMyClasses);
router.get("/student-classes", authenticate, authorize("SISWA"), classController.getStudentClasses);
router.get("/:id", authenticate, classController.getById);
router.post("/", authenticate, authorize("GURU"), classController.create);
router.put("/:id", authenticate, authorize("GURU", "DEVELOPER"), classController.update);
router.delete("/:id", authenticate, authorize("GURU", "DEVELOPER"), classController.remove);
router.post("/join", authenticate, authorize("SISWA"), classController.joinByCode);
router.post("/:id/pretest", authenticate, authorize("SISWA"), classController.submitPretest);
router.post("/:id/materials", authenticate, authorize("GURU"), classController.addMaterial);
router.delete("/:id/materials/:materialId", authenticate, authorize("GURU"), classController.removeMaterial);

export default router;
