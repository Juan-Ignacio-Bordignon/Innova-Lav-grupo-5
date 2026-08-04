import { Pressable, StyleSheet } from 'react-native';

import {
  AnimatedPop,
  AppText,
} from '../../../components/ui';

import { colors } from '../../../constants/colors';
import { fonts } from '../../../theme/fonts';
import type { ProfileAchievement } from '../types';
import { AchievementMedal } from './AchievementMedal';

type Props = {
  achievement: ProfileAchievement;
  compact?: boolean;
  highlighted?: boolean;
  animationKey?: number;
  animationDelay?: number;
  onPress?: () => void;
};

export function AchievementCard({
  achievement,
  compact = false,
  highlighted = false,
  animationKey = 0,
  animationDelay = 0,
  onPress,
}: Props) {
  const cardBackgroundColor = highlighted
    ? colors.primary
    : achievement.achieved
      ? colors.surface
      : '#E8E8E8';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${achievement.name}. ${achievement.description}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        compact
          ? styles.compactCard
          : styles.gridCard,
        !achievement.achieved &&
          styles.pendingCard,
        highlighted &&
          styles.highlightedCard,
        pressed && styles.pressed,
      ]}
    >
      <AnimatedPop
        triggerKey={`${achievement.id}-${animationKey}`}
        delay={animationDelay}
        startScale={0.82}
        popScale={1.08}
      >
        <AchievementMedal
          visualKey={achievement.visualKey}
          achieved={achievement.achieved}
          size={compact ? 'small' : 'large'}
          cardBackgroundColor={cardBackgroundColor}
        />
      </AnimatedPop>

      <AppText
        numberOfLines={compact ? 1 : 2}
        ellipsizeMode="tail"
        style={[
          styles.name,
          compact && styles.compactName,
          highlighted && styles.highlightedName,
        ]}
      >
        {achievement.name}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.surface,

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },

  compactCard: {
    flex: 1,
    minWidth: 0,
    height: 112,
    borderRadius: 14,
    paddingTop: 8,
    paddingHorizontal: 6,
  },

  gridCard: {
    width: '100%',
    minHeight: 122,
    borderRadius: 14,
    paddingTop: 10,
    paddingHorizontal: 6,
    marginBottom: 12,
  },

  pendingCard: {
    backgroundColor: '#E8E8E8',
  },

  highlightedCard: {
    backgroundColor: colors.primary,
  },

  name: {
    width: '100%',
    paddingHorizontal: 2,
    fontFamily: fonts.bold,
    fontSize: 10,
    lineHeight: 14,
    color: colors.primary,
    textAlign: 'center',
    marginTop: -1,
  },

  compactName: {
    fontSize: 10,
    lineHeight: 14,
  },

  highlightedName: {
    color: colors.textLight,
  },

  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});