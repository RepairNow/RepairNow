/*
  Warnings:

  - You are about to drop the column `avatar` on the `u_user` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Files" ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "u_user" DROP COLUMN "avatar";

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_userId_fkey" FOREIGN KEY ("userId") REFERENCES "u_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
