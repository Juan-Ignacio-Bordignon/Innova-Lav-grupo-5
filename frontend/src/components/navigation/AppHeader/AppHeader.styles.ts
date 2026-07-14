import { StyleSheet } from 'react-native';

import { colors } from '../../../constants/colors';
import { fonts } from '../../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 70,
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftSection: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
    marginRight: 12,
  },

  greeting: {
    flexShrink: 1,
    fontFamily: fonts.bold,
    fontSize: 24,
    lineHeight: 31,
    color: colors.primary,
  },

  title: {
    flexShrink: 1,
    fontFamily: fonts.bold,
    fontSize: 24,
    lineHeight: 31,
    color: colors.primary,
  },

  backContent: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  backTitle: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 21,
    lineHeight: 28,
    color: colors.primary,
  },

  backButton: {
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

  actions: {
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  actionButton: {
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

  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 22,
    height: 22,
    paddingHorizontal: 5,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
  },

  notificationBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    lineHeight: 14,
    color: colors.primary,
    textAlign: 'center',
  },
});