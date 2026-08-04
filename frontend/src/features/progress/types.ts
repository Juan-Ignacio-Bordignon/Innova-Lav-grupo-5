// src/features/progress/types.ts

import type { ExerciseAnswerValue } from '../exercises/types';

export type ProgressEntryApi = {
  id: number | string;
  userId: number | string;
  moduloId: number | string;
  leccionId: number | string;

  teoriaId: number | string | null;
  ejercicioId: number | string | null;

  completadoEn: string | null;
  primerIntento: string;

  errores: number;
  puntos: number;
};

export type GetProgressResponse = {
  message: string;
  data: ProgressEntryApi[];
};

export type SaveTheoryProgressParams = {
  moduleId: number | string;
  lessonId: number | string;
  theoryId: number | string;
};

export type ResolveExerciseParams = {
  moduleId: number | string;
  lessonId: number | string;
  exerciseId: number | string;
  answer:
    | ExerciseAnswerValue
    | ExerciseAnswerValue[];
};

export type SaveTheoryProgressResponse = {
  message: string;
  data: ProgressEntryApi;
};

export type ResolveExerciseResponse = {
  message: string;
  esCorrecto: boolean;
  puntosGanados: number;
  rachaActual: number;
  data: ProgressEntryApi;
};

/*
 * Modelo normalizado para que los componentes
 * no dependan de los nombres en español del backend.
 */
export type ExerciseResolution = {
  isCorrect: boolean;
  pointsEarned: number;
  currentStreak: number;
  message: string;
};