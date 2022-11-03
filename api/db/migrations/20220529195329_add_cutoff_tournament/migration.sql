/*
  Warnings:

  - A unique constraint covering the columns `[nextCutoffTournamentId]` on the table `Tournament` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "nextCutoffTournamentId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_nextCutoffTournamentId_key" ON "Tournament"("nextCutoffTournamentId");

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_nextCutoffTournamentId_fkey" FOREIGN KEY ("nextCutoffTournamentId") REFERENCES "Tournament"("id") ON DELETE SET NULL ON UPDATE CASCADE;
