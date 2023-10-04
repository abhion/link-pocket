/*
  Warnings:

  - You are about to drop the column `userId` on the `linkcollection` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `linkcollection` DROP FOREIGN KEY `LinkCollection_userId_fkey`;

-- AlterTable
ALTER TABLE `linkcollection` DROP COLUMN `userId`;

-- CreateTable
CREATE TABLE `_LinkCollectionToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_LinkCollectionToUser_AB_unique`(`A`, `B`),
    INDEX `_LinkCollectionToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_LinkCollectionToUser` ADD CONSTRAINT `_LinkCollectionToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `LinkCollection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LinkCollectionToUser` ADD CONSTRAINT `_LinkCollectionToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
