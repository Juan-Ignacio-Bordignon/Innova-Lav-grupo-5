// src/features/lessons/types.ts

import type {
  LearningContentType,
  LearningStatus,
} from '../../constants/routes';

export type LessonResponseOption =
  | string
  | boolean;

export type LessonExpectedAnswer =
  | LessonResponseOption
  | LessonResponseOption[];

export type LessonExercise = {
  key: string;
  id: string;
  lessonId: string;
  title: string;
  type: LearningContentType;
  status: LearningStatus;

  contenidoMultimedia?: string[];

  options: LessonResponseOption[];

  expectedAnswer?:
    LessonExpectedAnswer;
};

export type LessonExerciseApi = {
  id: number | string;
  lessonId?: number | string;
  titulo: string;
  tipo: string;
  status?: LearningStatus;

  /*
   * Backend puede enviar una única URL o varias:
   *
   * contenidoMultimedia: "https://..."
   *
   * contenidoMultimedia: [
   *   "https://...",
   *   "https://..."
   * ]
   */
  contenidoMultimedia?:
    | string
    | string[]
    | null;

  opcionesRespuesta?:
    | LessonResponseOption[]
    | null;

  respuestaEsperada?: unknown;
  createdAt?: string;
};

export type LessonExercisesResponse =
  | LessonExerciseApi[]
  | {
      exercises:
        LessonExerciseApi[];
    };