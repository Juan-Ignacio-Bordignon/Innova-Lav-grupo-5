// src/features/favorites/data/mockFavorites.ts
import { IconState } from '../../features/favorites/components/FavoriteIcons';

export interface FavoriteItem {
  id: string;
  title: string;
  status: IconState;
  type: 'Palabras' | 'Frases';
}

export const MOCK_FAVORITES: FavoriteItem[] = [
  { id: '1', title: 'Abecedario', status: 'completed', type: 'Palabras' },
  { id: '2', title: 'Días de la semana', status: 'completed', type: 'Palabras' },
  { id: '3', title: 'Números', status: 'notStarted', type: 'Palabras' },
  { id: '4', title: 'Saludos básicos', status: 'progress', type: 'Frases' },
  { id: '5', title: 'Verbos comunes', status: 'notStarted', type: 'Frases' },
];