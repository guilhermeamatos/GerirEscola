/*
  Warnings:

  - You are about to drop the column `address` on the `Manager` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_school_id_fkey";

-- AlterTable
ALTER TABLE "Manager" DROP COLUMN "address",
ALTER COLUMN "school_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;
