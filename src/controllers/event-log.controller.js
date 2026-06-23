import { logEvent, getAllEventLogs } from "../utils/log.utils.js";
import { verifyToken } from "../utils/jws.js";

export const getEventLogs = async (req, res) => {
  try {
    const eventLogs = await getAllEventLogs();
    res.status(201).json(eventLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postEventLog = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({
        message: "Token requerido",
      });
    }
    const token = authorization.split(" ")[1];
    console.log(token);
    const { evento, properties } = req.body;
    const userId = verifyToken(token);
    const createdEvent = await logEvent(userId, evento, properties);
    res.status(201).json({ createdEvent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
