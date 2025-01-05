/*
  Warnings:

  - You are about to drop the `TeacherSubject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeacherSubject" DROP CONSTRAINT "TeacherSubject_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "TeacherSubject" DROP CONSTRAINT "TeacherSubject_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "TeacherSubject" DROP CONSTRAINT "TeacherSubject_turma_id_fkey";

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "class_id" TEXT,
ALTER COLUMN "teacher_id" DROP NOT NULL;

-- DropTable
DROP TABLE "TeacherSubject";

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;
