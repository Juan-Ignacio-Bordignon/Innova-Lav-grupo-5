-- AlterTable
ALTER TABLE "Logro" ADD COLUMN     "leccionId" INTEGER;

-- AlterTable
ALTER TABLE "Progreso" ADD COLUMN     "completadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "primerIntento" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "EventoLog" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "evento" TEXT NOT NULL,
    "properties" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventoLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Logro" ADD CONSTRAINT "Logro_leccionId_fkey" FOREIGN KEY ("leccionId") REFERENCES "Leccion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventoLog" ADD CONSTRAINT "EventoLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
