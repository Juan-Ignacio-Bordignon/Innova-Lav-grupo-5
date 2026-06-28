// src/constants/routes.ts

export const ROUTES = {
  // 🧭 Pantallas de la barra de pestañas (Tabs)
  HOME: 'Home',
  FAVORITES: 'Favorites',
  PROFILE_TAB: 'ProfileTab',

  // Se mantiene por compatibilidad con lo que ya estaba
  UPDATES: 'Updates',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  NOT_FOUND: 'NotFound',

  // 🔐 Flujo de Autenticación
  LOGIN: 'Login',
  REGISTER: 'Register',

  // 📚 Flujo de Aprendizaje / Core MVP
  MODULE_DETAIL: 'ModuleDetail',
  LESSON: 'Lesson',
  EXERCISE: 'Exercise',
  FEEDBACK: 'Feedback',

  // 🔀 Contenedor maestro de las pestañas
  HOME_TABS: 'HomeTabs',
} as const;

export type RootStackParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.FAVORITES]: undefined;
  [ROUTES.PROFILE_TAB]: undefined;

  [ROUTES.UPDATES]: undefined;
  [ROUTES.PROFILE]: undefined;
  [ROUTES.SETTINGS]: undefined;
  [ROUTES.NOT_FOUND]: undefined;

  [ROUTES.LOGIN]: undefined;
  [ROUTES.REGISTER]: undefined;

  [ROUTES.HOME_TABS]: undefined;

  [ROUTES.MODULE_DETAIL]: {
    moduleId: string;
    moduleName: string;
    moduleDescription: string;
    moduleProgress: number;
    lessons: {
      id: string;
      title: string;
    }[];
  };

  [ROUTES.LESSON]: { lessonId: string };
  [ROUTES.EXERCISE]: { exerciseId: string };
  [ROUTES.FEEDBACK]: { isCorrect: boolean; nextRoute: string };
};