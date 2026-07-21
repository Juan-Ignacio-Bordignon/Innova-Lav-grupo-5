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

export type AppHeaderVariant = 'home' | 'back' | 'title';

export type AppHeaderProps = {
  variant: AppHeaderVariant;
  title?: string;
  userName?: string;
  notificationCount?: number;
  animationKey?: number;
  animationDelay?: number;
  style?: StyleProp<ViewStyle>;
  showAchievements?: boolean;
  showNotifications?: boolean;
  onBackFallback?: () => void;
  onAchievementsPress?: () => void;
  onNotificationsPress?: () => void;
};

export function AppHeader({
  variant,
  title,
  userName = 'Usuario',
  notificationCount = 0,
  animationKey = 0,
  animationDelay = 80,
  style,
  showAchievements = true,
  showNotifications = true,
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

  const renderLeftContent = () => {
    if (variant === 'home') {
      return (
        <AppText
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.greeting}
        >
          ¡Hola {safeUserName}!
        </AppText>
      );
    }

    if (variant === 'title') {
      return (
        <AppText
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.title}
        >
          {title}
        </AppText>
      );
    }

    return (
      <View style={styles.backContent}>
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

        {title ? (
          <AppText
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.backTitle}
          >
            {title}
          </AppText>
        ) : null}
      </View>
    );
  };

  return (
    <AnimatedEntry delay={animationDelay} triggerKey={animationKey}>
      <View style={[styles.container, style]}>
        <View style={styles.leftSection}>{renderLeftContent()}</View>

        {showAchievements || showNotifications ? (
          <View style={styles.actions}>
            {showAchievements ? (
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
            ) : null}

            {showNotifications ? (
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

                {notificationCount > 0 ? (
                  <View
                    pointerEvents="none"
                    style={styles.notificationBadge}
                  >
                    <AppText style={styles.notificationBadgeText}>
                      {displayedNotificationCount}
                    </AppText>
                  </View>
                ) : null}
              </Pressable>
            ) : null}
          </View>
        ) : null}
      </View>
    </AnimatedEntry>
  );
}