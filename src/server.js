import app from "./app.js";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
