-- AlterTable
ALTER TABLE "User" ADD COLUMN     "howHeard" TEXT,
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "approvedOn" TIMESTAMP(3);
