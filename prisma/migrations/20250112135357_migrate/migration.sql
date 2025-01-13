-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "class_id" TEXT;

-- CreateTable
CREATE TABLE "StudentLensons" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "lesson_id" TEXT NOT NULL,
    "present" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "StudentLensons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentLensons_student_id_lesson_id_key" ON "StudentLensons"("student_id", "lesson_id");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentLensons" ADD CONSTRAINT "StudentLensons_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentLensons" ADD CONSTRAINT "StudentLensons_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
