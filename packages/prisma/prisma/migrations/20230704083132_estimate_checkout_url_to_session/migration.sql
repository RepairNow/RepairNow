/*
  Warnings:

  - You are about to drop the column `checkoutUrl` on the `m_estimation` table. All the data in the column will be lost.
  - Added the required column `checkoutSession` to the `m_estimation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "m_estimation" DROP COLUMN "checkoutUrl",
ADD COLUMN     "checkoutSession" TEXT NOT NULL;
