/*
  Warnings:

  - You are about to drop the column `winnerId` on the `Tournament` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tournament" DROP CONSTRAINT "Tournament_winnerId_fkey";

-- AlterTable
ALTER TABLE "PlayerTournamentScore" ADD COLUMN     "wonTournament" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "winnerId";
