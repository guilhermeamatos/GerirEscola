/*
  Warnings:

  - A unique constraint covering the columns `[matricula]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `concursado` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "concursado" BOOLEAN NOT NULL,
ADD COLUMN     "matricula" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_matricula_key" ON "Teacher"("matricula");
