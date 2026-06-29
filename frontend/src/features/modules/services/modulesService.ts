import { HOME_MODULES } from '../../../data/mocks/homeMocks';
import { apiClient } from '../../../services/api/apiClient';
import { ENDPOINTS } from '../../../services/api/endpoints';

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

  const response = await apiClient<ModulesResponse>(ENDPOINTS.MODULES, {
    method: 'GET',
  });

  return response.modules.map(mapApiModuleToHomeModule);
}

function mapApiModuleToHomeModule(module: ApiModule): HomeModule {
  const progress = 0;

  return {
    id: String(module.id),
    title: 'Módulo',
    subtitle: module.nombre,
    description: getHomeModuleStatus(module.nombre, progress),
    progress,
    icon: getModuleIcon(module.nombre),
    lessons: module.lecciones.map((lesson) => ({
      id: String(lesson.id),
      title: lesson.titulo,
    })),
  };
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