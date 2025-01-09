/*
  Warnings:

  - A unique constraint covering the columns `[id_enrollment]` on the table `Grades` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Grades_id_enrollment_key" ON "Grades"("id_enrollment");
