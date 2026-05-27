import express from "express";
import cors from "cors";

// Configuración del servidor
const app = express();
const PORT = 3000;
// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("API funcionando");
});
