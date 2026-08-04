// src/features/exercises/types.ts

import type {
  LearningContentType,
} from '../../constants/routes';

export type ExerciseAnswerValue =
  | string
  | boolean;

export type ExerciseExpectedAnswer =
  | ExerciseAnswerValue
  | ExerciseAnswerValue[];

export type ExerciseContent = {
  id: string;
  type: LearningContentType;
  title: string;

  moduleId?: string;
  moduleName?: string;

  lessonId?: string;
  lessonTitle?: string;

  multimedia?:
    | string
    | string[];

  options:
    ExerciseAnswerValue[];

  expectedAnswer?:
    ExerciseExpectedAnswer;

  contentIndex: number;
  contentTotal: number;
};