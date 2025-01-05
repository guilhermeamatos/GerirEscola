-- DropForeignKey
ALTER TABLE "TeacherSubject" DROP CONSTRAINT "TeacherSubject_teacher_id_fkey";

-- AlterTable
ALTER TABLE "TeacherSubject" ALTER COLUMN "teacher_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TeacherSubject" ADD CONSTRAINT "TeacherSubject_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
