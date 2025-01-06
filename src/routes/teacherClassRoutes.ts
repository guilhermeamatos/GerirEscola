// src/routes/teacherClassRoutes.ts
import { Router } from "express";
import { TeacherClassController } from "../controllers/TeacherClassController";

const teacherClassRouter = Router();
const teacherClassController = new TeacherClassController();


teacherClassRouter.post("/assign-teacher", (req, res) =>
  teacherClassController.assignTeacherToClassAndSubjectsController(req, res)
);

export { teacherClassRouter };
