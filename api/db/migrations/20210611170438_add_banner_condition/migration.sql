-- CreateEnum
CREATE TYPE "BannerCondition" AS ENUM ('GUEST', 'LOGGEDIN', 'EO', 'PLAYER');

-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "condition" "BannerCondition";
