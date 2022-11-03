/*
  Warnings:

  - You are about to drop the column `uuid` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProviderType" AS ENUM ('PASSWORD', 'GOOGLE');

-- DropIndex
DROP INDEX "User.uuid_unique";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "uuid",
ALTER COLUMN "firstname" DROP NOT NULL,
ALTER COLUMN "lastname" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Provider" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "type" "ProviderType" NOT NULL,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Provider.uuid_unique" ON "Provider"("uuid");

-- AddForeignKey
ALTER TABLE "Provider" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
