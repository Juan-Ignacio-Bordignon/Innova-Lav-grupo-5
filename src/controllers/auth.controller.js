import { register, login } from "../services/auth.service.js";

// Controlador para el registro de usuarios
export const postRegister = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { nombre, email, password } = req.body;

    // Llamar a la función de registro del servicio de autenticación
    const { token } = await register({ nombre, email, password });

    // Envia respuesta con el token de autenticación
    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
    });
  } catch (e) {
    // En caso de error, enviar una respuesta con el mensaje de error
    res.status(400).json({
      message: e.message,
    });
  }
};

// Controlador para el inicio de sesión de usuarios
export const postLogin = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { email, password } = req.body;

    // Llamar a la función de inicio de sesión del servicio de autenticación
    const { token } = await login({ email, password });

    // Enviar respuesta con el token de autenticación
    res.json({
      message: "Usuario autenticado exitosamente",
      token,
    });
  } catch (e) {
    // En caso de error, enviar una respuesta con el mensaje de error
    res.status(400).json({
      message: e.message,
    });
  }
};
