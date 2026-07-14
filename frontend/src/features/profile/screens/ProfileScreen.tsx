import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';

import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  ActivityIndicator,
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../../../components/navigation/AppHeader';

import {
  AnimatedEntry,
  AnimatedPop,
  AnimatedProgressBar,
  AppText,
} from '../../../components/ui';

import { colors } from '../../../constants/colors';
import { ROUTES } from '../../../constants/routes';
import { logout } from '../../auth/services/authService';
import { AchievementCard } from '../components/AchievementCard';
import { getProfileOverview } from '../services/profileService';

import type { ProfileOverview } from '../types';

import { styles } from './ProfileScreen.styles';

const EMPTY_PROFILE: ProfileOverview = {
  username: 'Usuario',
  email: '',
  completedLessons: 0,
  pendingLessons: 0,
  totalLessons: 0,
  progressPercentage: 0,
  points: 0,
  streak: 0,
  achievements: [],
};

export function Profile() {
  const navigation = useNavigation<any>();

  const [profile, setProfile] =
    useState<ProfileOverview>(EMPTY_PROFILE);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isRefreshing, setIsRefreshing] =
    useState(false);

  const [isLoggingOut, setIsLoggingOut] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState('');

  const [animationKey, setAnimationKey] =
    useState(0);

  const loadProfile = useCallback(
    async (refresh = false) => {
      try {
        if (refresh) {
          setIsRefreshing(true);
        } else {
          setIsLoading(true);
        }

        setErrorMessage('');

        const response =
          await getProfileOverview();

        setProfile(response);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'No se pudo cargar la información del perfil.',
        );
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [],
  );

  useFocusEffect(
    useCallback(() => {
      setAnimationKey((value) => value + 1);
      void loadProfile();
    }, [loadProfile]),
  );

  const recentAchievements = useMemo(
    () =>
      profile.achievements
        .filter((item) => item.achieved)
        .slice(0, 3),
    [profile.achievements],
  );

  const handleOpenAchievements = () => {
    navigation.navigate(ROUTES.ACHIEVEMENTS);
  };

  const handleNotifications = () => {
    Alert.alert(
      'Notificaciones',
      'No tenés notificaciones nuevas.',
    );
  };

  const handleComingSoon = (title: string) => {
    Alert.alert(
      title,
      'Esta sección estará disponible próximamente.',
    );
  };

  const handleSettings = () => {
    const rootNavigation =
      navigation.getParent()?.getParent() ??
      navigation.getParent() ??
      navigation;

    rootNavigation.navigate(ROUTES.SETTINGS);
  };

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    try {
      setIsLoggingOut(true);

      await logout();

      const rootNavigation =
        navigation.getParent()?.getParent() ??
        navigation.getParent() ??
        navigation;

      rootNavigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: ROUTES.LOGIN,
            },
          ],
        }),
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={styles.safeArea}
    >
      <AppHeader
        variant="title"
        title="Perfil"
        notificationCount={1}
        animationKey={animationKey}
        onAchievementsPress={
          handleOpenAchievements
        }
        onNotificationsPress={
          handleNotifications
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.contentContainer
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() =>
              void loadProfile(true)
            }
            tintColor={colors.primary}
          />
        }
      >
        {isLoading ? (
          <ProfileSkeleton
            animationKey={animationKey}
          />
        ) : errorMessage ? (
          <ProfileError
            message={errorMessage}
            animationKey={animationKey}
            onRetry={() =>
              void loadProfile()
            }
          />
        ) : (
          <>
            <AnimatedEntry
              delay={160}
              triggerKey={animationKey}
            >
              <View style={styles.progressCard}>
                <View
                  style={styles.progressTopRow}
                >
                  <AnimatedPop
                    triggerKey={animationKey}
                    delay={240}
                    startScale={0.78}
                  >
                    <View
                      style={
                        styles.progressEmblem
                      }
                    >
                      <MaterialIcons
                        name="star-border"
                        size={43}
                        color={colors.secondary}
                      />

                      <View
                        style={styles.emblemBase}
                      />
                    </View>
                  </AnimatedPop>

                  <View
                    style={
                      styles.progressSummary
                    }
                  >
                    <AppText
                      style={styles.progressTitle}
                    >
                      Tu progreso
                    </AppText>

                    <AppText
                      style={
                        styles.progressDetail
                      }
                    >
                      {profile.completedLessons}{' '}
                      {profile.completedLessons ===
                      1
                        ? 'lección completada'
                        : 'lecciones completadas'}
                    </AppText>

                    <AppText
                      style={
                        styles.progressDetail
                      }
                    >
                      {profile.pendingLessons}{' '}
                      {profile.pendingLessons === 1
                        ? 'lección pendiente'
                        : 'lecciones pendientes'}
                    </AppText>
                  </View>
                </View>

                <AnimatedProgressBar
                  progress={
                    profile.progressPercentage
                  }
                  triggerKey={animationKey}
                  delay={330}
                  trackStyle={
                    styles.progressTrack
                  }
                  fillStyle={
                    styles.progressFill
                  }
                />

                <AppText
                  style={
                    styles.progressPercentage
                  }
                >
                  {profile.progressPercentage}%
                  completado
                </AppText>

                <View style={styles.divider} />

                <View style={styles.statsRow}>
                  <ProfileStat
                    icon="star-border"
                    label="Racha actual"
                    value={`${profile.streak} ${
                      profile.streak === 1
                        ? 'día'
                        : 'días'
                    }`}
                    animationKey={animationKey}
                    delay={430}
                  />

                  <ProfileStat
                    icon="done"
                    label="Puntos"
                    value={`${profile.points} pts`}
                    animationKey={animationKey}
                    delay={520}
                  />
                </View>
              </View>
            </AnimatedEntry>

            <AnimatedEntry
              delay={300}
              triggerKey={animationKey}
            >
              <View
                style={styles.sectionHeader}
              >
                <AppText
                  style={styles.sectionTitle}
                >
                  Logros recientes
                </AppText>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Ver todos los logros"
                  onPress={
                    handleOpenAchievements
                  }
                  style={({ pressed }) => [
                    styles.viewAllButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <AppText
                    style={styles.viewAllText}
                  >
                    Ver todos →
                  </AppText>
                </Pressable>
              </View>
            </AnimatedEntry>

            <AnimatedEntry
              delay={370}
              triggerKey={animationKey}
            >
              {recentAchievements.length >
              0 ? (
                <View
                  style={
                    styles.achievementsRow
                  }
                >
                  {recentAchievements.map(
                    (
                      achievement,
                      index,
                    ) => (
                      <AchievementCard
                        key={
                          achievement.id
                        }
                        achievement={
                          achievement
                        }
                        compact
                        animationKey={
                          animationKey
                        }
                        animationDelay={
                          470 + index * 90
                        }
                        onPress={() =>
                          Alert.alert(
                            achievement.name,
                            achievement.description,
                          )
                        }
                      />
                    ),
                  )}
                </View>
              ) : (
                <View
                  style={
                    styles.emptyAchievementsCard
                  }
                >
                  <MaterialIcons
                    name="emoji-events"
                    size={36}
                    color={colors.secondary}
                  />

                  <View
                    style={
                      styles.emptyAchievementsContent
                    }
                  >
                    <AppText
                      style={
                        styles.emptyAchievementsTitle
                      }
                    >
                      Tus logros aparecerán acá
                    </AppText>

                    <AppText
                      style={
                        styles.emptyAchievementsText
                      }
                    >
                      Seguí completando lecciones
                      para desbloquearlos.
                    </AppText>
                  </View>
                </View>
              )}
            </AnimatedEntry>

            <AnimatedEntry
              delay={450}
              triggerKey={animationKey}
            >
              <AppText
                style={styles.accountTitle}
              >
                Cuenta
              </AppText>

              <View
                style={styles.accountCard}
              >
                <AccountMenuItem
                  icon="person-outline"
                  label="Mis datos"
                  onPress={() =>
                    handleComingSoon(
                      'Mis datos',
                    )
                  }
                />

                <AccountMenuItem
                  icon="settings"
                  label="Configuración"
                  onPress={handleSettings}
                />

                <AccountMenuItem
                  icon="privacy-tip"
                  label="Políticas de privacidad"
                  onPress={() =>
                    handleComingSoon(
                      'Políticas de privacidad',
                    )
                  }
                />

                <AccountMenuItem
                  icon="article"
                  label="Términos y condiciones"
                  onPress={() =>
                    handleComingSoon(
                      'Términos y condiciones',
                    )
                  }
                />

                <AccountMenuItem
                  icon="help-outline"
                  label="Ayuda"
                  onPress={() =>
                    handleComingSoon('Ayuda')
                  }
                />

                <AccountMenuItem
                  icon="logout"
                  label="Cerrar sesión"
                  disabled={isLoggingOut}
                  rightElement={
                    isLoggingOut ? (
                      <ActivityIndicator
                        size="small"
                        color={colors.primary}
                      />
                    ) : undefined
                  }
                  onPress={() =>
                    void handleLogout()
                  }
                />
              </View>
            </AnimatedEntry>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

type ProfileStatProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string;
  animationKey: number;
  delay: number;
};

function ProfileStat({
  icon,
  label,
  value,
  animationKey,
  delay,
}: ProfileStatProps) {
  return (
    <View style={styles.statItem}>
      <AnimatedPop
        triggerKey={animationKey}
        delay={delay}
        startScale={0.82}
      >
        <View style={styles.statIconCircle}>
          <MaterialIcons
            name={icon}
            size={24}
            color={colors.primary}
          />
        </View>
      </AnimatedPop>

      <View style={styles.statTextContainer}>
        <AppText style={styles.statLabel}>
          {label}
        </AppText>

        <AppText style={styles.statValue}>
          {value}
        </AppText>
      </View>
    </View>
  );
}

type AccountMenuItemProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  disabled?: boolean;
  rightElement?: ReactNode;
  onPress: () => void;
};

function AccountMenuItem({
  icon,
  label,
  disabled = false,
  rightElement,
  onPress,
}: AccountMenuItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.accountRow,
        pressed && styles.accountRowPressed,
      ]}
    >
      <MaterialIcons
        name={icon}
        size={21}
        color={colors.primary}
      />

      <AppText style={styles.accountRowText}>
        {label}
      </AppText>

      {rightElement}
    </Pressable>
  );
}

