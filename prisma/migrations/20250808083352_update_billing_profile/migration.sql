/*
  Warnings:

  - You are about to drop the column `companyName` on the `billing_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `billing_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `vatId` on the `billing_profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "billing_profiles" DROP COLUMN "companyName",
DROP COLUMN "fullName",
DROP COLUMN "vatId",
ADD COLUMN     "name" TEXT,
ADD COLUMN     "surname" TEXT;
