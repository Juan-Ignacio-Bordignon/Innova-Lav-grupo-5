export const ROUTES = {
  // Rutas existentes del equipo
  HOME: 'Home',
  UPDATES: 'Updates',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  NOT_FOUND: 'NotFound',

  // 🔐 Flujo de Autenticación (Nuevas)
  LOGIN: 'Login',
  REGISTER: 'Register',

  // 📚 Flujo de Aprendizaje / Core MVP (Nuevas)
  LESSON: 'Lesson',
  EXERCISE: 'Exercise',
  FEEDBACK: 'Feedback',
} as const; // El "as const" asegura que TypeScript trate estos valores como fijos e inmutables

// 📐 DEFINICIÓN DEL ROOT STACK PARAM LIST (Lo creás vos acá abajo)
export type RootStackParamList = {
  [ROUTES.HOME]: undefined;      // undefined significa que la pantalla no recibe parámetros
  [ROUTES.UPDATES]: undefined;
  [ROUTES.PROFILE]: undefined;
  [ROUTES.SETTINGS]: undefined;
  [ROUTES.NOT_FOUND]: undefined;

  // 🔐 Autenticación
  [ROUTES.LOGIN]: undefined;
  [ROUTES.REGISTER]: undefined;

  // 📚 Aprendizaje (Aquí sí podemos necesitar parámetros en el futuro)
  [ROUTES.LESSON]: { lessonId: string };   // Ej: Para saber qué video de LSA cargar
  [ROUTES.EXERCISE]: { exerciseId: string }; // Ej: Para saber qué pregunta mostrar
  [ROUTES.FEEDBACK]: { isCorrect: boolean; nextRoute: string }; // Ej: Para mostrar acierto/error
};