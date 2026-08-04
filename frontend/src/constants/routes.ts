// src/constants/routes.ts

export const ROUTES = {
  // 🧭 Pantallas de la barra de pestañas
  HOME: 'Home',
  FAVORITES: 'Favorites',
  PROFILE_TAB: 'ProfileTab',

  // Se mantiene por compatibilidad
  UPDATES: 'Updates',
  PROFILE: 'Profile',
  ACHIEVEMENTS: 'Achievements',
  SETTINGS: 'Settings',
  NOT_FOUND: 'NotFound',

  // 🔐 Autenticación
  LOGIN: 'Login',
  REGISTER: 'Register',

  // 📚 Aprendizaje
  MODULE_DETAIL: 'ModuleDetail',
  LESSON: 'Lesson',
  EXERCISE: 'Exercise',
  FEEDBACK: 'Feedback',

  // 🔀 Navegadores
  HOME_TABS: 'HomeTabs',
  LESSON_SELECTION: 'LessonSelection',
} as const;

export type LearningStatus =
  | 'completed'
  | 'inProgress'
  | 'notStarted';

export type LearningContentType =
  | 'theory'
  | 'trueFalse'
  | 'multipleChoice'
  | 'orderWords'
  | 'unknown';

export type ExerciseSource =
  | 'lesson'
  | 'favorites';

export type ExerciseAnswerValue =
  | string
  | boolean;

export type ExerciseExpectedAnswer =
  | ExerciseAnswerValue
  | ExerciseAnswerValue[];

export type RootStackParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.FAVORITES]: undefined;
  [ROUTES.PROFILE_TAB]: undefined;

  [ROUTES.UPDATES]: undefined;
  [ROUTES.PROFILE]: undefined;
  [ROUTES.ACHIEVEMENTS]: undefined;
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
      status?: LearningStatus;
    }[];
  };

  [ROUTES.LESSON]: {
    moduleId: string;
    moduleName: string;
    moduleDescription?: string;

    moduleLessons?: {
      id: string;
      title: string;
      status?: LearningStatus;
    }[];

    lessonId: string;
    lessonTitle: string;
    lessonStatus?: LearningStatus;
    moduleProgress?: number;
  };

  [ROUTES.EXERCISE]: {
    source?: ExerciseSource;

    /*
     * Cuando el contenido es teoría,
     * exerciseId representa el ID de la teoría.
     */
    exerciseId: string;

    contentKey?: string;
    contentType?: LearningContentType;

    moduleId?: string;
    moduleName?: string;

    lessonId?: string;
    lessonTitle?: string;

    exerciseTitle?: string;

    contenidoMultimedia?:
      | string
      | string[];

    options?: ExerciseAnswerValue[];

    expectedAnswer?:
      ExerciseExpectedAnswer;

    contentIndex?: number;
    contentTotal?: number;
  };

  [ROUTES.FEEDBACK]: {
    isCorrect: boolean;
    nextRoute: string;
  };
};