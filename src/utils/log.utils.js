import { generateToken, verifyToken } from "../utils/jws.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const logEvent = async (userId, evento, properties) => {
  try {
    const event = await prisma.eventoLog.create({
      data: {
        userId,
        evento,
        properties,
      },
    });
    return event;
  } catch (error) {
    console.error("Error al registrar el evento:", error);
  }
};

export const getAllEventLogs = async () => {
  try {
    const eventLogs = await prisma.eventoLog.findMany();
    return eventLogs;
  } catch (error) {
    console.error("Error al obtener los registros de eventos:", error);
  }
};
