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
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 34,
  },

  headerSection: {
    width: '100%',
  },

  mainTitle: {
    fontFamily: fonts.bold,
    fontSize: 29,
    lineHeight: 35,
    color: colors.primary,
    marginBottom: 4,
  },

  subtitle: {
    fontFamily: fonts.medium,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
    marginBottom: 20,
  },

  summaryCard: {
    width: '100%',
    minHeight: 112,
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginBottom: 22,

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  summaryIconBox: {
    width: 76,
    height: 76,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginRight: 16,
  },

  summaryContent: {
    flex: 1,
  },

  summaryTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.secondary,
    marginBottom: 4,
  },

  summaryText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.primary,
  },

  searchInputContainer: {
    minHeight: 58,
    borderRadius: 30,
    paddingHorizontal: 22,
    marginBottom: 26,
  },

  searchInput: {
    fontSize: 16,
  },

  actionErrorCard: {
    width: '100%',
    minHeight: 44,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: '#FCEDEC',
    borderWidth: 1,
    borderColor: '#F3C5C1',
  },

  actionErrorText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 18,
    color: colors.error,
  },

  listTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  listTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.primary,
  },

  resultCount: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },

  favoriteAnimationWrapper: {
    width: '100%',
  },

  favoriteCard: {
    width: '100%',
    minHeight: 86,
    borderRadius: 16,
    paddingVertical: 14,
    paddingLeft: 14,
    paddingRight: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1.2,
    borderColor: colors.surface,

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },

  favoriteCardPressed: {
    opacity: 0.94,
    transform: [{ scale: 0.99 }],
    borderColor: colors.primary,
  },

  favoriteIconBox: {
    width: 52,
    height: 52,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginRight: 14,
  },

  favoriteContent: {
    flex: 1,
    minWidth: 0,
  },

  favoriteTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 21,
    color: colors.primary,
    marginBottom: 3,
  },

  favoriteDescription: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },

  removeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    backgroundColor: '#F5F6F6',
  },

  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.97 }],
  },

  emptyContainer: {
    flex: 1,
    minHeight: 330,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingBottom: 24,
  },

  emptyTitle: {
    fontFamily: fonts.bold,
    fontSize: 19,
    lineHeight: 25,
    color: colors.primary,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
  },

  emptyDescription: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },

  exploreButton: {
    minWidth: 180,
    minHeight: 48,
    borderRadius: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },

  exploreButtonText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textLight,
  },

  feedbackContainer: {
    minHeight: 300,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    paddingHorizontal: 24,
  },

  feedbackText: {
    fontFamily: fonts.medium,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  retryButton: {
    minHeight: 44,
    borderRadius: 22,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },

  retryButtonText: {
    fontFamily: fonts.bold,
    color: colors.textLight,
  },

  skeletonCard: {
    width: '100%',
    minHeight: 86,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },

  skeletonIcon: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: '#DDE4E6',
    marginRight: 14,
  },

  skeletonContent: {
    flex: 1,
  },

  skeletonTitle: {
    width: '58%',
    height: 15,
    borderRadius: 8,
    backgroundColor: '#DDE4E6',
    marginBottom: 10,
  },

  skeletonDescription: {
    width: '84%',
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E5EAEC',
  },
});
