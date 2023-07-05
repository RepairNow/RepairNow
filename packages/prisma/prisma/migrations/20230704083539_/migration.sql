/*
  Warnings:

  - Added the required column `checkoutUrl` to the `m_estimation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "m_estimation" ADD COLUMN     "checkoutUrl" TEXT NOT NULL;
