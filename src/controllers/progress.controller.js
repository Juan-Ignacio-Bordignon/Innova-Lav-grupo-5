export const getProgress = (req, res) => {
  const { userId } = req.params;
  res.json({
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
  });
};

export const updateProgress = (req, res) => {
  const { ModuleId, LessonId } = req.body;
  res.json({ message: "Progreso actualizado exitosamente" });
};
