export const postRegister = (req, res) => {
  const { username, email, password } = req.body;
  res.json({
    message: "Usuario registrado exitosamente",
    username: username,
    email: email,
    password: password,
  });
};

export const postLogin = (req, res) => {
  const { email, password } = req.body;
  res.json({
    message: "Usuario autenticado exitosamente",
    email: email,
    password: password,
  });
};
