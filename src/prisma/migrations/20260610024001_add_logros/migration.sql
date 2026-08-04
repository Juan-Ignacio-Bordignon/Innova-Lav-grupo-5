-- CreateTable
CREATE TABLE "Logro" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "icono" TEXT,

    CONSTRAINT "Logro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLogro" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "logroId" INTEGER NOT NULL,
    "fechaObtenido" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserLogro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserLogro_userId_logroId_key" ON "UserLogro"("userId", "logroId");

-- AddForeignKey
ALTER TABLE "UserLogro" ADD CONSTRAINT "UserLogro_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLogro" ADD CONSTRAINT "UserLogro_logroId_fkey" FOREIGN KEY ("logroId") REFERENCES "Logro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
