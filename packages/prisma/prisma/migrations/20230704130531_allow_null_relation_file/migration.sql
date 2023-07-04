-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_announcementId_fkey";

-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_userId_fkey";

-- AlterTable
ALTER TABLE "Files" ALTER COLUMN "announcementId" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "m_announcement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_userId_fkey" FOREIGN KEY ("userId") REFERENCES "u_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
