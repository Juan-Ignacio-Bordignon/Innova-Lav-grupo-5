// src/components/ui/AnimatedPop.tsx

import { useEffect, type ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type AnimatedPopProps = {
  children: ReactNode;
  triggerKey?: number | string;
  delay?: number;
  startScale?: number;
  popScale?: number;
  style?: StyleProp<ViewStyle>;
};

export function AnimatedPop({
  children,
  triggerKey = 0,
  delay = 0,
  startScale = 0.75,
  popScale = 1.18,
  style,
}: AnimatedPopProps) {
  const scale = useSharedValue(startScale);

  useEffect(() => {
    scale.value = startScale;

    scale.value = withDelay(
      delay,
      withSequence(
        withTiming(popScale, {
          duration: 170,
          easing: Easing.out(Easing.cubic),
        }),
        withSpring(1, {
          damping: 8,
          stiffness: 170,
        })
      )
    );
  }, [delay, popScale, scale, startScale, triggerKey]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
}