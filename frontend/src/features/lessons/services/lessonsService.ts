// src/features/lessons/services/lessonsService.ts

import { apiClient } from '../../../services/api/apiClient';
import { ENDPOINTS } from '../../../services/api/endpoints';
import type { LessonExercise, LessonExercisesResponse } from '../types';

type GetLessonExercisesParams = {
  moduleId: number | string;
  lessonId: number | string;
};

export async function getLessonExercises({
  moduleId,
  lessonId,
}: GetLessonExercisesParams): Promise<LessonExercise[]> {
  const response = await apiClient<LessonExercisesResponse>(
    ENDPOINTS.MODULE_LESSON_EXERCISES(moduleId, lessonId)
  );

  const exercises = response.exercises.map((exercise) => ({
    id: String(exercise.id),
    title: exercise.titulo,
    status: exercise.status,
    contenidoMultimedia: exercise.contenidoMultimedia,
  }));

  return exercises.sort(sortLessonExercises);
}

function sortLessonExercises(a: LessonExercise, b: LessonExercise) {
  const customOrderA = getCustomOrderIndex(a.title);
  const customOrderB = getCustomOrderIndex(b.title);

  if (customOrderA !== null && customOrderB !== null) {
    return customOrderA - customOrderB;
  }

  const numberA = getNumberValue(a.title);
  const numberB = getNumberValue(b.title);

  if (numberA !== null && numberB !== null) {
    return numberA - numberB;
  }

  const idA = Number(a.id);
  const idB = Number(b.id);

  if (!Number.isNaN(idA) && !Number.isNaN(idB)) {
    return idA - idB;
  }

  return a.title.localeCompare(b.title, 'es', {
    numeric: true,
    sensitivity: 'base',
  });
}

function getCustomOrderIndex(title: string) {
  const normalizedTitle = normalizeTitle(title);

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

  const possibleLetter = normalizedTitle.replace(/^letra\s+/, '').trim();
  const letterIndex = alphabet.indexOf(possibleLetter);

  if (letterIndex !== -1) {
    return letterIndex;
  }

  const weekDayIndex = weekDays.indexOf(normalizedTitle);

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