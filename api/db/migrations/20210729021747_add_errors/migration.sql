-- CreateEnum
CREATE TYPE "ErrorType" AS ENUM ('CRASH', 'API', 'UNKNOWN');

-- CreateTable
CREATE TABLE "Error" (
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
