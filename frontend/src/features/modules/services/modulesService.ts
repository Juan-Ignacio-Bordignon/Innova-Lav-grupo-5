import { HOME_MODULES } from '../../../data/mocks/homeMocks';
import { apiClient } from '../../../services/api/apiClient';
import { ENDPOINTS } from '../../../services/api/endpoints';

import {
  buildLearningProgressOverview,
  type LearningProgressOverview,
} from '../../progress/services/learningProgressService';

import {
  getProgress,
} from '../../progress/services/progressService';

import type {
  ApiModule,
  HomeModule,
  HomeModuleIcon,
  ModulesResponse,
} from '../types';

const USE_MOCK_MODULES = false;

export async function getHomeModules(): Promise<HomeModule[]> {
  if (USE_MOCK_MODULES) {
    return HOME_MODULES;
  }

  const [
    modulesResponse,
    progressResponse,
  ] = await Promise.all([
    apiClient<ModulesResponse>(
      ENDPOINTS.MODULES,
      {
        method: 'GET',
      },
    ),

    getProgress(),
  ]);

  const learningProgress =
    await buildLearningProgressOverview(
      modulesResponse.modules,
      progressResponse.data,
    );

  return modulesResponse.modules.map(
    (module) =>
      mapApiModuleToHomeModule(
        module,
        learningProgress,
      ),
  );
}

function mapApiModuleToHomeModule(
  module: ApiModule,
  learningProgress: LearningProgressOverview,
): HomeModule {
  const moduleId = String(module.id);

  const progress =
    learningProgress.moduleProgressById.get(
      moduleId,
    ) ?? 0;

  return {
    id: moduleId,

    title: 'Módulo',

    subtitle:
      module.nombre,

    description:
      getHomeModuleStatus(
        module.nombre,
        progress,
      ),

    detailDescription:
      module.descripcion,

    progress,

    icon:
      getModuleIcon(
        module.nombre,
      ),

    lessons:
      module.lecciones.map(
        (lesson) => {
          const lessonId = String(
            lesson.id,
          );

          const lessonKey =
            `${moduleId}:${lessonId}`;

          return {
            id: lessonId,

            title:
              lesson.titulo,

            status:
              learningProgress
                .lessonStatusByKey
                .get(lessonKey) ??
              'notStarted',
          };
        },
      ),
  };
}

function getHomeModuleStatus(
  moduleName: string,
  progress: number,
) {
  if (progress >= 100) {
    return '¡Módulo completado!';
  }

  if (progress > 0) {
    return `Tu avance: ${progress}%`;
  }

  const normalizedName =
    moduleName.toLowerCase();

  if (
    normalizedName.includes(
      'palabra',
    )
  ) {
    return 'Empezá a aprender nuevas señas.';
  }

  return '¡Listo para comenzar!';
}

function getModuleIcon(
  moduleName: string,
): HomeModuleIcon {
  const normalizedName =
    moduleName.toLowerCase();

  if (
    normalizedName.includes(
      'palabra',
    )
  ) {
    return 'words';
  }

  return 'phrases';
}