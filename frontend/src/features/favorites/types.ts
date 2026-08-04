// src/features/favorites/types.ts

export type FavoriteTheoryApi = {
  id: number | string;
  titulo: string;
  tipo: 'teoria' | string;
  contenidoMultimedia?: string | null;
};

export type FavoriteLessonApi = {
  id: number | string;
  titulo: string;
};

export type FavoriteModuleApi = {
  id: number | string;
  nombre: string;
};

export type FavoriteApi = {
  id: number | string;
  createdAt: string;
  teoria: FavoriteTheoryApi;
  leccion: FavoriteLessonApi;
  modulo: FavoriteModuleApi;
};

export type FavoritesResponse = {
  favorites: FavoriteApi[];
};

export type AddFavoriteRequest = {
  teoriaId: number | string;
};

export type CreatedFavoriteApi = {
  id: number | string;
  userId: number | string;
  teoriaId: number | string;
  createdAt: string;
};

export type AddFavoriteResponse = {
  mensaje: string;
  favorite: CreatedFavoriteApi;
};

export type RemoveFavoriteResponse = {
  mensaje: string;
};

export type FavoriteItem = {
  favoriteId: string;
  theoryId: string;

  /*
   * Alias temporal para evitar romper componentes
   * que anteriormente usaban exerciseId.
   */
  exerciseId: string;

  title: string;
  description?: string;
  videoUrl?: string;
  createdAt: string;

  moduleId: string;
  moduleName: string;

  lessonId: string;
  lessonTitle: string;
};