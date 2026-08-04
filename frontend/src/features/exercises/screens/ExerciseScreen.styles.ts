// src/features/exercises/screens/ExerciseScreen.styles.ts

import { StyleSheet } from 'react-native';

import { colors } from '../../../constants/colors';
import { fonts } from '../../../theme/fonts';

/*
 * Zoom necesario para recortar los bordes negros
 * que forman parte de los videos originales.
 */
const VIDEO_ZOOM = 1.8;
const VIDEO_MAX_WIDTH = 380;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundApp,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 38,
  },

  contentInner: {
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
  },

  sequenceVideoBlock: {
    width: '100%',
    maxWidth: VIDEO_MAX_WIDTH,
    alignSelf: 'center',
    marginBottom: 20,
  },

  sequenceVideoCard: {
    marginBottom: 0,
  },

sequenceLoadingOverlay: {
  ...StyleSheet.absoluteFillObject,
  zIndex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  backgroundColor:
    'rgba(255, 255, 255, 0.92)',
},

sequenceLoadingText: {
  fontFamily: fonts.medium,
  fontSize: 13,
  lineHeight: 19,
  color: colors.textSecondary,
},

sequenceProgressRow: {
  width: '100%',
  minHeight: 8,
  marginTop: 7,
  paddingHorizontal: 2,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 5,
},

sequenceProgressTrack: {
  flex: 1,
  height: 8,
  borderRadius: 8,
  overflow: 'hidden',
  backgroundColor: '#D9D9D9',
},

sequenceProgressTrackActive: {
  backgroundColor:
    'rgba(25, 70, 80, 0.18)',
},

sequenceProgressFill: {
  height: '100%',
  borderRadius: 8,
  backgroundColor:
    colors.primary,
},

  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 7,
    marginTop: 2,
    marginBottom: 12,
  },

  breadcrumbText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
  },

  breadcrumbSeparator: {
    fontFamily: fonts.bold,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
  },

  breadcrumbCurrent: {
    fontFamily: fonts.bold,
    color: colors.primary,
  },

  progressHeader: {
    marginBottom: 18,
    gap: 8,
  },

  progressLabels: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  progressTitle: {
    flex: 1,
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.primary,
  },

  progressCount: {
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 18,
    color: colors.primary,
  },

  progressTrack: {
    width: '100%',
    height: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#D9D9D9',
  },

  progressFill: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: colors.primary,
  },

  title: {
    marginBottom: 16,
    fontFamily: fonts.bold,
    fontSize: 22,
    lineHeight: 29,
    color: colors.primary,
    textAlign: 'center',
  },

  videoCard: {
    position: 'relative',

    width: '100%',
    maxWidth: VIDEO_MAX_WIDTH,
    aspectRatio: 1,
    alignSelf: 'center',

    borderRadius: 26,
    marginBottom: 20,
    overflow: 'hidden',

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: 'rgba(25, 70, 80, 0.08)',

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.11,
    shadowRadius: 7,
    elevation: 4,
  },

  videoZoom: {
    ...StyleSheet.absoluteFillObject,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.surface,

    transform: [
      {
        scale: VIDEO_ZOOM,
      },
    ],
  },

  video: {
    width: '100%',
    height: '100%',
  },

  videoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 24,
  },

  videoPlaceholderText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    color: colors.textSecondary,
  },

  favoriteButton: {
    position: 'absolute',
    top: 14,
    left: 14,
    width: 46,
    height: 46,
    borderRadius: 23,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderWidth: 1,
    borderColor: 'rgba(25, 70, 80, 0.18)',

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  favoriteButtonActive: {
    borderColor: 'rgba(218, 177, 109, 0.75)',
    backgroundColor: 'rgba(255, 250, 241, 0.97)',
  },

  favoriteButtonDisabled: {
    opacity: 0.65,
  },

  favoriteButtonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.96 }],
  },

  replayButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 46,
    height: 46,
    borderRadius: 23,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderWidth: 1,
    borderColor: 'rgba(25, 70, 80, 0.18)',

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  replayButtonDisabled: {
    opacity: 0.55,
  },

  replayButtonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.96 }],
  },

  navigationError: {
    width: '100%',
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: 'rgba(212, 63, 54, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(212, 63, 54, 0.32)',
  },

  navigationErrorText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 18,
    color: colors.error,
  },

  interactionContainer: {
    width: '100%',
  },

  theoryContainer: {
    width: '100%',
    gap: 18,
  },

  learnedButton: {
    minHeight: 60,
    borderRadius: 21,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 11,
    backgroundColor: colors.surface,
    borderWidth: 1.3,
    borderColor: colors.border,
  },

  learnedButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(25, 70, 80, 0.06)',
  },

  learnedButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },

  learnedText: {
    fontFamily: fonts.bold,
    fontSize: 15,
    lineHeight: 21,
    color: colors.primary,
  },

  fallbackContainer: {
    width: '100%',
    borderRadius: 20,
    padding: 20,
    gap: 16,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },

  fallbackText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
