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

  //console.log('Modules API response:', response);

  return response.modules.map(mapApiModuleToHomeModule);
}

function mapApiModuleToHomeModule(module: ApiModule): HomeModule {
  return {
    id: String(module.id),
    title: 'Módulo',
    subtitle: module.nombre,
    description: getModuleDescription(module),
    progress: 0,
    icon: getModuleIcon(module.nombre),
  };
}

function getModuleDescription(module: ApiModule) {
  if (module.nombre.toLowerCase().includes('palabra')) {
    return 'Tu avance: 0%';
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