-- AlterTable
ALTER TABLE "User" ADD COLUMN     "flags" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "adminComments" TEXT,
ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "disabledOn" TIMESTAMP(3);
