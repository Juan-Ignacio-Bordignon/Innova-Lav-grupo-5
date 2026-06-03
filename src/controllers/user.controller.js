export const userById = (req, res) => {
  const { userId } = req.params;
  res.json({
    usuario: {
      userId: 1,
      username: "Juan Pérez",
      email: "juan.perez@example.com",
    },
    progreso: [
      {
        ModuleId: 1,
        LessonId: [1, 2, 3],
      },
      {
        ModuleId: 2,
        LessonId: [4],
      },
    ],
    ultimaLeccion: {
      ModuleId: 1,
      LessonId: [3],
    },
    puntos: 50,
    logros: [
      {
        id: 1,
        nombre: "Logro 1",
        descripcion: "Descripción del logro 1",
      },
      {
        id: 2,
        nombre: "Logro 2",
        descripcion: "Descripción del logro 2",
      },
    ],
  });
};
