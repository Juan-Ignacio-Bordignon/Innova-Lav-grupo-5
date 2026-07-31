// src/features/lessons/services/lessonsService.ts

import type {
  LearningContentType,
  LearningStatus,
} from '../../../constants/routes';
import { apiClient } from '../../../services/api/apiClient';
import { ENDPOINTS } from '../../../services/api/endpoints';
import { getAuthToken } from '../../../services/storage/authStorage';
import type {
  LessonExercise,
  LessonExerciseApi,
  LessonExercisesResponse,
} from '../types';

type GetLessonExercisesParams = {
  moduleId: number | string;
  lessonId: number | string;
};

export async function getLessonExercises({
  moduleId,
  lessonId,
}: GetLessonExercisesParams): Promise<LessonExercise[]> {
  const token = await getAuthToken();

  const response = await apiClient<LessonExercisesResponse>(
    ENDPOINTS.MODULE_LESSON_EXERCISES(moduleId, lessonId),
    {
      token: token ?? undefined,
    }
  );

  /*
   * Backend puede devolver directamente:
   *
   * [
   *   { ... },
   *   { ... }
   * ]
   *
   * También mantenemos compatibilidad con:
   *
   * {
   *   exercises: [...]
   * }
   */
  const apiExercises = Array.isArray(response)
    ? response
    : Array.isArray(response.exercises)
      ? response.exercises
      : [];

  const exercises = apiExercises.map((exercise) =>
    mapLessonExercise(exercise, lessonId)
  );

  /*
   * Las evaluaciones deben mantener su posición.
   * Solo ordenamos segmentos consecutivos de teoría.
   */
  return sortTheorySegments(exercises);
}

function mapLessonExercise(
  exercise: LessonExerciseApi,
  fallbackLessonId: number | string
): LessonExercise {
  const type = normalizeContentType(exercise.tipo);
  const id = String(exercise.id);

  return {
    key: `${type}-${id}`,
    id,
    lessonId: String(
      exercise.lessonId ?? fallbackLessonId
    ),
    title: exercise.titulo,
    type,
    status: normalizeStatus(exercise.status),

    contenidoMultimedia: normalizeMultimedia(
      exercise.contenidoMultimedia
    ),

    options: Array.isArray(
      exercise.opcionesRespuesta
    )
      ? exercise.opcionesRespuesta
      : [],

    expectedAnswer: normalizeExpectedAnswer(
      exercise.respuestaEsperada
    ),
  };
}

/*
 * Normaliza los dos formatos enviados por backend:
 *
 * "https://video.mp4"
 *
 * o:
 *
 * [
 *   "https://video-1.mp4",
 *   "https://video-2.mp4"
 * ]
 *
 * Siempre devolvemos un array para conservar todos
 * los videos de los ejercicios ORDER_WORDS.
 */
function normalizeMultimedia(
  value?: string | string[] | null
): string[] | undefined {
  const multimediaItems =
    Array.isArray(value)
      ? value
      : typeof value ===
          'string'
        ? [value]
        : [];

  const normalizedItems =
    multimediaItems
      .filter(
        (
          item
        ): item is string =>
          typeof item ===
          'string'
      )
      .map((item) =>
        item.trim()
      )
      .filter(Boolean);

  return normalizedItems.length >
    0
    ? normalizedItems
    : undefined;
}

function normalizeContentType(
  value: string
): LearningContentType {
  const normalizedValue = value
    .trim()
    .toLowerCase();

  switch (normalizedValue) {
    case 'teoria':
    case 'theory':
      return 'theory';

    case 'true_false':
    case 'truefalse':
    case 'true-or-false':
      return 'trueFalse';

    case 'multiple_choice':
    case 'multiplechoice':
      return 'multipleChoice';

    case 'order_words':
    case 'orderwords':
      return 'orderWords';

    default:
      return 'unknown';
  }
}

function normalizeStatus(
  status?: LearningStatus
): LearningStatus {
  switch (status) {
    case 'completed':
    case 'inProgress':
    case 'notStarted':
      return status;

    default:
      /*
       * Hasta que backend integre el progreso
       * en este endpoint, queda como no iniciado.
       */
      return 'notStarted';
  }
}

function normalizeExpectedAnswer(
  value: unknown
): LessonExercise['expectedAnswer'] {
  if (
    typeof value === 'string' ||
    typeof value === 'boolean'
  ) {
    return value;
  }

  if (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === 'string' ||
        typeof item === 'boolean'
    )
  ) {
    return value;
  }

  return undefined;
}

function sortTheorySegments(
  exercises: LessonExercise[]
): LessonExercise[] {
  const sortedExercises = [...exercises];

  let currentIndex = 0;

  while (
    currentIndex < sortedExercises.length
  ) {
    if (
      sortedExercises[currentIndex].type !==
      'theory'
    ) {
      currentIndex += 1;
      continue;
    }

    const segmentStart = currentIndex;
    let segmentEnd = currentIndex + 1;

    while (
      segmentEnd < sortedExercises.length &&
      sortedExercises[segmentEnd].type ===
        'theory'
    ) {
      segmentEnd += 1;
    }

    const sortedSegment = sortedExercises
      .slice(segmentStart, segmentEnd)
      .sort(compareTheoryContent);

    sortedExercises.splice(
      segmentStart,
      sortedSegment.length,
      ...sortedSegment
    );

    currentIndex = segmentEnd;
  }

  return sortedExercises;
}

function compareTheoryContent(
  firstExercise: LessonExercise,
  secondExercise: LessonExercise
) {
  const firstCustomOrder =
    getCustomOrderIndex(firstExercise.title);

  const secondCustomOrder =
    getCustomOrderIndex(secondExercise.title);

  if (
    firstCustomOrder !== null &&
    secondCustomOrder !== null
  ) {
    return (
      firstCustomOrder -
      secondCustomOrder
    );
  }

  const firstNumber = getNumberValue(
    firstExercise.title
  );

  const secondNumber = getNumberValue(
    secondExercise.title
  );

  if (
    firstNumber !== null &&
    secondNumber !== null
  ) {
    return firstNumber - secondNumber;
  }

  return firstExercise.title.localeCompare(
    secondExercise.title,
    'es',
    {
      numeric: true,
      sensitivity: 'base',
    }
  );
}

function getCustomOrderIndex(
  title: string
) {
  const normalizedTitle =
    normalizeTitle(title);

  const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'ñ',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  const weekDays = [
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
    'sabado',
    'domingo',
  ];

  const possibleLetter = normalizedTitle
    .replace(/^letra\s+/, '')
    .trim();

  const letterIndex =
    alphabet.indexOf(possibleLetter);

  if (letterIndex !== -1) {
    return letterIndex;
  }

  const weekDayIndex =
    weekDays.indexOf(normalizedTitle);

  if (weekDayIndex !== -1) {
    return weekDayIndex;
  }

  return null;
}

function getNumberValue(title: string) {
  const match = title.match(/\d+/);

  if (!match) {
    return null;
  }

  return Number(match[0]);
}

function normalizeTitle(title: string) {
  return title
    .trim()
    .toLowerCase()
    .replace(/ñ/g, '__enie__')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/__enie__/g, 'ñ');
}