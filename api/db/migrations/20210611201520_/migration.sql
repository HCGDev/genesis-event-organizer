/*
  Warnings:

  - You are about to drop the column `button1VerticalPlacement` on the `Banner` table. All the data in the column will be lost.
  - You are about to drop the column `button1HorizontalPlacement` on the `Banner` table. All the data in the column will be lost.
  - You are about to drop the column `button2VerticalPlacement` on the `Banner` table. All the data in the column will be lost.
  - You are about to drop the column `button2HorizontalPlacement` on the `Banner` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Placement" AS ENUM ('center', 'start', 'end');

-- AlterTable
ALTER TABLE "Banner" DROP COLUMN "button1VerticalPlacement",
DROP COLUMN "button1HorizontalPlacement",
DROP COLUMN "button2VerticalPlacement",
DROP COLUMN "button2HorizontalPlacement",
ADD COLUMN     "mainTextColor" TEXT,
ADD COLUMN     "mainTextFontSize" INTEGER,
ADD COLUMN     "subTextColor" TEXT,
ADD COLUMN     "subTextFontSize" INTEGER,
ADD COLUMN     "textPlacement" "Placement",
ADD COLUMN     "buttonsVerticalPlacement" "Placement",
ADD COLUMN     "buttonsHorizontalPlacement" "Placement",
ALTER COLUMN "button1Text" DROP DEFAULT,
ALTER COLUMN "button2Text" DROP DEFAULT;
