export const getModules = (req, res) => {
  res.json({ message: "Lista de módulos" });
};

export const getLessons = (req, res) => {
  const { moduleId } = req.params;

  res.json({
    message: `Lecciones del módulo ${moduleId}`,
  });
};

export const getLesson = (req, res) => {
  const { moduleId, lessonId } = req.params;

  res.json({
    message: `Lección ${lessonId} del módulo ${moduleId}`,
  });
};
