import { ENDPOINTS } from '../../../services/api/endpoints';
import { apiClient } from '../../../services/api/apiClient';
import {
  getAuthToken,
  removeAuthToken,
  saveAuthToken,
} from '../../../services/storage/authStorage';

import type { AuthResponse, LoginRequest, RegisterRequest } from '../types';

export async function login(payload: LoginRequest) {
  const response = await apiClient<AuthResponse>(ENDPOINTS.AUTH.LOGIN, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  await saveAuthToken(response.token);

  console.log('Token guardado:', response.token);

  return response;
}

export async function register(payload: RegisterRequest) {
  const response = await apiClient<AuthResponse>(ENDPOINTS.AUTH.REGISTER, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  await saveAuthToken(response.token);

  console.log('Token guardado:', response.token); 

  return response;
}

export async function logout() {
  await removeAuthToken();
}

export async function getStoredToken() {
  return getAuthToken();
}