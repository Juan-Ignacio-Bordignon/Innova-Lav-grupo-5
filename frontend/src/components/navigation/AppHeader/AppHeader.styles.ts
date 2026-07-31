import { StyleSheet } from 'react-native';

import { colors } from '../../../constants/colors';
import { fonts } from '../../../theme/fonts';

export const styles = StyleSheet.create({
  animationWrapper: {
    width: '100%',
  },

  container: {
    width: '100%',
    minHeight: 66,

    paddingHorizontal: 20,
    paddingTop: 7,
    paddingBottom: 7,

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

  greetingContent: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
  },

  greetingLabel: {
    fontFamily: fonts.medium,
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    marginBottom: 1,
  },

  greetingName: {
    flexShrink: 1,
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 25,
    color: colors.primary,
  },

  title: {
    flexShrink: 1,
    fontFamily: fonts.bold,
    fontSize: 21,
    lineHeight: 27,
    color: colors.primary,
  },

  backContent: {
    flex: 1,
    minWidth: 0,

    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },

  backTitle: {
    flex: 1,
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.primary,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,

    alignItems: 'center',
    justifyContent: 'center',

    paddingLeft: 2,

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: '#DCE4E6',

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },

  backButtonPressed: {
    opacity: 0.84,
    transform: [{ scale: 0.96 }],
  },

  actionsToolbar: {
    flexShrink: 0,

    height: 44,
    paddingHorizontal: 3,

    borderRadius: 22,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: '#DCE4E6',

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 5,
    elevation: 2,
  },

  streakAction: {
    minWidth: 48,
    height: 36,

    paddingHorizontal: 7,

    borderRadius: 18,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },

  streakText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.primary,
  },

  actionItem: {
    position: 'relative',

    width: 36,
    height: 36,

    borderRadius: 18,

    alignItems: 'center',
    justifyContent: 'center',
  },

  actionSeparator: {
    borderLeftWidth: 1,
    borderLeftColor: '#E1E7E8',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  actionPressed: {
    backgroundColor: '#F0F3F4',
    transform: [{ scale: 0.95 }],
  },

  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -2,

    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,

    borderRadius: 9,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.secondary,

    borderWidth: 1.5,
    borderColor: colors.surface,
  },

  notificationBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 9,
    lineHeight: 11,
    color: colors.primary,
    textAlign: 'center',
  },
});