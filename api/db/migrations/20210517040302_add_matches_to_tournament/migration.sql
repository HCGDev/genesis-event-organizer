/*
  Warnings:

  - Added the required column `tournamentId` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "tournamentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Match" ADD FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;