function ProfileError({
  message,
  animationKey,
  onRetry,
}: {
  message: string;
  animationKey: number;
  onRetry: () => void;
}) {
  return (
    <AnimatedEntry
      delay={160}
      triggerKey={animationKey}
    >
      <View style={styles.errorContainer}>
        <MaterialIcons
          name="cloud-off"
          size={52}
          color={colors.primary}
        />

        <AppText style={styles.errorText}>
          {message}
        </AppText>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Reintentar carga del perfil"
          onPress={onRetry}
          style={({ pressed }) => [
            styles.retryButton,
            pressed && styles.pressed,
          ]}
        >
          <AppText
            style={styles.retryButtonText}
          >
            Reintentar
          </AppText>
        </Pressable>
      </View>
    </AnimatedEntry>
  );
}

function ProfileSkeleton({
  animationKey,
}: {
  animationKey: number;
}) {
  return (
    <AnimatedEntry
      delay={150}
      triggerKey={animationKey}
    >
      <View
        style={styles.skeletonProgressCard}
      >
        <View style={styles.skeletonTopRow}>
          <View
            style={styles.skeletonEmblem}
          />

          <View
            style={styles.skeletonSummary}
          >
            <View
              style={styles.skeletonTitle}
            />
            <View
              style={styles.skeletonLine}
            />
            <View
              style={
                styles.skeletonShortLine
              }
            />
          </View>
        </View>

        <View
          style={styles.skeletonProgress}
        />

        <View
          style={
            styles.skeletonPercentage
          }
        />

        <View
          style={styles.skeletonDivider}
        />

        <View
          style={styles.skeletonStatsRow}
        >
          <View
            style={styles.skeletonStat}
          />
          <View
            style={styles.skeletonStat}
          />
        </View>
      </View>

      <View
        style={styles.skeletonSectionTitle}
      />

      <View
        style={
          styles.skeletonAchievementsRow
        }
      >
        <View
          style={
            styles.skeletonAchievementCard
          }
        />
        <View
          style={
            styles.skeletonAchievementCard
          }
        />
        <View
          style={
            styles.skeletonAchievementCard
          }
        />
      </View>

      <View
        style={styles.skeletonAccountTitle}
      />

      <View
        style={styles.skeletonAccountCard}
      />
    </AnimatedEntry>
  );
}