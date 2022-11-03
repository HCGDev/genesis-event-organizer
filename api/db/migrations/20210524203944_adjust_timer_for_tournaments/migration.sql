/*
  Warnings:

  - You are about to drop the column `timeLeftInSeconds` on the `Round` table. All the data in the column will be lost.
  - You are about to drop the column `startingTimeInSeconds` on the `Round` table. All the data in the column will be lost.
  - You are about to drop the column `timeStatus` on the `Round` table. All the data in the column will be lost.
  - You are about to drop the column `timeLeftInSeconds` on the `Tournament` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Round" DROP COLUMN "timeLeftInSeconds",
DROP COLUMN "startingTimeInSeconds",
DROP COLUMN "timeStatus",
ADD COLUMN     "startingTimerInSeconds" INTEGER,
ADD COLUMN     "roundTimerLeftInSeconds" INTEGER;

-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "timeLeftInSeconds",
ADD COLUMN     "startingTimerInSeconds" INTEGER,
ADD COLUMN     "timerLeftInSeconds" INTEGER,
ADD COLUMN     "timerStatus" "TimerStatus",
ADD COLUMN     "timerLastUpdated" TIMESTAMP(3);
