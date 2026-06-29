import type { HomeModule } from '../../features/modules/types';

export interface SubCategoryItem {
  id: string;
  title: string;
  status: 'Pendiente' | 'Completado';
  iconName: string;
}

export interface CategoryDetail {
  title: string;
  description: string;
  items: SubCategoryItem[];
}

// Datos del detalle del módulo Palabras
export const MOCK_PALABRAS_DETAIL: CategoryDetail = {
  title: 'Palabras',
  description: 'Aprenderás palabras simples para luego poder conversar.',
  items: [
    {
      id: 'sub-1',
      title: 'Alfabeto',
      status: 'Pendiente',
      iconName: 'font',
    },
    {
      id: 'sub-2',
      title: 'Días de la semana',
      status: 'Pendiente',
      iconName: 'calendar',
    },
    {
      id: 'sub-3',
      title: 'Números',
      status: 'Pendiente',
      iconName: 'numeric',
    },
    {
      id: 'sub-4',
      title: 'Sentimientos',
      status: 'Pendiente',
      iconName: 'shield-heart',
    },
  ],
};

// Módulos visibles en la pantalla Home
export const HOME_MODULES: HomeModule[] = [
  {
    id: '1',
    title: 'Módulo',
    subtitle: 'Palabras',
    description: 'Tu avance: 20%',
    progress: 20,
    icon: 'words',
    lessons: [
      { id: '1', title: 'Alfabeto' },
      { id: '2', title: 'Días de la semana' },
      { id: '3', title: 'Números' },
      { id: '4', title: 'Sentimientos' },
    ],
  },
  {
    id: '2',
    title: 'Módulo',
    subtitle: 'Frases',
    description: '¡Listo para comenzar!',
    progress: 0,
    icon: 'phrases',
    lessons: [
      { id: '5', title: 'Saludos' },
      { id: '6', title: 'Presentación' },
      { id: '7', title: 'Preguntas frecuentes' },
      { id: '8', title: 'Frases cotidianas' },
    ],
  },
];