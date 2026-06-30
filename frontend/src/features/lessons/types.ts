// src/features/lessons/types.ts

import type { LearningStatus } from '../../constants/routes';

export type LessonExercise = {
  id: string;
  title: string;
  status: LearningStatus;
};