// src/features/lessons/screens/LessonScreen.styles.ts

import { Dimensions, StyleSheet } from 'react-native';

import { colors } from '../../../constants/colors';
import { fonts } from '../../../theme/fonts';

const SCREEN_WIDTH = Dimensions.get('window').width;
const HORIZONTAL_PADDING = 24;
const CARD_GAP = 12;
const EXERCISE_CARD_WIDTH =
  (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - CARD_GAP * 2) / 3;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    minHeight: 70,
    paddingHorizontal: 24,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerCircleButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1.2,
    borderColor: colors.primary,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerIconButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  contentContainer: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingBottom: 32,
  },
  breadcrumbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
    marginBottom: 16,
  },
  breadcrumbText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  breadcrumbSeparator: {
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  breadcrumbCurrent: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  summaryCard: {
    width: '100%',
    minHeight: 132,
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: colors.surface,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },
  lessonIconBox: {
    width: 116,
    height: 96,
    borderRadius: 18,
    borderWidth: 6,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  lessonIconText: {
    fontFamily: fonts.bold,
    fontSize: 31,
    lineHeight: 38,
    color: colors.secondary,
    letterSpacing: 1,
  },
  lessonIconLine: {
    width: 22,
    height: 7,
    borderRadius: 6,
    marginTop: 2,
    backgroundColor: colors.primary,
  },
  summaryContent: {
    flex: 1,
  },
  summaryTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.secondary,
    marginBottom: 12,
  },
  summaryProgressTrack: {
    height: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  summaryProgressFill: {
    borderRadius: 10,
  },
  summaryProgressLabel: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.primary,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.primary,
    marginTop: 26,
    marginBottom: 16,
  },
  exerciseRow: {
    gap: CARD_GAP,
    marginBottom: 12,
  },
  exerciseAnimationWrapper: {
    width: EXERCISE_CARD_WIDTH,
  },
  exerciseCard: {
    width: EXERCISE_CARD_WIDTH,
    height: EXERCISE_CARD_WIDTH,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.surface,
    borderWidth: 1.3,
    borderColor: colors.surface,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.09,
    shadowRadius: 4,
    elevation: 2,
  },
  exerciseCardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
  },
  exerciseTitle: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 18,
    color: colors.primary,
    textAlign: 'center',
  },
});