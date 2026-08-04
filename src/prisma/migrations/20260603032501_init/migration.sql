-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rachaActual" INTEGER NOT NULL DEFAULT 0,
    "ultimaActividad" TIMESTAMP(3),
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modulo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Modulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leccion" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "videoUrl" TEXT,
    "moduloId" INTEGER NOT NULL,

    CONSTRAINT "Leccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Progreso" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "moduloId" INTEGER NOT NULL,
    "leccionId" INTEGER NOT NULL,

    CONSTRAINT "Progreso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Leccion" ADD CONSTRAINT "Leccion_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "Modulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progreso" ADD CONSTRAINT "Progreso_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progreso" ADD CONSTRAINT "Progreso_leccionId_fkey" FOREIGN KEY ("leccionId") REFERENCES "Leccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
