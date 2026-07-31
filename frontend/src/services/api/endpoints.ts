// src/services/api/endpoints.ts

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
  PROGRESS_SAVE_RESOLVED: '/progress/save-resolved',

  FAVORITES: '/favorites',

  FAVORITE_BY_THEORY: (theoryId: number | string) =>
    `/favorites/${theoryId}`,

  /*
   * Alias temporal para no romper algún archivo
   * antiguo que todavía lo esté utilizando.
   */
  FAVORITE_BY_EXERCISE: (exerciseId: number | string) =>
    `/favorites/${exerciseId}`,

  EVENT_LOG: '/event-log',
} as const;