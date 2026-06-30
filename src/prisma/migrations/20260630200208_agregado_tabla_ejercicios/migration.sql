/*
  Warnings:

  - You are about to drop the column `leccionId` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Leccion` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,ejercicioId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ejercicioId` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ejercicioId` to the `Progreso` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_leccionId_fkey";

-- DropIndex
DROP INDEX "Favorite_userId_leccionId_key";

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "leccionId",
ADD COLUMN     "ejercicioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Leccion" DROP COLUMN "videoUrl";

-- AlterTable
ALTER TABLE "Progreso" ADD COLUMN     "ejercicioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "interes" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Ejercicio" (
    "id" SERIAL NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenidoMultimedia" TEXT NOT NULL,

    CONSTRAINT "Ejercicio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_ejercicioId_key" ON "Favorite"("userId", "ejercicioId");

-- AddForeignKey
ALTER TABLE "Ejercicio" ADD CONSTRAINT "Ejercicio_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Leccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progreso" ADD CONSTRAINT "Progreso_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "Modulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progreso" ADD CONSTRAINT "Progreso_ejercicioId_fkey" FOREIGN KEY ("ejercicioId") REFERENCES "Ejercicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_ejercicioId_fkey" FOREIGN KEY ("ejercicioId") REFERENCES "Ejercicio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
