import { logEvent, getAllEventLogs } from "../utils/log.utils.js";

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
    const { token } = req.headers.authorization.split(" ")[1];
    const { event_name, properties } = req.body;
    const userId = verifyToken(token);
    await logEvent(userId, event_name, properties);
    res.status(201);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
