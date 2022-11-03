/*
  Warnings:

  - You are about to drop the column `uuid` on the `Provider` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uid]` on the table `Provider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uid` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Provider` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Provider.uuid_unique";

-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "uuid",
ADD COLUMN     "uid" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ProviderType";

-- CreateIndex
CREATE UNIQUE INDEX "Provider.uid_unique" ON "Provider"("uid");
