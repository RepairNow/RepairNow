/*
  Warnings:

  - Added the required column `destination` to the `Files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `encoding` to the `Files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Files" ADD COLUMN     "destination" TEXT NOT NULL,
ADD COLUMN     "encoding" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;
