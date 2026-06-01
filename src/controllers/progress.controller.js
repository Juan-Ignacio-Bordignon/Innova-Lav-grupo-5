export const getProgress = (req, res) => {
  res.json({
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
  });
};

export const updateProgress = (req, res) => {
  const { ModuleId, LessonId } = req.body;
  res.json({ message: "Progreso actualizado exitosamente" });
};
