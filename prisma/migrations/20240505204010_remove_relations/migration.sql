/*
  Warnings:

  - You are about to drop the column `categoryId` on the `ServiceProvider` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServiceProvider" DROP CONSTRAINT "ServiceProvider_categoryId_fkey";

-- AlterTable
ALTER TABLE "ServiceProvider" DROP COLUMN "categoryId";
