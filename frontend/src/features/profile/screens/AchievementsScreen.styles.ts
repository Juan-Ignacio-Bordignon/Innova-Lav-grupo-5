import { StyleSheet } from 'react-native';

import { colors } from '../../../constants/colors';
import { fonts } from '../../../theme/fonts';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 4,
    paddingBottom: 32,
  },

  filtersRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },

  filterButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 23,
    borderWidth: 1.3,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    backgroundColor: colors.surface,

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.13,
    shadowRadius: 4,
    elevation: 3,
  },

  activeFilterButton: {
    backgroundColor: colors.primary,
  },

  filterText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 18,
    color: colors.primary,
    textAlign: 'center',
  },

  activeFilterText: {
    color: colors.textLight,
  },

  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  cardAnimationWrapper: {
    width: '31.4%',
  },

  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },

  feedbackContainer: {
    minHeight: 420,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },

  feedbackTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.primary,
    textAlign: 'center',
    marginTop: 14,
  },

  feedbackText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 10,
  },

  retryButton: {
    minHeight: 46,
    borderRadius: 23,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginTop: 20,
  },

  retryButtonText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textLight,
  },

  skeletonGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  skeletonCard: {
    width: '31.4%',
    height: 122,
    borderRadius: 14,
    alignItems: 'center',
    paddingTop: 12,
    marginBottom: 12,
    backgroundColor: colors.surface,
  },

  skeletonMedal: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#DDE4E6',
  },

  skeletonName: {
    width: '66%',
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E5EAEC',
    marginTop: 13,
  },
});