/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `approved` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `approvedOn` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tournamentUrl]` on the table `Tournament` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nickname]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `UserRole` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tournamentUrl` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxPlayers` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationName` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street2` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `winnerId` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Provider" DROP CONSTRAINT "Provider_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_userId_fkey";

-- DropIndex
DROP INDEX "UserRole.name_userId_unique";

-- AlterTable
ALTER TABLE "Provider" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "tournamentUrl" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dateStarted" TIMESTAMP(3),
ADD COLUMN     "dateEnded" TIMESTAMP(3),
ADD COLUMN     "maxPlayers" INTEGER NOT NULL,
ADD COLUMN     "timeLeftInSeconds" INTEGER,
ADD COLUMN     "locationName" TEXT NOT NULL,
ADD COLUMN     "infoUrl" TEXT,
ADD COLUMN     "street1" TEXT,
ADD COLUMN     "street2" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "zip" TEXT NOT NULL,
ADD COLUMN     "lat" DOUBLE PRECISION,
ADD COLUMN     "lng" DOUBLE PRECISION,
ADD COLUMN     "winnerId" TEXT NOT NULL,
ADD COLUMN     "storeId" TEXT,
ADD COLUMN     "ownerId" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "approved",
DROP COLUMN "approvedOn",
ADD COLUMN     "nickname" TEXT NOT NULL,
ADD COLUMN     "userPictureId" INTEGER,
ADD COLUMN     "disabledBy" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "UserRole" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "street1" TEXT NOT NULL,
    "street2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "distributor" TEXT NOT NULL,
    "approved" BOOLEAN,
    "approvedOn" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPicture" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Round" (
    "id" SERIAL NOT NULL,
    "timer" INTEGER NOT NULL,
    "timeLeftInSeconds" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerTournamentScore" (
    "id" SERIAL NOT NULL,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "score" INTEGER NOT NULL DEFAULT 0,
    "playerId" TEXT NOT NULL,
    "tournamentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "roundId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerMatchScore" (
    "id" SERIAL NOT NULL,
    "score" INTEGER,
    "userId" TEXT,
    "matchId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlayerTournamentScoreToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PlayerTournamentScoreToTournament" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayerTournamentScore.playerId_tournamentId_unique" ON "PlayerTournamentScore"("playerId", "tournamentId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerMatchScore.userId_matchId_unique" ON "PlayerMatchScore"("userId", "matchId");

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerTournamentScoreToUser_AB_unique" ON "_PlayerTournamentScoreToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerTournamentScoreToUser_B_index" ON "_PlayerTournamentScoreToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerTournamentScoreToTournament_AB_unique" ON "_PlayerTournamentScoreToTournament"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerTournamentScoreToTournament_B_index" ON "_PlayerTournamentScoreToTournament"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Tournament.tournamentUrl_unique" ON "Tournament"("tournamentUrl");

-- CreateIndex
CREATE UNIQUE INDEX "User.nickname_unique" ON "User"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole.name_unique" ON "UserRole"("name");

-- AddForeignKey
ALTER TABLE "Store" ADD FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerTournamentScore" ADD FOREIGN KEY ("playerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerTournamentScore" ADD FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerMatchScore" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerMatchScore" ADD FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerTournamentScoreToUser" ADD FOREIGN KEY ("A") REFERENCES "PlayerTournamentScore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerTournamentScoreToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerTournamentScoreToTournament" ADD FOREIGN KEY ("A") REFERENCES "PlayerTournamentScore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerTournamentScoreToTournament" ADD FOREIGN KEY ("B") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("userPictureId") REFERENCES "UserPicture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
