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
    paddingTop: 10,
    paddingBottom: 32,
  },

  progressCard: {
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 16,
    backgroundColor: colors.surface,

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  progressTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  progressEmblem: {
    width: 68,
    height: 76,
    borderWidth: 4,
    borderColor: colors.primary,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 29,
    borderBottomRightRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
    backgroundColor: colors.surface,
  },

  emblemBase: {
    position: 'absolute',
    bottom: 9,
    width: 20,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },

  progressSummary: {
    flex: 1,
    minWidth: 0,
  },

  progressTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 27,
    color: colors.primary,
    marginBottom: 5,
  },

  progressDetail: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 18,
    color: colors.primary,
  },

  progressTrack: {
    height: 12,
    borderRadius: 7,
    backgroundColor: '#D7D7D7',
  },

  progressFill: {
    borderRadius: 7,
    backgroundColor: colors.primary,
  },

  progressPercentage: {
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 18,
    color: colors.primary,
    marginTop: 9,
  },

  divider: {
    height: 1,
    backgroundColor: '#D8D8D8',
    marginTop: 13,
    marginBottom: 14,
  },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  statItem: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },

  statIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: colors.surface,
  },

  statTextContainer: {
    flex: 1,
    minWidth: 0,
  },

  statLabel: {
    fontFamily: fonts.medium,
    fontSize: 11,
    lineHeight: 16,
    color: colors.primary,
  },

  statValue: {
    fontFamily: fonts.bold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.primary,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 14,
  },

  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 19,
    lineHeight: 25,
    color: colors.primary,
  },

  viewAllButton: {
    minHeight: 32,
    justifyContent: 'center',
    paddingLeft: 10,
  },

  viewAllText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 18,
    color: colors.primary,
  },

  achievementsRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
  },

  emptyAchievementsCard: {
    width: '100%',
    minHeight: 92,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  emptyAchievementsContent: {
    flex: 1,
    marginLeft: 14,
  },

  emptyAchievementsTitle: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.primary,
  },

  emptyAchievementsText: {
    fontFamily: fonts.medium,
    fontSize: 11,
    lineHeight: 17,
    color: colors.textSecondary,
    marginTop: 2,
  },

  accountTitle: {
    fontFamily: fonts.bold,
    fontSize: 19,
    lineHeight: 25,
    color: colors.primary,
    marginTop: 24,
    marginBottom: 14,
  },

  accountCard: {
    width: '100%',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: colors.surface,

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  accountRow: {
    width: '100%',
    minHeight: 48,
    borderRadius: 13,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  accountRowPressed: {
    backgroundColor: '#EEF1F2',
  },

  accountRowText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 15,
    lineHeight: 21,
    color: colors.primary,
  },

  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.98 }],
  },

  errorContainer: {
    minHeight: 420,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  errorText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 14,
    marginBottom: 20,
  },

  retryButton: {
    minHeight: 46,
    borderRadius: 23,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },

  retryButtonText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textLight,
  },

  skeletonProgressCard: {
    width: '100%',
    height: 248,
    borderRadius: 20,
    padding: 18,
    backgroundColor: colors.surface,
  },

  skeletonTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  skeletonEmblem: {
    width: 68,
    height: 76,
    borderRadius: 20,
    backgroundColor: '#DDE4E6',
    marginRight: 18,
  },

  skeletonSummary: {
    flex: 1,
  },

  skeletonTitle: {
    width: '62%',
    height: 19,
    borderRadius: 10,
    backgroundColor: '#DDE4E6',
    marginBottom: 10,
  },

  skeletonLine: {
    width: '88%',
    height: 11,
    borderRadius: 6,
    backgroundColor: '#E5EAEC',
    marginBottom: 7,
  },

  skeletonShortLine: {
    width: '72%',
    height: 11,
    borderRadius: 6,
    backgroundColor: '#E5EAEC',
  },

  skeletonProgress: {
    width: '100%',
    height: 12,
    borderRadius: 7,
    backgroundColor: '#D8D8D8',
    marginTop: 18,
  },

  skeletonPercentage: {
    width: 90,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#E5EAEC',
    marginTop: 10,
  },

  skeletonDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },

  skeletonStatsRow: {
    flexDirection: 'row',
    gap: 18,
  },

  skeletonStat: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E5EAEC',
  },

  skeletonSectionTitle: {
    width: 150,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#DDE4E6',
    marginTop: 26,
    marginBottom: 14,
  },

  skeletonAchievementsRow: {
    flexDirection: 'row',
    gap: 12,
  },

  skeletonAchievementCard: {
    flex: 1,
    height: 112,
    borderRadius: 14,
    backgroundColor: colors.surface,
  },

  skeletonAccountTitle: {
    width: 74,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#DDE4E6',
    marginTop: 26,
    marginBottom: 14,
  },

  skeletonAccountCard: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    backgroundColor: colors.surface,
  },
});