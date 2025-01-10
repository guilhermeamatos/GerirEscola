/*
  Warnings:

  - You are about to drop the column `assessment_id` on the `AssessmentValue` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "AssessmentValue_assessment_id_key";

-- AlterTable
ALTER TABLE "AssessmentValue" DROP COLUMN "assessment_id";
