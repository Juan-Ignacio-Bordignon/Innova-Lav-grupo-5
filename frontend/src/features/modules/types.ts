export type HomeModuleIcon = 'words' | 'phrases';

export type HomeModule = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  progress: number;
  icon: HomeModuleIcon;
};