export interface UserProgress {
  currentLevel: number;
  completedLessons: string[];
  totalScore: number;
  weeklyStreak: number;
}

export const MOCK_USER_PROGRESS: UserProgress = {
  currentLevel: 3,
  completedLessons: ['lesson-1', 'lesson-2'],
  totalScore: 450,
  weeklyStreak: 5,
};