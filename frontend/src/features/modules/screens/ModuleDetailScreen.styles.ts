import { StyleSheet } from 'react-native';

import { colors } from '../../../constants/colors';
import { fonts } from '../../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    minHeight: 78,
    paddingHorizontal: 32,
    paddingTop: 10,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerCircleButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.surface,
    borderWidth: 1.2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',

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
    alignItems: 'center',
    gap: 12,
  },

  headerIconButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 5,
  },

  mainCard: {
    marginTop: 18,
    marginHorizontal: 32,
    minHeight: 184,
    borderRadius: 22,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  mainIconBox: {
    width: 132,
    height: 132,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },

  mainCardContent: {
    flex: 1,
    justifyContent: 'center',
  },

  mainCardTitle: {
    fontFamily: fonts.bold,
    fontSize: 24,
    lineHeight: 29,
    color: colors.primary,
    marginBottom: 2,
  },

  mainCardDescription: {
    fontFamily: fonts.medium,
    fontSize: 17,
    lineHeight: 24,
    color: colors.primary,
    marginBottom: 18,
  },

  progressLabel: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.primary,
    marginBottom: 8,
  },

  progressTrack: {
    width: '100%',
    height: 14,
    borderRadius: 8,
    backgroundColor: '#D8D8D8',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: colors.primary,
  },

  sectionTitle: {
    fontFamily: fonts.medium,
    fontSize: 30,
    lineHeight: 36,
    color: colors.primary,
    marginHorizontal: 32,
    marginTop: 26,
    marginBottom: 14,
  },

  listContainer: {
    paddingHorizontal: 32,
    paddingBottom: 34,
  },

  categoryAnimationWrapper: {
  width: '100%',
  },

  categoryCard: {
    minHeight: 64,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surface,
    paddingHorizontal: 28,
    marginBottom: 12,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  categoryCardPressed: {
    opacity: 0.94,
    transform: [{ scale: 0.99 }],
    borderColor: colors.primary,
  },

  categoryLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  categoryIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 24,
  },

  categoryTitle: {
    fontFamily: fonts.medium,
    fontSize: 17,
    lineHeight: 22,
    color: colors.primary,
    flex: 1,
  },

  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
});