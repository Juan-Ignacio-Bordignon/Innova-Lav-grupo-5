import { apiClient } from '../../../services/api/apiClient';
import { ENDPOINTS } from '../../../services/api/endpoints';
import { getAuthToken } from '../../../services/storage/authStorage';

import type {
  AddFavoriteResponse,
  FavoriteApi,
  FavoriteItem,
  FavoritesResponse,
  RemoveFavoriteResponse,
} from '../types';

export async function getFavorites(): Promise<FavoriteItem[]> {
  const token = await getRequiredToken();

  try {
    const response = await apiClient<FavoritesResponse>(
      ENDPOINTS.FAVORITES,
      {
        method: 'GET',
        token,
      }
    );

    return (response.favorites ?? [])
      .map(mapFavorite)
      .filter(
        (favorite): favorite is FavoriteItem =>
          favorite !== null
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message ===
        'No se pudieron obtener los favoritos'
    ) {
      return [];
    }

    throw error;
  }
}

export async function addFavorite(exerciseId: number | string) {
  const token = await getRequiredToken();

  return apiClient<AddFavoriteResponse>(ENDPOINTS.FAVORITES, {
    method: 'POST',
    token,
    body: JSON.stringify({ exerciseId }),
  });
}

export async function removeFavorite(exerciseId: number | string) {
  const token = await getRequiredToken();

  return apiClient<RemoveFavoriteResponse>(
    ENDPOINTS.FAVORITE_BY_EXERCISE(exerciseId),
    {
      method: 'DELETE',
      token,
    }
  );
}

export async function isExerciseFavorite(exerciseId: number | string) {
  const favorites = await getFavorites();

  return favorites.some(
    (favorite) => favorite.exerciseId === String(exerciseId)
  );
}

async function getRequiredToken() {
  const token = await getAuthToken();

  if (!token) {
    throw new Error('Tu sesión venció. Volvé a iniciar sesión.');
  }

  return token;
}

function mapFavorite(favorite: FavoriteApi): FavoriteItem | null {
  // El contrato compartido mezcla nombres de lección y ejercicio.
  // Se aceptan ambas variantes para mantener el frontend compatible.
  const content = favorite.exercise ?? favorite.ejercicio ?? favorite.leccion;

  const exerciseId =
    favorite.exerciseId ??
    favorite.ejercicioId ??
    favorite.leccionId ??
    content?.id;

  if (exerciseId === undefined || exerciseId === null) {
    return null;
  }

  const title =
    content?.titulo?.trim() ||
    content?.nombre?.trim() ||
    `Ejercicio ${exerciseId}`;

  const description = content?.contenido?.trim() || undefined;
  const videoUrl =
    content?.videoUrl?.trim() || content?.contenidoMultimedia?.trim() || undefined;

  return {
    favoriteId: String(favorite.id),
    exerciseId: String(exerciseId),
    title,
    description,
    videoUrl,
    createdAt: favorite.createdAt,
    moduleId: toOptionalString(content?.moduleId ?? content?.moduloId),
    moduleName: content?.moduleName ?? content?.moduloNombre,
    lessonId: toOptionalString(content?.lessonId ?? content?.leccionId),
    lessonTitle: content?.lessonTitle ?? content?.leccionTitulo,
  };
}

function toOptionalString(value?: number | string) {
  if (value === undefined || value === null) {
    return undefined;
  }

  return String(value);
}
