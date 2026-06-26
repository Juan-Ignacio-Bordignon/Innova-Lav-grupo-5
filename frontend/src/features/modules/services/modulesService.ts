import { HOME_MODULES } from '../../../data/mocks/homeMocks';
import { apiClient } from '../../../services/api/apiClient';
import { ENDPOINTS } from '../../../services/api/endpoints';
import { getAuthToken } from '../../../services/storage/authStorage';

import type { HomeModule } from '../types';

// Mientras el backend no tenga confirmada la respuesta de /modules,
// dejamos los mocks activados.
const USE_MOCK_MODULES = true;

type ModulesApiResponse = HomeModule[];

export async function getHomeModules(): Promise<HomeModule[]> {
  if (USE_MOCK_MODULES) {
    return HOME_MODULES;
  }

  const token = await getAuthToken();

  return apiClient<ModulesApiResponse>(ENDPOINTS.MODULES, {
    method: 'GET',
    token: token ?? undefined,
  });
}