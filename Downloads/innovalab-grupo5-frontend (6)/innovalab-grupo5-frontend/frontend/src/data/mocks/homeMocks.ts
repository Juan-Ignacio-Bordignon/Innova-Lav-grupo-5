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

// Datos exactos de la captura del Figma
export const MOCK_PALABRAS_DETAIL: CategoryDetail = {
  title: 'Palabras',
  description: 'Aprenderás palabras simples para luego poder conversar.',
  items: [
    { id: 'sub-1', title: 'Alfabeto', status: 'Pendiente', iconName: 'font' },
    { id: 'sub-2', title: 'Días de la semana', status: 'Pendiente', iconName: 'calendar' },
    { id: 'sub-3', title: 'Números', status: 'Pendiente', iconName: 'numeric' },
    { id: 'sub-4', title: 'Sentimientos', status: 'Pendiente', iconName: 'shield-heart' },
  ]
};