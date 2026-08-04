import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, View } from 'react-native';

import { colors } from '../../../constants/colors';
import type { AchievementVisualKey } from '../types';

type Props = {
  visualKey: AchievementVisualKey;
  achieved: boolean;
  size?: 'small' | 'large';
  cardBackgroundColor?: string;
};

const ICONS: Record<
  AchievementVisualKey,
  keyof typeof MaterialIcons.glyphMap
> = {
  alphabet: 'spellcheck',
  days: 'event',
  numbers: 'calculate',
  feelings: 'favorite-border',
  greetings: 'chat-bubble-outline',
  introductions: 'forum',
  environment: 'home',
  emergency: 'warning-amber',
  perfect: 'verified',
  diploma: 'emoji-events',
  generic: 'military-tech',
};

export function AchievementMedal({
  visualKey,
  achieved,
  size = 'large',
  cardBackgroundColor = colors.surface,
}: Props) {
  const isSmall = size === 'small';

  const circleSize = isSmall ? 52 : 66;
  const iconSize = isSmall ? 25 : 31;
  const ribbonWidth = isSmall ? 34 : 42;
  const ribbonHeight = isSmall ? 48 : 58;

  return (
    <View
      style={[
        styles.wrapper,
        {
          width: circleSize + 12,
          height: circleSize + (isSmall ? 18 : 22),
        },
      ]}
    >
      <View
        style={[
          styles.ribbon,
          {
            width: ribbonWidth,
            height: ribbonHeight,
            backgroundColor: achieved
              ? colors.secondary
              : '#C9C9C9',
          },
        ]}
      >
        <View
          style={[
            styles.ribbonCutout,
            {
              borderBottomColor: cardBackgroundColor,
              borderLeftWidth: ribbonWidth / 2,
              borderRightWidth: ribbonWidth / 2,
              borderBottomWidth: isSmall ? 13 : 16,
            },
          ]}
        />
      </View>

      <View
        style={[
          styles.medalCircle,
          {
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
            backgroundColor: achieved
              ? colors.primary
              : '#8C999C',
          },
        ]}
      >
        <View
          style={[
            styles.innerCircle,
            {
              width: circleSize - 14,
              height: circleSize - 14,
              borderRadius: (circleSize - 14) / 2,
              borderColor: achieved
                ? colors.textLight
                : '#E5E5E5',
            },
          ]}
        >
          <MaterialIcons
            name={ICONS[visualKey]}
            size={iconSize}
            color={
              achieved
                ? colors.textLight
                : '#F0F0F0'
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignItems: 'center',
  },

  ribbon: {
    position: 'absolute',
    top: 4,
    alignItems: 'center',
  },

  ribbonCutout: {
    position: 'absolute',
    bottom: 0,
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },

  medalCircle: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
});