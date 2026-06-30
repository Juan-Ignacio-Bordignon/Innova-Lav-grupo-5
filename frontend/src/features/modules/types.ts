export type HomeModuleIcon = 'words' | 'phrases';

export type HomeModuleLesson = {
  id: string;
  title: string;
};

export type HomeModule = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
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