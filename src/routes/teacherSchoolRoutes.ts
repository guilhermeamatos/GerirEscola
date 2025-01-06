// src/routes/teacherSchoolRoutes.ts
import { Router } from "express";
import { TeacherSchoolController } from "../controllers/TeacherSchoolController";

const teacherSchoolRouter = Router();
const teacherSchoolController = new TeacherSchoolController();

// Rota para vincular um professor a uma escola
teacherSchoolRouter.post("/link", (req, res) =>
  teacherSchoolController.linkTeacherToSchoolController(req, res)
);

export { teacherSchoolRouter };
