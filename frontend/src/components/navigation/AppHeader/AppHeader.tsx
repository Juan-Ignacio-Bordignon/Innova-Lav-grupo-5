// src/components/navigation/AppHeader/AppHeader.tsx

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import {
  Pressable,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { AnimatedEntry, AppText } from '../../ui';
import { colors } from '../../../constants/colors';
import { ROUTES } from '../../../constants/routes';

import { styles } from './AppHeader.styles';

export type AppHeaderVariant = 'home' | 'back';

export type AppHeaderProps = {
  variant: AppHeaderVariant;
  userName?: string;
  notificationCount?: number;
  animationKey?: number;
  animationDelay?: number;
  style?: StyleProp<ViewStyle>;
  onBackFallback?: () => void;
  onAchievementsPress?: () => void;
  onNotificationsPress?: () => void;
};

export function AppHeader({
  variant,
  userName = 'Usuario',
  notificationCount = 0,
  animationKey = 0,
  animationDelay = 80,
  style,
  onBackFallback,
  onAchievementsPress,
  onNotificationsPress,
}: AppHeaderProps) {
  const navigation = useNavigation<any>();

  const safeUserName = userName.trim() || 'Usuario';

  const displayedNotificationCount =
    notificationCount > 99 ? '99+' : String(notificationCount);

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    if (onBackFallback) {
      onBackFallback();
      return;
    }

    navigation.navigate(ROUTES.HOME_TABS);
  };

  return (
    <AnimatedEntry delay={animationDelay} triggerKey={animationKey}>
      <View style={[styles.container, style]}>
        <View style={styles.leftSection}>
          {variant === 'home' ? (
            <AppText
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.greeting}
            >
              ¡Hola {safeUserName}!
            </AppText>
          ) : (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Volver"
              onPress={handleBackPress}
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.pressed,
              ]}
            >
              <MaterialIcons
                name="keyboard-arrow-left"
                size={34}
                color={colors.primary}
              />
            </Pressable>
          )}
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Ver logros"
            onPress={onAchievementsPress}
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.pressed,
            ]}
          >
            <MaterialIcons
              name="emoji-events"
              size={25}
              color={colors.textLight}
            />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Ver notificaciones"
            onPress={onNotificationsPress}
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.pressed,
            ]}
          >
            <MaterialIcons
              name="notifications-none"
              size={25}
              color={colors.textLight}
            />

            {notificationCount > 0 && (
              <View
                pointerEvents="none"
                style={styles.notificationBadge}
              >
                <AppText style={styles.notificationBadgeText}>
                  {displayedNotificationCount}
                </AppText>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </AnimatedEntry>
  );
}