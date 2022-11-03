/*
  Warnings:

  - You are about to drop the column `timer` on the `Round` table. All the data in the column will be lost.
  - Added the required column `roundNumber` to the `Round` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TimerStatus" AS ENUM ('PENDING', 'INPROGRESS', 'PAUSED', 'STOPPED');

-- AlterTable
ALTER TABLE "Round" DROP COLUMN "timer",
ADD COLUMN     "roundNumber" INTEGER NOT NULL,
ADD COLUMN     "startingTimeInSeconds" INTEGER,
ADD COLUMN     "timeStatus" "TimerStatus";

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "desc" TEXT;
