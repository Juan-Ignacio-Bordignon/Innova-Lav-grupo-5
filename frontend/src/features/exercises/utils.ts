// src/features/exercises/utils.ts

import type {
  ExerciseAnswerValue,
  ExerciseExpectedAnswer,
} from './types';

const DEFAULT_VIDEO_BASE_URL =
  'https://ozrcernencngontkultp.supabase.co/storage/v1/object/public/videos-lsa';

export function resolveVideoUrl(value?: string) {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return null;
  }

  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  const baseUrl = (
    process.env.EXPO_PUBLIC_VIDEO_BASE_URL ??
    DEFAULT_VIDEO_BASE_URL
  ).replace(/\/$/, '');

  const normalizedFileName = trimmedValue
    .replace(/\s+/g, '_')
    .replace(/\.mp4$/i, '');

  const encodedFileName = encodeURIComponent(
    `${normalizedFileName}.mp4`
  ).replace(/%2F/gi, '/');

  return `${baseUrl}/${encodedFileName}`;
}

export function formatAnswerLabel(value: ExerciseAnswerValue) {
  if (typeof value === 'boolean') {
    return value ? 'Verdadero' : 'Falso';
  }

  return value.replace(/_/g, ' ').trim();
}

export function answersMatch(
  userAnswer:
    | ExerciseAnswerValue
    | ExerciseAnswerValue[]
    | null
    | undefined,
  expectedAnswer:
    | ExerciseExpectedAnswer
    | null
    | undefined
) {
  if (
    Array.isArray(userAnswer) ||
    Array.isArray(expectedAnswer)
  ) {
    if (
      !Array.isArray(userAnswer) ||
      !Array.isArray(expectedAnswer) ||
      userAnswer.length !== expectedAnswer.length
    ) {
      return false;
    }

    return userAnswer.every(
      (answer, index) =>
        normalizeAnswer(answer) ===
        normalizeAnswer(expectedAnswer[index])
    );
  }

  if (
    userAnswer === null ||
    userAnswer === undefined ||
    expectedAnswer === null ||
    expectedAnswer === undefined
  ) {
    return false;
  }

  return (
    normalizeAnswer(userAnswer) ===
    normalizeAnswer(expectedAnswer)
  );
}

function normalizeAnswer(value: ExerciseAnswerValue) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}