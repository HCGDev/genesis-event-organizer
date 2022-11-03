-- AlterTable
ALTER TABLE "PlayerMatchScore" ADD COLUMN     "bye" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "PlayerTournamentScore" ADD COLUMN     "byes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "randomizer" TEXT;
