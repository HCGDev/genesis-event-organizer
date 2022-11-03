-- AlterTable
ALTER TABLE "PlayerTournamentScore" ADD COLUMN     "draws" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Tournament" ALTER COLUMN "winnerId" DROP NOT NULL;
