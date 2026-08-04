// src/features/user/services/userService.ts

import { apiClient } from '../../../services/api/apiClient';
import { ENDPOINTS } from '../../../services/api/endpoints';
import { getAuthToken } from '../../../services/storage/authStorage';

import type { CurrentUserResponse } from '../types';

export async function getCurrentUser(): Promise<CurrentUserResponse | null> {
  const token = await getAuthToken();

  if (!token) {
    return null;
  }

  return apiClient<CurrentUserResponse>(ENDPOINTS.USER, {
    method: 'GET',
    token,
  });
}