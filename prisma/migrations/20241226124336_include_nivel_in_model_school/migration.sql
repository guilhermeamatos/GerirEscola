/*
  Warnings:

  - You are about to drop the column `founded_at` on the `School` table. All the data in the column will be lost.
  - Added the required column `nivel` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "nivel" AS ENUM ('INFANTIL', 'FUNDAMENTAL_1', 'FUNDAMENTAL_2', 'FUNDAMENTAL_1_2', 'INFANTIL_FUNDAMENTAL_1', 'INFANTIL_FUNDAMENTAL_1_2');

-- AlterTable
ALTER TABLE "School" DROP COLUMN "founded_at",
ADD COLUMN     "nivel" "nivel" NOT NULL;
