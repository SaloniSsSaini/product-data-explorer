/*
  Warnings:

  - The primary key for the `Navigation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `url` to the `Navigation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_navigationId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "navigationId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Navigation" DROP CONSTRAINT "Navigation_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Navigation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Navigation_id_seq";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_navigationId_fkey" FOREIGN KEY ("navigationId") REFERENCES "Navigation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
