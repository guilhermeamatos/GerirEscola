-- CreateTable
CREATE TABLE "_TeacherSchool" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TeacherSchool_AB_unique" ON "_TeacherSchool"("A", "B");

-- CreateIndex
CREATE INDEX "_TeacherSchool_B_index" ON "_TeacherSchool"("B");

-- AddForeignKey
ALTER TABLE "_TeacherSchool" ADD CONSTRAINT "_TeacherSchool_A_fkey" FOREIGN KEY ("A") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherSchool" ADD CONSTRAINT "_TeacherSchool_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
