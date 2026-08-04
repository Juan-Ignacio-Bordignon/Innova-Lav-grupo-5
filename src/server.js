import app from "./app.js";
import dotenv from "dotenv";
import { prisma } from "./prisma/prisma.js";

// Cargar variables de entorno
dotenv.config();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});

// Cierre controlado de conexiones al detener la app
const shutdown = async () => {
  console.log("Cerrando servidor y desconectando Prisma...");
  await prisma.$disconnect();
  server.close(() => {
    console.log("Servidor finalizado.");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
