-- AlterTable
ALTER TABLE "PlayerMatchScore" ADD COLUMN     "playerName" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;
