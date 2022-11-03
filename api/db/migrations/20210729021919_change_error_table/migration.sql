/*
  Warnings:

  - You are about to drop the `Error` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Error";

-- CreateTable
CREATE TABLE "ErrorLog" (
    "id" SERIAL NOT NULL,
    "type" "ErrorType" NOT NULL DEFAULT E'UNKNOWN',
    "message" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "route" TEXT,
    "function" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);
