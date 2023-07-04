/*
  Warnings:

  - You are about to drop the column `endTime` on the `m_announcement` table. All the data in the column will be lost.
  - Added the required column `estimatedTime` to the `m_announcement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "m_announcement" DROP COLUMN "endTime",
ADD COLUMN     "estimatedTime" INTEGER NOT NULL;
