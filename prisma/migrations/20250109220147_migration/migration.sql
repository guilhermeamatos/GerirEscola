/*
  Warnings:

  - You are about to drop the column `grade1_1Value` on the `Grades` table. All the data in the column will be lost.
  - You are about to drop the column `grade1_2Value` on the `Grades` table. All the data in the column will be lost.
  - You are about to drop the column `grade1_3Value` on the `Grades` table. All the data in the column will be lost.
  - You are about to drop the column `grade2_1Value` on the `Grades` table. All the data in the column will be lost.
  - You are about to drop the column `grade2_2Value` on the `Grades` table. All the data in the column will be lost.
  - You are about to drop the column `grade2_3Value` on the `Grades` table. All the data in the column will be lost.
  - You are about to drop the column `grade3_1Value` on the `Grades` table. All the data in the column will be lost.
  - You are about to drop the column `grade3_2Value` on the `Grades` table. All the data in the column will be lost.
  - You are about to drop the column `grade3_3Value` on the `Grades` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Grades" DROP COLUMN "grade1_1Value",
DROP COLUMN "grade1_2Value",
DROP COLUMN "grade1_3Value",
DROP COLUMN "grade2_1Value",
DROP COLUMN "grade2_2Value",
DROP COLUMN "grade2_3Value",
DROP COLUMN "grade3_1Value",
DROP COLUMN "grade3_2Value",
DROP COLUMN "grade3_3Value";

-- CreateTable
CREATE TABLE "AssessmentValue" (
    "id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "assessment_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AssessmentValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentValue_assessment_id_key" ON "AssessmentValue"("assessment_id");

-- AddForeignKey
ALTER TABLE "AssessmentValue" ADD CONSTRAINT "AssessmentValue_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
