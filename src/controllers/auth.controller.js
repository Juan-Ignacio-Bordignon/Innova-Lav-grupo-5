export const postRegister = (req, res) => {
  const { username, mail, password } = req.body;
  res.json({
    message: "Usuario registrado exitosamente",
    username: username,
    mail: mail,
    password: password,
  });
};

export const postLogin = (req, res) => {
  const { mail, password } = req.body;
  res.json({
    message: "Usuario autenticado exitosamente",
    mail: mail,
    password: password,
  });
};
