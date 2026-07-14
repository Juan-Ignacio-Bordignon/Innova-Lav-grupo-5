export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },

  USER: '/user',
  USER_ACHIEVEMENTS: '/user/logros',
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

  FAVORITES: '/favorites',
  FAVORITE_BY_EXERCISE: (exerciseId: number | string) =>
    `/favorites/${exerciseId}`,

  EVENT_LOG: '/event-log',
} as const;