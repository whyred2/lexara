-- AlterTable
ALTER TABLE "subscription_plans" ADD COLUMN     "isPopular" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "interval" SET DEFAULT 'month';
