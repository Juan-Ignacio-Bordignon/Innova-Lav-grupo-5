// src/features/user/types.ts

export type UserProgressItem = {
  LessonId: number;
  LessonName: string;
  ModuleId: number;
  ModuleName: string;
  completadoEn: string;
};

export type UserLastLesson = {
  ModuleId: number;
  ModuleName: string;
  LessonId: number;
  LessonName: string;
};

export type UserAchievement = {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
};

export type CurrentUserResponse = {
  usuario: {
    username: string;
    email: string;
  };
  progreso: UserProgressItem[];
  ultimaLeccion: UserLastLesson;
  puntos: number;
  racha: number;
  logros: UserAchievement[];
};