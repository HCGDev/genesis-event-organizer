-- AlterTable
ALTER TABLE "PlayerTournamentScore" ADD COLUMN     "playerName" TEXT;

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "publicRegistration" BOOLEAN NOT NULL DEFAULT true;
