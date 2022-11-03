/*
  Warnings:

  - You are about to drop the column `nextCutoffTournamentId` on the `Tournament` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[previousCutoffTournamentId]` on the table `Tournament` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Tournament" DROP CONSTRAINT "Tournament_nextCutoffTournamentId_fkey";

-- DropIndex
DROP INDEX "Tournament_nextCutoffTournamentId_key";

-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "nextCutoffTournamentId",
ADD COLUMN     "previousCutoffTournamentId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_previousCutoffTournamentId_key" ON "Tournament"("previousCutoffTournamentId");

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_previousCutoffTournamentId_fkey" FOREIGN KEY ("previousCutoffTournamentId") REFERENCES "Tournament"("id") ON DELETE SET NULL ON UPDATE CASCADE;
