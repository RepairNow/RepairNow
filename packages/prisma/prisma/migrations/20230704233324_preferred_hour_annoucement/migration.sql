/*
  Warnings:

  - Added the required column `preferredHour` to the `m_announcement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "m_announcement" ADD COLUMN     "preferredHour" TEXT NOT NULL;
