export type HomeModuleIcon = 'words' | 'phrases';

export type HomeModule = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  progress: number;
  icon: HomeModuleIcon;
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