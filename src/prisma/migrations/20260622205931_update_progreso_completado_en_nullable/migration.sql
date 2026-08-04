/*
  Warnings:

  - Made the column `primerIntento` on table `Progreso` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Progreso" ALTER COLUMN "completadoEn" DROP NOT NULL,
ALTER COLUMN "completadoEn" DROP DEFAULT,
ALTER COLUMN "primerIntento" SET NOT NULL,
ALTER COLUMN "primerIntento" SET DEFAULT CURRENT_TIMESTAMP;
