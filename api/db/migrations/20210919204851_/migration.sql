-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "approverId" TEXT;

-- AddForeignKey
ALTER TABLE "Store" ADD FOREIGN KEY ("approverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
