export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },

  USER: '/user',
  MODULES: '/module',

  MODULE_LESSONS: (moduleId: number | string) =>
    `/module/${moduleId}/lessons`,

  MODULE_LESSON_DETAIL: (
    moduleId: number | string,
    lessonId: number | string
  ) => `/module/${moduleId}/lessons/${lessonId}`,

  LESSONS: '/lessons',
  EXERCISES: '/exercises',
  PROGRESS: '/progress',
} as const;