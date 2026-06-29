// src/features/modules/types.ts

export type HomeModuleIcon = 'words' | 'phrases';

export type LessonStatus = 'completed' | 'inProgress' | 'notStarted';

export type HomeModuleLesson = {
  id: string;
  title: string;
  status?: LessonStatus;
};

export type HomeModule = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailDescription?: string;
  progress: number;
  icon: HomeModuleIcon;
  lessons: HomeModuleLesson[];
};

export type ApiLesson = {
  id: number;
  titulo: string;
};

export type ApiModule = {
  id: number;
  nombre: string;
  descripcion: string;
  lecciones: ApiLesson[];
};

export type ModulesResponse = {
  modules: ApiModule[];
};