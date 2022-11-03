/*
  Warnings:

  - Added the required column `tournamentId` to the `Round` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Round" ADD COLUMN     "tournamentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tournament" ALTER COLUMN "street2" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "zip" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Round" ADD FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;
