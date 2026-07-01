import { HomeModule } from '../../features/modules/types';

export const MOCK_MODULE_DETAILS = {
  moduleId: '1',
  title: 'Palabras',
  description: 'Vocabulario para situaciones diarias.',
  progress: 45,
  lessons: [
    { moduleId: '1', title: 'Alfabeto', status: 'completed' },
    { moduleId: '2', title: 'Días de la semana', status: 'completed' },
    { moduleId: '3', title: 'Números', status: 'inProgress' },
    { moduleId: '4', title: 'Sentimientos', status: 'notStarted' },
  ] as const,
};