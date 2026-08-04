export type AchievementVisualKey =
  | 'alphabet'
  | 'days'
  | 'numbers'
  | 'feelings'
  | 'greetings'
  | 'introductions'
  | 'environment'
  | 'emergency'
  | 'perfect'
  | 'diploma'
  | 'generic';

export type ProfileAchievement = {
  id: string;
  backendId?: number;
  name: string;
  description: string;
  icon: string;
  visualKey: AchievementVisualKey;
  achieved: boolean;
  achievedAt?: string;
};

export type ProfileOverview = {
  username: string;
  email: string;
  completedLessons: number;
  pendingLessons: number;
  totalLessons: number;
  progressPercentage: number;
  points: number;
  streak: number;
  achievements: ProfileAchievement[];
};

export type AchievementFilter = 'all' | 'completed' | 'pending';

export type RawUserProgressItem = {
  moduleId?: number;
  ModuleId?: number;
  moduloId?: number;

  moduleName?: string;
  ModuleName?: string;
  modulo?: {
    nombre?: string;
  };

  lessonId?: number;
  LessonId?: number;
  leccionId?: number;

  lessonName?: string;
  LessonName?: string;
  leccion?: {
    titulo?: string;
  };

  exerciseId?: number;
  ExerciseId?: number;
  ejercicioId?: number;

  exerciseName?: string;
  ExerciseName?: string;
  ejercicio?: {
    titulo?: string;
  };

  completadoEn?: string | null;
};

export type RawUserAchievement = {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
};

export type RawCurrentUserResponse = {
  usuario: {
    username: string;
    email: string;
  };

  progreso: RawUserProgressItem[];
  ultimaLeccion?: RawUserProgressItem | null;
  puntos: number;
  racha: number;
  logros: RawUserAchievement[];
};

export type RawEarnedAchievement = {
  id: number;
  logroId: number;
  fechaObtenido: string;
  logro: RawUserAchievement;
};

export type RawAchievementsResponse = {
  logros: RawEarnedAchievement[];
};