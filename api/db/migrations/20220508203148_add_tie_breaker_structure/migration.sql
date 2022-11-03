-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "isTieBreakerMatch" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Round" ADD COLUMN     "isTieBreakerRound" BOOLEAN NOT NULL DEFAULT false;
