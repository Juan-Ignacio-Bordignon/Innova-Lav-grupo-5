import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { AppText } from '../../../components/ui';
import { colors } from '../../../constants/colors';
import { ROUTES } from '../../../constants/routes';

const TAB_LABELS: Record<string, string> = {
  [ROUTES.HOME]: 'Inicio',
  [ROUTES.FAVORITES]: 'Favoritos',
  [ROUTES.PROFILE_TAB]: 'Perfil',
};

const TAB_ICONS: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  [ROUTES.HOME]: 'home',
  [ROUTES.FAVORITES]: 'favorite-border',
  [ROUTES.PROFILE_TAB]: 'person-outline',
};

type AnimatedTabIconProps = {
  iconName: keyof typeof MaterialIcons.glyphMap;
  contentColor: string;
  backgroundColor: string;
  isFocused: boolean;
};

function AnimatedTabIcon({
  iconName,
  contentColor,
  backgroundColor,
  isFocused,
}: AnimatedTabIconProps) {
  const rotation = useSharedValue(0);

  useEffect(() => {
  if (isFocused) {
    rotation.value = 0;

    rotation.value = withSequence(
      withTiming(385, {
        duration: 520,
        easing: Easing.out(Easing.cubic),
      }),
      withTiming(345, {
        duration: 130,
        easing: Easing.out(Easing.quad),
      }),
      withTiming(360, {
        duration: 120,
        easing: Easing.out(Easing.quad),
      })
    );
  }
}, [isFocused, rotation]);

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={styles.iconWrapper}>
      <Animated.View
        style={[
          styles.iconCircle,
          { borderColor: contentColor },
          animatedCircleStyle,
        ]}
      >
        <View
          style={[
            styles.iconCircleGap,
            { backgroundColor },
          ]}
        />
      </Animated.View>

      <MaterialIcons
        name={iconName}
        size={24}
        color={contentColor}
      />
    </View>
  );
}

export function AppBottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrapper,
        { paddingBottom: Math.max(insets.bottom, 10) },
      ]}
    >
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const options = descriptors[route.key]?.options;
          const isFirst = index === 0;
          const isLast = index === state.routes.length - 1;

          const label =
            TAB_LABELS[route.name] ??
            options.tabBarLabel?.toString() ??
            options.title ??
            route.name;

          const iconName = TAB_ICONS[route.name] ?? 'circle';

          const backgroundColor = isFocused
            ? colors.primary
            : colors.secondary;

          const contentColor = isFocused
            ? colors.textLight
            : colors.primary;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={({ pressed }) => [
                styles.tabItem,
                isFirst && styles.firstTabItem,
                isLast && styles.lastTabItem,
                { backgroundColor },
                pressed && styles.pressed,
              ]}
            >
              <AnimatedTabIcon
                iconName={iconName}
                contentColor={contentColor}
                backgroundColor={backgroundColor}
                isFocused={isFocused}
              />

              <AppText
                variant="caption"
                style={[styles.label, { color: contentColor }]}
              >
                {label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 5,
    paddingHorizontal: 12,
  },

  container: {
    flexDirection: 'row',
    gap: 12,
  },

  tabItem: {
    flex: 1,
    minHeight: 74,

    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,

    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  firstTabItem: {
    borderBottomLeftRadius: 28,
  },

  lastTabItem: {
    borderBottomRightRadius: 28,
  },

  iconWrapper: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    position: 'relative',
  },

  iconCircle: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
    borderWidth: 2.70,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconCircleGap: {
    position: 'absolute',
    width: 10,
    height: 5,
    right: -5,
    bottom: 3,
    borderRadius: 4,
    transform: [{ rotate: '30deg' }],
  },

  label: {
    fontSize: 14,
    lineHeight: 18,
  },

  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
});