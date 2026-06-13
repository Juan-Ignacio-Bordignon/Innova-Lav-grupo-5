export interface FeedItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
}

export const MOCK_FEED_ITEMS: FeedItem[] = [
  {
    id: 'feed-1',
    title: '¡Bienvenido a InnovaLab!',
    description: 'Comenzá tu recorrido explorando los módulos de aprendizaje interactivos que tenemos preparados para vos.',
    category: 'General',
    date: '10/06/2026',
  },
  {
    id: 'feed-2',
    title: 'Nuevo Desafío Técnico Disponible',
    description: 'Ya podés acceder al laboratorio de algoritmos de la semana 4. Poné a prueba tus habilidades de lógica.',
    category: 'Desafíos',
    date: '09/06/2026',
  }
];