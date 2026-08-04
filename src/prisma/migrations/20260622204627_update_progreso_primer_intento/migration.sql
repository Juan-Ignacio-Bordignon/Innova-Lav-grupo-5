/*
  Warnings:

  - The `primerIntento` column on the `Progreso` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Progreso" DROP COLUMN "primerIntento",
ADD COLUMN     "primerIntento" TIMESTAMP(3);
