import { useEffect, type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

type AnimatedEntryProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  translateY?: number;
  startScale?: number;
  triggerKey?: number | string;
  style?: StyleProp<ViewStyle>;
};

export function AnimatedEntry({
  children,
  delay = 0,
  duration = 520,
  translateY = 18,
  startScale = 0.98,
  triggerKey = 0,
  style,
}: AnimatedEntryProps) {
  const opacity = useSharedValue(0);
  const translateYValue = useSharedValue(translateY);
  const scaleValue = useSharedValue(startScale);

  useEffect(() => {
    opacity.value = 0;
    translateYValue.value = translateY;
    scaleValue.value = startScale;

    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration,
        easing: Easing.out(Easing.cubic),
      })
    );

    translateYValue.value = withDelay(
      delay,
      withTiming(0, {
        duration,
        easing: Easing.out(Easing.cubic),
      })
    );

    scaleValue.value = withDelay(
      delay,
      withTiming(1, {
        duration,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [
    delay,
    duration,
    opacity,
    scaleValue,
    startScale,
    translateY,
    translateYValue,
    triggerKey,
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateYValue.value },
      { scale: scaleValue.value },
    ],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
}