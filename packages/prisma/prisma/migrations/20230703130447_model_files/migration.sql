/*
  Warnings:

  - You are about to drop the column `images` on the `m_announcement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "m_announcement" DROP COLUMN "images";

-- CreateTable
CREATE TABLE "Files" (
    "id" UUID NOT NULL,
    "announcementId" UUID NOT NULL,
    "fieldname" TEXT NOT NULL,
    "originalname" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "m_announcement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
