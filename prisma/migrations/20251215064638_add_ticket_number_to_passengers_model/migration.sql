/*
  Warnings:

  - You are about to drop the column `fullName` on the `Passengers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ticketNumber]` on the table `Passengers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstName` to the `Passengers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Passengers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Passengers" DROP COLUMN "fullName",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "ticketNumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Passengers_ticketNumber_key" ON "Passengers"("ticketNumber");
