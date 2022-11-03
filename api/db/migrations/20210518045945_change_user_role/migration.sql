/*
  Warnings:

  - You are about to drop the column `userId` on the `UserRole` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_userId_fkey";

-- AlterTable
ALTER TABLE "UserRole" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "UserUserRole" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "userRoleId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserUserRole.userId_userRoleId_unique" ON "UserUserRole"("userId", "userRoleId");

-- AddForeignKey
ALTER TABLE "UserUserRole" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserUserRole" ADD FOREIGN KEY ("userRoleId") REFERENCES "UserRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;
