export type FavoriteContentApi = {
  id: number | string;
  titulo?: string;
  nombre?: string;
  contenido?: string | null;
  videoUrl?: string | null;
  contenidoMultimedia?: string | null;
  moduleId?: number | string;
  moduloId?: number | string;
  moduleName?: string;
  moduloNombre?: string;
  lessonId?: number | string;
  leccionId?: number | string;
  lessonTitle?: string;
  leccionTitulo?: string;
};

export type FavoriteApi = {
  id: number | string;
  userId: number | string;
  exerciseId?: number | string;
  ejercicioId?: number | string;
  leccionId?: number | string;
  createdAt: string;
  exercise?: FavoriteContentApi | null;
  ejercicio?: FavoriteContentApi | null;
  leccion?: FavoriteContentApi | null;
};

export type FavoritesResponse = {
  favorites: FavoriteApi[];
};

export type AddFavoriteRequest = {
  exerciseId: number | string;
};

export type AddFavoriteResponse = {
  mensaje: string;
  favorite: FavoriteApi;
};

export type RemoveFavoriteResponse = {
  mensaje: string;
};

export type FavoriteItem = {
  favoriteId: string;
  exerciseId: string;
  title: string;
  description?: string;
  videoUrl?: string;
  createdAt: string;
  moduleId?: string;
  moduleName?: string;
  lessonId?: string;
  lessonTitle?: string;
};
