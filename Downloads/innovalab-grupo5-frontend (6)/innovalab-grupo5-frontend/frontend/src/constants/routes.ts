// src/constants/routes.ts

export const ROUTES = {
  // 🧭 Pantallas de la barra de pestañas (Tabs)
  HOME: 'Home',
  UPDATES: 'Updates',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  NOT_FOUND: 'NotFound',

  // 🔐 Flujo de Autenticación
  LOGIN: 'Login',
  REGISTER: 'Register',

  // 📚 Flujo de Aprendizaje / Core MVP
  LESSON: 'Lesson',
  EXERCISE: 'Exercise',
  FEEDBACK: 'Feedback',

  // 🔀 NUEVA: El contenedor maestro de las pestañas
  HOME_TABS: 'HomeTabs', 
} as const;

export type RootStackParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.UPDATES]: undefined;
  [ROUTES.PROFILE]: undefined;
  [ROUTES.SETTINGS]: undefined;
  [ROUTES.NOT_FOUND]: undefined;
  [ROUTES.LOGIN]: undefined;
  [ROUTES.REGISTER]: undefined;
  
  // Registramos la nueva ruta en la lista de parámetros
  [ROUTES.HOME_TABS]: undefined; 

  [ROUTES.LESSON]: { lessonId: string };
  [ROUTES.EXERCISE]: { exerciseId: string };
  [ROUTES.FEEDBACK]: { isCorrect: boolean; nextRoute: string };
};