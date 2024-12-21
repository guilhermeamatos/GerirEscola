/*
  Warnings:

  - You are about to drop the column `school_id` on the `Coordinator` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Coordinator" DROP CONSTRAINT "Coordinator_school_id_fkey";

-- AlterTable
ALTER TABLE "Coordinator" DROP COLUMN "school_id";
