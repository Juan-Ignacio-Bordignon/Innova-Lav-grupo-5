import { register, login } from "../services/auth.service.js";

export const postRegister = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const { token } = await register({ nombre, email, password });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};

export const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token } = await login({ email, password });
    res.json({
      message: "Usuario autenticado exitosamente",
      token,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};
