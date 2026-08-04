// src/features/favorites/services/favoritesService.ts

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

    const favorites = Array.isArray(response.favorites)
      ? response.favorites
      : [];

    return favorites
      .map(mapFavorite)
      .filter(
        (favorite): favorite is FavoriteItem =>
          favorite !== null
      )
      .sort(
        (firstFavorite, secondFavorite) =>
          new Date(secondFavorite.createdAt).getTime() -
          new Date(firstFavorite.createdAt).getTime()
      );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'No se pudieron obtener los favoritos'
    ) {
      return [];
    }

    throw error;
  }
}

export async function addFavorite(theoryId: number | string) {
  const token = await getRequiredToken();

  return apiClient<AddFavoriteResponse>(ENDPOINTS.FAVORITES, {
    method: 'POST',
    token,
    body: JSON.stringify({
      teoriaId: theoryId,
    }),
  });
}

export async function removeFavorite(theoryId: number | string) {
  const token = await getRequiredToken();

  return apiClient<RemoveFavoriteResponse>(
    ENDPOINTS.FAVORITE_BY_THEORY(theoryId),
    {
      method: 'DELETE',
      token,
    }
  );
}

export async function isTheoryFavorite(
  theoryId: number | string
) {
  const favorites = await getFavorites();
  const normalizedTheoryId = String(theoryId);

  return favorites.some(
    (favorite) => favorite.theoryId === normalizedTheoryId
  );
}

async function getRequiredToken() {
  const token = await getAuthToken();

  if (!token) {
    throw new Error(
      'Tu sesión venció. Volvé a iniciar sesión.'
    );
  }

  return token;
}

function mapFavorite(
  favorite: FavoriteApi
): FavoriteItem | null {
  if (
    !favorite.teoria ||
    !favorite.leccion ||
    !favorite.modulo
  ) {
    return null;
  }

  const theoryId = String(favorite.teoria.id);

  const title =
    favorite.teoria.titulo?.trim() ||
    `Teoría ${theoryId}`;

  const videoUrl =
    favorite.teoria.contenidoMultimedia?.trim() ||
    undefined;

  return {
    favoriteId: String(favorite.id),
    theoryId,

    // Compatibilidad temporal.
    exerciseId: theoryId,

    title,
    description: `Contenido de ${favorite.leccion.titulo}`,
    videoUrl,
    createdAt: favorite.createdAt,

    moduleId: String(favorite.modulo.id),
    moduleName: favorite.modulo.nombre,

    lessonId: String(favorite.leccion.id),
    lessonTitle: favorite.leccion.titulo,
  };
}