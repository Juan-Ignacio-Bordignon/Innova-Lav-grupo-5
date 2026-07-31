// src/features/progress/services/progressService.ts

import { apiClient } from '../../../services/api/apiClient';
import { ENDPOINTS } from '../../../services/api/endpoints';
import { getAuthToken } from '../../../services/storage/authStorage';

import type {
  ExerciseResolution,
  GetProgressResponse,
  ResolveExerciseParams,
  ResolveExerciseResponse,
  SaveTheoryProgressParams,
  SaveTheoryProgressResponse,
} from '../types';

export async function getProgress() {
  const token = await getRequiredToken();

  return apiClient<GetProgressResponse>(
    ENDPOINTS.PROGRESS,
    {
      method: 'GET',
      token,
    }
  );
}

export async function saveTheoryProgress({
  moduleId,
  lessonId,
  theoryId,
}: SaveTheoryProgressParams) {
  const token = await getRequiredToken();

  return apiClient<SaveTheoryProgressResponse>(
    ENDPOINTS.PROGRESS_SAVE_RESOLVED,
    {
      method: 'POST',
      token,
      body: JSON.stringify({
        moduloId: normalizeId(
          moduleId,
          'módulo'
        ),
        leccionId: normalizeId(
          lessonId,
          'lección'
        ),
        teoriaId: normalizeId(
          theoryId,
          'teoría'
        ),
        isTheory: true,
      }),
    }
  );
}

export async function resolveExercise({
  moduleId,
  lessonId,
  exerciseId,
  answer,
}: ResolveExerciseParams): Promise<ExerciseResolution> {
  const token = await getRequiredToken();

  const response =
    await apiClient<ResolveExerciseResponse>(
      ENDPOINTS.PROGRESS_SAVE_RESOLVED,
      {
        method: 'POST',
        token,
        body: JSON.stringify({
          moduloId: normalizeId(
            moduleId,
            'módulo'
          ),
          leccionId: normalizeId(
            lessonId,
            'lección'
          ),
          ejercicioId: normalizeId(
            exerciseId,
            'ejercicio'
          ),
          respuestaUsuario: answer,
          isTheory: false,
        }),
      }
    );

  return {
    isCorrect: response.esCorrecto,
    pointsEarned: response.puntosGanados,
    currentStreak: response.rachaActual,
    message: response.message,
  };
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

function normalizeId(
  value: number | string,
  label: string
) {
  const normalizedId = Number(value);

  if (
    !Number.isInteger(normalizedId) ||
    normalizedId <= 0
  ) {
    throw new Error(
      `El ID de ${label} no es válido.`
    );
  }

  return normalizedId;
}