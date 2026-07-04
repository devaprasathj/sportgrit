import { Router } from "express";
import { createAssessment } from "../controllers/assessmentController.js";

const router = Router();

router.post("/profile-assessment", createAssessment);

export default router;
