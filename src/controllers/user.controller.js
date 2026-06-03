export const userById = (req, res) => {
  const { userId } = req.params;
  res.json({
    usuario: {
      userId: userId,
      username: "Juan Pérez",
      email: "juan.perez@example.com",
    },
    progreso: [
      {
        ModuleId: 1,
        LessonId: 3,
      },
      {
        ModuleId: 2,
        LessonId: 1,
      },
    ],
    ultima_leccion: {
      ModuleId: 1,
      LessonId: 3,
    },
    rachaConección: 5,
  });
};
