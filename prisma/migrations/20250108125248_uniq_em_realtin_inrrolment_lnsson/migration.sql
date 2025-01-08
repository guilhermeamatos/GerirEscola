/*
  Warnings:

  - A unique constraint covering the columns `[enrollment_id,lesson_id]` on the table `EnrollmentLesson` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EnrollmentLesson_enrollment_id_lesson_id_key" ON "EnrollmentLesson"("enrollment_id", "lesson_id");
