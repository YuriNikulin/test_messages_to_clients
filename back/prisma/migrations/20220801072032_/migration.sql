/*
  Warnings:

  - You are about to drop the column `messages` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "messages";

-- CreateTable
CREATE TABLE "UserMessage" (
    "id" SERIAL NOT NULL,
    "channelId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "UserMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserMessage_id_key" ON "UserMessage"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserMessage_userId_key" ON "UserMessage"("userId");
CREATE UNIQUE INDEX "UserMessage_channelId_key" ON "UserMessage"("channelId");

-- AddForeignKey
ALTER TABLE "UserMessage" ADD CONSTRAINT "UserMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
