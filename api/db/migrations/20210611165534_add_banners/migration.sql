-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "userId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Banner" (
    "id" SERIAL NOT NULL,
    "backgroundUrl" TEXT NOT NULL,
    "mainText" TEXT,
    "subText" TEXT,
    "button1Link" TEXT,
    "button1Text" TEXT DEFAULT E'Login',
    "button1VerticalPlacement" TEXT DEFAULT E'center',
    "button1HorizontalPlacement" TEXT DEFAULT E'center',
    "button2Link" TEXT,
    "button2Text" TEXT DEFAULT E'Sign Up Now',
    "button2VerticalPlacement" TEXT DEFAULT E'center',
    "button2HorizontalPlacement" TEXT DEFAULT E'center',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY ("id")
);
