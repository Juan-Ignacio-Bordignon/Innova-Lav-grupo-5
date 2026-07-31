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

  streak?: number;
  notificationCount?: number;

  animationKey?: number;
  animationDelay?: number;

  style?: StyleProp<ViewStyle>;

  showStreak?: boolean;
  showAchievements?: boolean;
  showNotifications?: boolean;

  onBackFallback?: () => void;
  onStreakPress?: () => void;
  onAchievementsPress?: () => void;
  onNotificationsPress?: () => void;
};

type HeaderIconActionProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  accessibilityLabel: string;
  showSeparator?: boolean;
  badgeText?: string;
  onPress?: () => void;
};

function HeaderIconAction({
  icon,
  accessibilityLabel,
  showSeparator = false,
  badgeText,
  onPress,
}: HeaderIconActionProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{
        disabled: !onPress,
      }}
      disabled={!onPress}
      hitSlop={6}
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionItem,
        showSeparator && styles.actionSeparator,
        pressed && styles.actionPressed,
      ]}
    >
      <MaterialIcons
        name={icon}
        size={22}
        color={colors.primary}
      />

      {badgeText ? (
        <View
          pointerEvents="none"
          style={styles.notificationBadge}
        >
          <AppText style={styles.notificationBadgeText}>
            {badgeText}
          </AppText>
        </View>
      ) : null}
    </Pressable>
  );
}

type HeaderStreakActionProps = {
  streak: number;
  onPress?: () => void;
};

function HeaderStreakAction({
  streak,
  onPress,
}: HeaderStreakActionProps) {
  const displayedStreak =
    streak > 999 ? '999+' : String(streak);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Racha actual: ${streak} ${
        streak === 1 ? 'día' : 'días'
      }`}
      accessibilityState={{
        disabled: !onPress,
      }}
      disabled={!onPress}
      hitSlop={6}
      onPress={onPress}
      style={({ pressed }) => [
        styles.streakAction,
        pressed && styles.actionPressed,
      ]}
    >
      <MaterialIcons
        name="local-fire-department"
        size={23}
        color={colors.secondary}
      />

      <AppText
        numberOfLines={1}
        style={styles.streakText}
      >
        {displayedStreak}
      </AppText>
    </Pressable>
  );
}

export function AppHeader({
  variant,
  title,
  userName = 'Usuario',

  streak,
  notificationCount = 0,

  animationKey = 0,
  animationDelay = 80,

  style,

  showStreak,
  showAchievements = true,
  showNotifications = true,

  onBackFallback,
  onStreakPress,
  onAchievementsPress,
  onNotificationsPress,
}: AppHeaderProps) {
  const navigation = useNavigation<any>();

  const safeUserName =
    userName.trim() || 'Usuario';

  const normalizedStreak =
    typeof streak === 'number' &&
    Number.isFinite(streak)
      ? Math.max(0, Math.trunc(streak))
      : 0;

  const shouldShowStreak =
    showStreak ?? streak !== undefined;

  const displayedNotificationCount =
    notificationCount > 99
      ? '99+'
      : notificationCount > 0
        ? String(notificationCount)
        : undefined;

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
        <View style={styles.greetingContent}>
          <AppText style={styles.greetingLabel}>
            Hola,
          </AppText>

          <AppText
            numberOfLines={1}
            ellipsizeMode="tail"
            adjustsFontSizeToFit
            minimumFontScale={0.8}
            style={styles.greetingName}
          >
            {safeUserName}
          </AppText>
        </View>
      );
    }

    if (variant === 'title') {
      return (
        <AppText
          numberOfLines={1}
          ellipsizeMode="tail"
          adjustsFontSizeToFit
          minimumFontScale={0.82}
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
          hitSlop={8}
          onPress={handleBackPress}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
        >
          <MaterialIcons
            name="arrow-back-ios-new"
            size={19}
            color={colors.primary}
          />
        </Pressable>

        {title ? (
          <AppText
            numberOfLines={1}
            ellipsizeMode="tail"
            adjustsFontSizeToFit
            minimumFontScale={0.82}
            style={styles.backTitle}
          >
            {title}
          </AppText>
        ) : null}
      </View>
    );
  };

  const hasActions =
    shouldShowStreak ||
    showAchievements ||
    showNotifications;

  const showAchievementSeparator =
    shouldShowStreak;

  const showNotificationSeparator =
    shouldShowStreak || showAchievements;

  return (
    <AnimatedEntry
      delay={animationDelay}
      duration={360}
      translateY={7}
      startScale={0.995}
      triggerKey={animationKey}
      style={styles.animationWrapper}
    >
      <View style={[styles.container, style]}>
        <View style={styles.leftSection}>
          {renderLeftContent()}
        </View>

        {hasActions ? (
          <View style={styles.actionsToolbar}>
            {shouldShowStreak ? (
              <HeaderStreakAction
                streak={normalizedStreak}
                onPress={onStreakPress}
              />
            ) : null}

            {showAchievements ? (
              <HeaderIconAction
                icon="emoji-events"
                accessibilityLabel="Ver logros"
                showSeparator={
                  showAchievementSeparator
                }
                onPress={onAchievementsPress}
              />
            ) : null}

            {showNotifications ? (
              <HeaderIconAction
                icon="notifications-none"
                accessibilityLabel="Ver notificaciones"
                showSeparator={
                  showNotificationSeparator
                }
                badgeText={
                  displayedNotificationCount
                }
                onPress={onNotificationsPress}
              />
            ) : null}
          </View>
        ) : null}
      </View>
    </AnimatedEntry>
  );
}