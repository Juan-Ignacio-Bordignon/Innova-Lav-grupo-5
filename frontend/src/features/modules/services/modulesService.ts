// src/features/modules/services/modulesService.ts

import { HOME_MODULES } from '../../../data/mocks/homeMocks';
import { apiClient } from '../../../services/api/apiClient';
import { ENDPOINTS } from '../../../services/api/endpoints';
import { getCurrentUser } from '../../user/services/userService';

import type { UserProgressItem } from '../../user/types';
import type {
  ApiModule,
  HomeModule,
  HomeModuleIcon,
  LessonStatus,
  ModulesResponse,
} from '../types';

const USE_MOCK_MODULES = false;

// Solo para probar visualmente.
// Antes del commit cambiar a false.
const USE_MOCK_USER_PROGRESS = false;

const MOCK_USER_PROGRESS: UserProgressItem[] = [
  {
    LessonId: 1,
    LessonName: 'Alfabeto',
    ModuleId: 1,
    ModuleName: 'Palabras',
    completadoEn: '2026-06-23T12:00:00Z',
  },
  {
    LessonId: 2,
    LessonName: 'Días de la semana',
    ModuleId: 1,
    ModuleName: 'Palabras',
    completadoEn: '2026-06-23T12:00:00Z',
  },
];

export async function getHomeModules(): Promise<HomeModule[]> {
  if (USE_MOCK_MODULES) {
    return HOME_MODULES;
  }

  const [modulesResponse, currentUser] = await Promise.all([
    apiClient<ModulesResponse>(ENDPOINTS.MODULES, {
      method: 'GET',
    }),
    USE_MOCK_USER_PROGRESS
      ? Promise.resolve(null)
      : getCurrentUser().catch(() => null),
  ]);

  const userProgress = USE_MOCK_USER_PROGRESS
    ? MOCK_USER_PROGRESS
    : currentUser?.progreso ?? [];

  const progressByModule = createProgressByModuleMap(userProgress);

  return modulesResponse.modules.map((module) =>
    mapApiModuleToHomeModule(module, progressByModule)
  );
}

function mapApiModuleToHomeModule(
  module: ApiModule,
  progressByModule: Map<string, Set<string>>
): HomeModule {
  const completedLessonIds = progressByModule.get(String(module.id)) ?? new Set();

  const progress = getModuleProgress(module, completedLessonIds);

  return {
    id: String(module.id),
    title: 'Módulo',
    subtitle: module.nombre,
    description: getHomeModuleStatus(module.nombre, progress),
    detailDescription: module.descripcion,
    progress,
    icon: getModuleIcon(module.nombre),
    lessons: module.lecciones.map((lesson, index) => ({
      id: String(lesson.id),
      title: lesson.titulo,
      status: getLessonStatus({
        lessonId: String(lesson.id),
        lessonIndex: index,
        lessons: module.lecciones,
        completedLessonIds,
      }),
    })),
  };
}

function createProgressByModuleMap(progress: UserProgressItem[]) {
  const progressByModule = new Map<string, Set<string>>();

  progress.forEach((progressItem) => {
    const moduleId = String(progressItem.ModuleId);
    const lessonId = String(progressItem.LessonId);

    const currentLessons = progressByModule.get(moduleId) ?? new Set<string>();

    currentLessons.add(lessonId);
    progressByModule.set(moduleId, currentLessons);
  });

  return progressByModule;
}

function getModuleProgress(
  module: ApiModule,
  completedLessonIds: Set<string>
) {
  const totalLessons = module.lecciones.length;

  if (totalLessons === 0) {
    return 0;
  }

  const completedLessons = module.lecciones.filter((lesson) =>
    completedLessonIds.has(String(lesson.id))
  ).length;

  return Math.round((completedLessons / totalLessons) * 100);
}

function getLessonStatus({
  lessonId,
  lessonIndex,
  lessons,
  completedLessonIds,
}: {
  lessonId: string;
  lessonIndex: number;
  lessons: ApiModule['lecciones'];
  completedLessonIds: Set<string>;
}): LessonStatus {
  if (completedLessonIds.has(lessonId)) {
    return 'completed';
  }

  const firstPendingLessonIndex = lessons.findIndex(
    (lesson) => !completedLessonIds.has(String(lesson.id))
  );

  if (lessonIndex === firstPendingLessonIndex) {
    return 'inProgress';
  }

  return 'notStarted';
}

function getHomeModuleStatus(moduleName: string, progress: number) {
  const normalizedName = moduleName.toLowerCase();

  if (progress > 0) {
    return `Tu avance: ${progress}%`;
  }

  if (normalizedName.includes('palabra')) {
    return `Tu avance: ${progress}%`;
  }

  return '¡Listo para comenzar!';
}

function getModuleIcon(moduleName: string): HomeModuleIcon {
  const normalizedName = moduleName.toLowerCase();

  if (normalizedName.includes('palabra')) {
    return 'words';
  }

  return 'phrases';
}