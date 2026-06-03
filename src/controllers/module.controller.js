export const getModules = (req, res) => {
  res.json({
    module: [
      {
        id: 1,
        nombre: "Módulo 1",
        descripcion: "Descripción del módulo 1",
        lessons: [
          {
            id: 1,
            titulo: "Lección 1",
          },
          {
            id: 2,
            titulo: "Lección 2",
          },
        ],
      },
      {
        id: 2,
        nombre: "Módulo 2",
        descripcion: "Descripción del módulo 2",
        lessons: [
          {
            id: 3,
            titulo: "Lección 1",
          },
          {
            id: 4,
            titulo: "Lección 2",
          },
        ],
      },
    ],
  });
};

export const getLessons = (req, res) => {
  const { moduleId } = req.params;

  res.json({
    lessons: [
      {
        id: 1,
        titulo: "Lección 1",
        contenido: "Contenido de la lección 1",
      },
      {
        id: 2,
        titulo: "Lección 2",
        contenido: "Contenido de la lección 2",
      },
    ],
  });
};

export const getLesson = (req, res) => {
  const { moduleId, lessonId } = req.params;

  res.json({
    lesson: {
      id: `${lessonId}`,
      titulo: `Lección ${lessonId}`,
      contenido: `Contenido de la lección ${lessonId}`,
    },
  });
};
