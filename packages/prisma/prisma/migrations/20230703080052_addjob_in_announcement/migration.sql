/*
  Warnings:

  - Added the required column `jobId` to the `m_announcement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "m_announcement" ADD COLUMN     "jobId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "m_announcement" ADD CONSTRAINT "m_announcement_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "j_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
