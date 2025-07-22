/*
  Warnings:

  - Added the required column `total` to the `Statistical` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Statistical" ADD COLUMN     "total" INTEGER NOT NULL;
