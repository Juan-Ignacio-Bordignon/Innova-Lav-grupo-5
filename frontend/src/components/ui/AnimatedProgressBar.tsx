// src/components/ui/AnimatedProgressBar.tsx

import { useEffect } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '../../constants/colors';

type AnimatedProgressBarProps = {
  progress: number;
  triggerKey?: number | string;
  delay?: number;
  duration?: number;
  trackStyle?: StyleProp<ViewStyle>;
  fillStyle?: StyleProp<ViewStyle>;
};

export function AnimatedProgressBar({
  progress,
  triggerKey = 0,
  delay = 0,
  duration = 750,
  trackStyle,
  fillStyle,
}: AnimatedProgressBarProps) {
  const animatedProgress = useSharedValue(0);
  const safeProgress = Math.max(0, Math.min(progress, 100));

  useEffect(() => {
    animatedProgress.value = 0;

    animatedProgress.value = withDelay(
      delay,
      withTiming(safeProgress, {
        duration,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [animatedProgress, safeProgress, triggerKey, delay, duration]);

  const animatedFillStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value}%` as any,
  }));

  return (
    <View style={[styles.track, trackStyle]}>
      <Animated.View style={[styles.fill, fillStyle, animatedFillStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    height: 12,
    borderRadius: 8,
    backgroundColor: '#D8D8D8',
    overflow: 'hidden',
  },

  fill: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
});