/*
  Warnings:

  - You are about to drop the column `draws` on the `PlayerTournamentScore` table. All the data in the column will be lost.
  - You are about to drop the column `losses` on the `PlayerTournamentScore` table. All the data in the column will be lost.
  - You are about to drop the column `randomizer` on the `PlayerTournamentScore` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `PlayerTournamentScore` table. All the data in the column will be lost.
  - You are about to drop the column `wins` on the `PlayerTournamentScore` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlayerMatchScore" ADD COLUMN     "lossedMatch" BOOLEAN,
ADD COLUMN     "tiedMatch" BOOLEAN,
ALTER COLUMN "wonMatch" DROP NOT NULL,
ALTER COLUMN "wonMatch" DROP DEFAULT;

-- AlterTable
ALTER TABLE "PlayerTournamentScore" DROP COLUMN "draws",
DROP COLUMN "losses",
DROP COLUMN "randomizer",
DROP COLUMN "score",
DROP COLUMN "wins";
