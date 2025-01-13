-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_subject_id_fkey";

-- AlterTable
ALTER TABLE "Lesson" ALTER COLUMN "subject_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
