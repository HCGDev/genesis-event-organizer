/*
  Warnings:

  - You are about to drop the `_PlayerTournamentScoreToTournament` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlayerTournamentScoreToUser` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `playerId` on table `PlayerTournamentScore` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tournamentId` on table `PlayerTournamentScore` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_PlayerTournamentScoreToTournament" DROP CONSTRAINT "_PlayerTournamentScoreToTournament_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlayerTournamentScoreToTournament" DROP CONSTRAINT "_PlayerTournamentScoreToTournament_B_fkey";

-- DropForeignKey
ALTER TABLE "_PlayerTournamentScoreToUser" DROP CONSTRAINT "_PlayerTournamentScoreToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlayerTournamentScoreToUser" DROP CONSTRAINT "_PlayerTournamentScoreToUser_B_fkey";

-- AlterTable
ALTER TABLE "PlayerTournamentScore" ALTER COLUMN "playerId" SET NOT NULL,
ALTER COLUMN "tournamentId" SET NOT NULL;

-- DropTable
DROP TABLE "_PlayerTournamentScoreToTournament";

-- DropTable
DROP TABLE "_PlayerTournamentScoreToUser";
