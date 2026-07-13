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

  MODULE_LESSON_EXERCISES: (
    moduleId: number | string,
    lessonId: number | string
  ) => `/module/${moduleId}/lessons/${lessonId}/exercises`,

  LESSONS: '/lessons',
  EXERCISES: '/exercises',
  PROGRESS: '/progress',

  EVENT_LOG: '/event-log',
} as const;