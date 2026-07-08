// src/features/lessons/types.ts

import type { LearningStatus } from '../../constants/routes';

export type LessonExercise = {
  id: string;
  title: string;
  status: LearningStatus;
  contenidoMultimedia?: string;
};

export type LessonExerciseApi = {
  id: number | string;
  titulo: string;
  status: LearningStatus;
  contenidoMultimedia?: string;
};

export type LessonExercisesResponse = {
  exercises: LessonExerciseApi[];
};