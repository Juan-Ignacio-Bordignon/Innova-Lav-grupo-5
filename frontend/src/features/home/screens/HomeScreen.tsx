import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../../../components/navigation/AppHeader';

import {
  AnimatedEntry,
  AppText,
} from '../../../components/ui';

import { colors } from '../../../constants/colors';
import { ROUTES } from '../../../constants/routes';
import { TRACKING_EVENTS } from '../../../services/tracking/trackingEvents';
import { trackEvent } from '../../../services/tracking/trackingService';
import { fonts } from '../../../theme/fonts';

import { ModuleCard } from '../../modules/components/ModuleCard';
import { getHomeModules } from '../../modules/services/modulesService';
import type { HomeModule } from '../../modules/types';

import { getCurrentUser } from '../../user/services/userService';
import { HomeSearchBar } from '../components/HomeSearchBar';

export function Home() {
  const navigation = useNavigation<any>();

  const [searchValue, setSearchValue] =
    useState('');

  const [modules, setModules] =
    useState<HomeModule[]>([]);

  const [userName, setUserName] =
    useState('Usuario');

  const [streak, setStreak] =
    useState(0);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isRefreshing, setIsRefreshing] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState('');

  const [animationKey, setAnimationKey] =
    useState(0);

  /**
   * Carga los módulos sin depender de GET /user.
   * Así un error del usuario no bloquea el contenido principal.
   */
  const loadModules = useCallback(
    async (refresh = false) => {
      try {
        if (refresh) {
          setIsRefreshing(true);
        } else {
          setIsLoading(true);
        }

        setErrorMessage('');

        const homeModules =
          await getHomeModules();

        setModules(homeModules);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'No se pudieron cargar los módulos.',
        );
      } finally {
        setIsLoading(false);

        if (refresh) {
          setIsRefreshing(false);
        }
      }
    },
    [],
  );

  /**
   * Obtiene el nombre y la racha para el header.
   * No elimina la información anterior ante un error temporal.
   */
  const loadHeaderUser =
    useCallback(async () => {
      try {
        const currentUser =
          await getCurrentUser();

        if (!currentUser) {
          return;
        }

        const receivedUserName =
          currentUser.usuario?.username?.trim();

        const receivedStreak = Number(
          currentUser.racha,
        );

        setUserName(
          receivedUserName || 'Usuario',
        );

        setStreak(
          Number.isFinite(receivedStreak)
            ? Math.max(
                0,
                Math.trunc(receivedStreak),
              )
            : 0,
        );
      } catch (error) {
        console.error(
          'No se pudo cargar la información del usuario en Home:',
          error,
        );
      }
    }, []);

  /**
   * Primera carga de módulos.
   */
  useEffect(() => {
    void loadModules();
  }, [loadModules]);

  /**
   * Actualiza usuario y racha cada vez que Home recupera el foco.
   * Esto refleja cambios producidos al completar ejercicios.
   */
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      setAnimationKey(
        (currentKey) => currentKey + 1,
      );

      async function refreshHeader() {
        if (!isActive) {
          return;
        }

        await loadHeaderUser();
      }

      void refreshHeader();

      return () => {
        isActive = false;
      };
    }, [loadHeaderUser]),
  );

  const filteredModules = useMemo(() => {
    const search =
      searchValue.trim().toLowerCase();

    if (!search) {
      return modules;
    }

    return modules.filter((module) =>
      `${module.title} ${module.subtitle}`
        .toLowerCase()
        .includes(search),
    );
  }, [modules, searchValue]);

  const moduleCountText = useMemo(() => {
    const count = filteredModules.length;

    if (searchValue.trim()) {
      return count === 1
        ? '1 resultado'
        : `${count} resultados`;
    }

    return count === 1
      ? '1 disponible'
      : `${count} disponibles`;
  }, [
    filteredModules.length,
    searchValue,
  ]);

  const handleRefresh = async () => {
    setAnimationKey(
      (currentKey) => currentKey + 1,
    );

    await Promise.allSettled([
      loadModules(true),
      loadHeaderUser(),
    ]);
  };

  const handleModulePress = (
    module: HomeModule,
  ) => {
    void trackEvent(
      TRACKING_EVENTS.MODULE_OPENED,
      {
        moduleId: module.id,
        moduleName: module.subtitle,
        moduleProgress: module.progress,
        sourceScreen: 'home',
      },
    );

    navigation.navigate(
      ROUTES.MODULE_DETAIL,
      {
        moduleId: module.id,
        moduleName: module.subtitle,
        moduleDescription:
          module.detailDescription ??
          module.description,
        moduleProgress: module.progress,
        lessons: module.lessons,
      },
    );
  };

  const handleStreakPress = () => {
    navigation.navigate(
      ROUTES.PROFILE_TAB,
    );
  };

  const handleAchievementsPress = () => {
    navigation.navigate(
      ROUTES.PROFILE_TAB,
      {
        screen: ROUTES.ACHIEVEMENTS,
      },
    );
  };

  const handleNotificationsPress = () => {
    Alert.alert(
      'Notificaciones',
      'No tenés notificaciones nuevas.',
    );
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={styles.safeArea}
    >
      <AppHeader
        variant="home"
        userName={userName}
        streak={streak}
        notificationCount={1}
        animationKey={animationKey}
        onStreakPress={
          handleStreakPress
        }
        onAchievementsPress={
          handleAchievementsPress
        }
        onNotificationsPress={
          handleNotificationsPress
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={
          styles.content
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() =>
              void handleRefresh()
            }
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        <AnimatedEntry
          delay={150}
          triggerKey={animationKey}
        >
          <HomeSearchBar
            value={searchValue}
            onChangeText={setSearchValue}
          />
        </AnimatedEntry>

        <View
          style={styles.modulesSection}
        >
          <AnimatedEntry
            delay={240}
            triggerKey={animationKey}
          >
            <View
              style={
                styles.sectionHeaderRow
              }
            >
              <View>
                <AppText
                  variant="title"
                  style={styles.sectionTitle}
                >
                  Módulos
                </AppText>

                <AppText
                  style={styles.sectionSubtitle}
                >
                  Elegí cómo querés seguir
                  aprendiendo
                </AppText>
              </View>

              {!isLoading &&
              !errorMessage ? (
                <View
                  style={styles.countBadge}
                >
                  <AppText
                    numberOfLines={1}
                    style={
                      styles.countBadgeText
                    }
                  >
                    {moduleCountText}
                  </AppText>
                </View>
              ) : null}
            </View>
          </AnimatedEntry>

          {isLoading ? (
            <AnimatedEntry
              delay={320}
              triggerKey={animationKey}
            >
              <View>
                <HomeModuleSkeletonCard
                  delay={0}
                />

                <HomeModuleSkeletonCard
                  delay={140}
                />
              </View>
            </AnimatedEntry>
          ) : null}

          {!isLoading &&
          errorMessage ? (
            <AnimatedEntry
              delay={320}
              triggerKey={animationKey}
            >
              <View
                style={styles.feedbackCard}
              >
                <View
                  style={
                    styles.feedbackIconBox
                  }
                >
                  <MaterialIcons
                    name="cloud-off"
                    size={27}
                    color={colors.primary}
                  />
                </View>

                <View
                  style={
                    styles.feedbackContent
                  }
                >
                  <AppText
                    style={
                      styles.feedbackTitle
                    }
                  >
                    No pudimos cargar los
                    módulos
                  </AppText>

                  <AppText
                    style={
                      styles.feedbackText
                    }
                  >
                    {errorMessage}
                  </AppText>
                </View>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Reintentar carga de módulos"
                  onPress={() =>
                    void loadModules()
                  }
                  style={({ pressed }) => [
                    styles.retryButton,
                    pressed &&
                      styles.retryButtonPressed,
                  ]}
                >
                  <MaterialIcons
                    name="refresh"
                    size={22}
                    color={colors.textLight}
                  />
                </Pressable>
              </View>
            </AnimatedEntry>
          ) : null}

          {!isLoading &&
          !errorMessage &&
          filteredModules.length === 0 ? (
            <AnimatedEntry
              delay={320}
              triggerKey={animationKey}
            >
              <View
                style={styles.emptyCard}
              >
                <View
                  style={styles.emptyIconBox}
                >
                  <MaterialIcons
                    name="search-off"
                    size={32}
                    color={colors.primary}
                  />
                </View>

                <AppText
                  style={styles.emptyTitle}
                >
                  No encontramos módulos
                </AppText>

                <AppText
                  style={styles.emptyText}
                >
                  Probá buscando con otra
                  palabra.
                </AppText>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Limpiar búsqueda"
                  onPress={() =>
                    setSearchValue('')
                  }
                  style={({ pressed }) => [
                    styles.clearSearchButton,
                    pressed &&
                      styles.retryButtonPressed,
                  ]}
                >
                  <AppText
                    style={
                      styles.clearSearchText
                    }
                  >
                    Limpiar búsqueda
                  </AppText>
                </Pressable>
              </View>
            </AnimatedEntry>
          ) : null}

          {!isLoading && !errorMessage
            ? filteredModules.map(
                (module, index) => (
                  <AnimatedEntry
                    key={`${module.id}-${animationKey}`}
                    delay={
                      310 + index * 110
                    }
                    triggerKey={
                      animationKey
                    }
                    style={
                      styles.cardAnimationWrapper
                    }
                  >
                    <ModuleCard
                      module={module}
                      animationKey={
                        animationKey
                      }
                      onPress={() =>
                        handleModulePress(
                          module,
                        )
                      }
                    />
                  </AnimatedEntry>
                ),
              )
            : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HomeModuleSkeletonCard({
  delay = 0,
}: {
  delay?: number;
}) {
  const opacity =
    useSharedValue(0.45);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 780,
          easing:
            Easing.inOut(Easing.ease),
        }),
        -1,
        true,
      ),
    );
  }, [delay, opacity]);

  const animatedStyle =
    useAnimatedStyle(() => ({
      opacity: opacity.value,
    }));

  return (
    <Animated.View
      style={[
        styles.skeletonCard,
        animatedStyle,
      ]}
    >
      <View
        style={styles.skeletonIconBox}
      />

      <View
        style={styles.skeletonContent}
      >
        <View
          style={
            styles.skeletonEyebrowLine
          }
        />

        <View
          style={styles.skeletonTitleLine}
        />

        <View
          style={
            styles.skeletonDescriptionLine
          }
        />

        <View
          style={styles.skeletonProgressRow}
        >
          <View
            style={
              styles.skeletonProgressLabel
            }
          />

          <View
            style={
              styles.skeletonProgressValue
            }
          />
        </View>

        <View
          style={
            styles.skeletonProgressTrack
          }
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:
      colors.backgroundApp,
  },

  content: {
    flexGrow: 1,

    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 26,
  },

  modulesSection: {
    marginTop: 28,
  },

  sectionHeaderRow: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',

    gap: 12,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 26,
    lineHeight: 32,
    marginBottom: 1,
  },

  sectionSubtitle: {
    fontFamily: fonts.medium,
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
  },

  countBadge: {
    maxWidth: 112,
    minHeight: 28,

    paddingHorizontal: 10,

    borderRadius: 14,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: '#E1E7E8',
  },

  countBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 10,
    lineHeight: 14,
    color: colors.primary,
  },

  cardAnimationWrapper: {
    width: '100%',
  },

  feedbackCard: {
    width: '100%',
    minHeight: 96,

    borderRadius: 18,

    flexDirection: 'row',
    alignItems: 'center',

    padding: 14,

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: '#E4E9EA',

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  feedbackIconBox: {
    width: 48,
    height: 48,

    borderRadius: 16,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.background,

    marginRight: 12,
  },

  feedbackContent: {
    flex: 1,
    minWidth: 0,
  },

  feedbackTitle: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 19,
    color: colors.primary,
  },

  feedbackText: {
    fontFamily: fonts.medium,
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
    marginTop: 2,
  },

  retryButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.primary,

    marginLeft: 10,
  },

  retryButtonPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.96 }],
  },

  emptyCard: {
    width: '100%',
    minHeight: 210,

    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 24,
    paddingVertical: 26,

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: '#E4E9EA',
  },

  emptyIconBox: {
    width: 62,
    height: 62,

    borderRadius: 21,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.background,

    marginBottom: 14,
  },

  emptyTitle: {
    fontFamily: fonts.bold,
    fontSize: 17,
    lineHeight: 23,
    color: colors.primary,
    textAlign: 'center',
  },

  emptyText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 18,
  },

  clearSearchButton: {
    minHeight: 40,

    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 18,

    backgroundColor: colors.primary,
  },

  clearSearchText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 17,
    color: colors.textLight,
  },

  skeletonCard: {
    width: '100%',
    minHeight: 144,

    borderRadius: 20,

    backgroundColor: colors.surface,

    flexDirection: 'row',
    alignItems: 'center',

    padding: 14,
    marginBottom: 16,

    borderWidth: 1,
    borderColor: '#E4E9EA',

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  skeletonIconBox: {
    width: 112,
    height: 112,

    borderRadius: 18,

    backgroundColor: '#DDE4E6',

    marginRight: 16,
  },

  skeletonContent: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
  },

  skeletonEyebrowLine: {
    width: '42%',
    height: 9,

    borderRadius: 5,

    backgroundColor: '#E7EBEC',

    marginBottom: 7,
  },

  skeletonTitleLine: {
    width: '78%',
    height: 20,

    borderRadius: 10,

    backgroundColor: '#DDE4E6',

    marginBottom: 10,
  },

  skeletonDescriptionLine: {
    width: '92%',
    height: 11,

    borderRadius: 6,

    backgroundColor: '#E7EBEC',

    marginBottom: 13,
  },

  skeletonProgressRow: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 7,
  },

  skeletonProgressLabel: {
    width: 58,
    height: 9,

    borderRadius: 5,

    backgroundColor: '#E7EBEC',
  },

  skeletonProgressValue: {
    width: 25,
    height: 9,

    borderRadius: 5,

    backgroundColor: '#DDE4E6',
  },

  skeletonProgressTrack: {
    width: '100%',
    height: 8,

    borderRadius: 4,

    backgroundColor: '#E1E5E6',
  },
});