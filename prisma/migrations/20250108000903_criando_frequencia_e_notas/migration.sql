/*
  Warnings:

  - You are about to drop the column `attendance` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `grade` on the `Enrollment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gradesid]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "year" INTEGER NOT NULL DEFAULT 2025;

-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "attendance",
DROP COLUMN "grade",
ADD COLUMN     "gradesid" TEXT;

-- CreateTable
CREATE TABLE "EnrollmentLesson" (
    "id" TEXT NOT NULL,
    "enrollment_id" TEXT NOT NULL,
    "lesson_id" TEXT NOT NULL,
    "present" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "EnrollmentLesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dscreption" TEXT,
    "subject_id" TEXT NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grades" (
    "id" TEXT NOT NULL,
    "grade1_1" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade1_2" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade1_3" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade2_1" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade2_2" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade2_3" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade3_1" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade3_2" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade3_3" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade1_1Value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade1_2Value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade1_3Value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade2_1Value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade2_2Value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade2_3Value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade3_1Value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade3_2Value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade3_3Value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade1_rp" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade2_rp" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade3_rp" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade1_media" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade2_media" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade3_media" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade_final" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "id_enrollment" TEXT NOT NULL,

    CONSTRAINT "Grades_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_gradesid_key" ON "Enrollment"("gradesid");

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_gradesid_fkey" FOREIGN KEY ("gradesid") REFERENCES "Grades"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrollmentLesson" ADD CONSTRAINT "EnrollmentLesson_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrollmentLesson" ADD CONSTRAINT "EnrollmentLesson_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
