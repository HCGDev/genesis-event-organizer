/*
  Warnings:

  - Made the column `userId` on table `PlayerMatchScore` required. This step will fail if there are existing NULL values in that column.
  - Made the column `matchId` on table `PlayerMatchScore` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PlayerMatchScore" ADD COLUMN     "wonMatch" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "matchId" SET NOT NULL;
