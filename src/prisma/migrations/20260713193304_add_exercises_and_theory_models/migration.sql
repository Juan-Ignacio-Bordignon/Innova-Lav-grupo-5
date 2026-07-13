/*
  Warnings:

  - You are about to drop the column `ejercicioId` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the `Ejercicio` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,teoriaId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teoriaId` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoEjercicio" AS ENUM ('MULTIPLE_CHOICE', 'TRUE_FALSE', 'ORDER_WORDS');

-- DropForeignKey
ALTER TABLE "Ejercicio" DROP CONSTRAINT "Ejercicio_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_ejercicioId_fkey";

-- DropForeignKey
ALTER TABLE "Progreso" DROP CONSTRAINT "Progreso_ejercicioId_fkey";

-- DropIndex
DROP INDEX "Favorite_userId_ejercicioId_key";

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "ejercicioId",
ADD COLUMN     "teoriaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Progreso" ADD COLUMN     "teoriaId" INTEGER,
ALTER COLUMN "ejercicioId" DROP NOT NULL;

-- DropTable
DROP TABLE "Ejercicio";

-- CreateTable
CREATE TABLE "Teoria" (
    "id" SERIAL NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenidoMultimedia" TEXT NOT NULL,

    CONSTRAINT "Teoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ejercicios" (
    "id" SERIAL NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "tipo" "TipoEjercicio" NOT NULL,
    "opcionesRespuesta" JSONB NOT NULL,
    "respuestaEsperada" JSONB NOT NULL,
    "contenidoMultimedia" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ejercicios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_teoriaId_key" ON "Favorite"("userId", "teoriaId");

-- AddForeignKey
ALTER TABLE "Teoria" ADD CONSTRAINT "Teoria_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Leccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ejercicios" ADD CONSTRAINT "Ejercicios_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Leccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progreso" ADD CONSTRAINT "Progreso_teoriaId_fkey" FOREIGN KEY ("teoriaId") REFERENCES "Teoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progreso" ADD CONSTRAINT "Progreso_ejercicioId_fkey" FOREIGN KEY ("ejercicioId") REFERENCES "Ejercicios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_teoriaId_fkey" FOREIGN KEY ("teoriaId") REFERENCES "Teoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
