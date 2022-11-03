-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_userId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_roundId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_tournamentId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerMatchScore" DROP CONSTRAINT "PlayerMatchScore_matchId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerTournamentScore" DROP CONSTRAINT "PlayerTournamentScore_playerId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerTournamentScore" DROP CONSTRAINT "PlayerTournamentScore_tournamentId_fkey";

-- DropForeignKey
ALTER TABLE "Round" DROP CONSTRAINT "Round_tournamentId_fkey";

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "UserUserRole" DROP CONSTRAINT "UserUserRole_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserUserRole" DROP CONSTRAINT "UserUserRole_userRoleId_fkey";

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserUserRole" ADD CONSTRAINT "UserUserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserUserRole" ADD CONSTRAINT "UserUserRole_userRoleId_fkey" FOREIGN KEY ("userRoleId") REFERENCES "UserRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerTournamentScore" ADD CONSTRAINT "PlayerTournamentScore_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerTournamentScore" ADD CONSTRAINT "PlayerTournamentScore_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerMatchScore" ADD CONSTRAINT "PlayerMatchScore_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Provider.uid_unique" RENAME TO "Provider_uid_key";

-- RenameIndex
ALTER INDEX "Tournament.tournamentUrl_unique" RENAME TO "Tournament_tournamentUrl_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";

-- RenameIndex
ALTER INDEX "User.nickname_unique" RENAME TO "User_nickname_key";

-- RenameIndex
ALTER INDEX "UserRole.name_unique" RENAME TO "UserRole_name_key";
