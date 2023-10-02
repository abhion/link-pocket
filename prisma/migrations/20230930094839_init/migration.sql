/*
  Warnings:

  - Added the required column `name` to the `LinkCollection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `linkcollection` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    MODIFY `viewsCount` INTEGER NULL DEFAULT 0,
    MODIFY `likesCount` INTEGER NULL DEFAULT 0,
    MODIFY `isPrivate` BOOLEAN NOT NULL DEFAULT false;
