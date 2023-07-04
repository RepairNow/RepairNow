/*
  Warnings:

  - The `images` column on the `m_announcement` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "m_announcement" DROP COLUMN "images",
ADD COLUMN     "images" BYTEA[];
