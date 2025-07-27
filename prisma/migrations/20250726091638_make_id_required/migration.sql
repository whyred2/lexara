/*
  Warnings:

  - Made the column `id` on table `verification_tokens` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "verification_tokens" ALTER COLUMN "id" SET NOT NULL,
ADD CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("id");
