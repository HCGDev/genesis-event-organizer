/*
  Warnings:

  - You are about to drop the column `lossedMatch` on the `PlayerMatchScore` table. All the data in the column will be lost.
  - You are about to drop the column `tiedMatch` on the `PlayerMatchScore` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlayerMatchScore" DROP COLUMN "lossedMatch",
DROP COLUMN "tiedMatch",
ALTER COLUMN "wonMatch" SET DEFAULT false;

-- AlterTable
ALTER TABLE "PlayerTournamentScore" ADD COLUMN     "draws" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "losses" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "randomizer" TEXT,
ADD COLUMN     "score" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "wins" INTEGER NOT NULL DEFAULT 0;
