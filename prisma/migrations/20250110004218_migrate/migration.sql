/*
  Warnings:

  - You are about to drop the column `value` on the `AssessmentValue` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subject_id]` on the table `AssessmentValue` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "AssessmentValue" DROP COLUMN "value",
ADD COLUMN     "grade1_1" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "grade1_2" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "grade1_3" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "grade2_1" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "grade2_2" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "grade2_3" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "grade3_1" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "grade3_2" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "grade3_3" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentValue_subject_id_key" ON "AssessmentValue"("subject_id");
