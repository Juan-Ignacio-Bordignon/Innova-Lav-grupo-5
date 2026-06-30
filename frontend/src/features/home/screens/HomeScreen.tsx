import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedEntry, AppText } from '../../../components/ui';
import { colors } from '../../../constants/colors';
import { ROUTES } from '../../../constants/routes';
import { getCurrentUser } from '../../user/services/userService';
import { ModuleCard } from '../../modules/components/ModuleCard';
import { getHomeModules } from '../../modules/services/modulesService';
import type { HomeModule } from '../../modules/types';
import { HomeHeader } from '../components/HomeHeader';
import { HomeSearchBar } from '../components/HomeSearchBar';

export function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [modules, setModules] = useState<HomeModule[]>([]);
  const [userName, setUserName] = useState('Usuario');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [animationKey, setAnimationKey] = useState(0);

  const navigation = useNavigation<any>();

  useEffect(() => {
    let isMounted = true;

    async function loadModules() {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const [homeModules, currentUser] = await Promise.all([
          getHomeModules(),
          getCurrentUser().catch(() => null),
        ]);

        if (isMounted) {
          setModules(homeModules);
          setUserName(currentUser?.usuario.username ?? 'Usuario');
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los módulos.'
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadModules();

    return () => {
      isMounted = false;
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      setAnimationKey((value) => value + 1);
    }, [])
  );

  const filteredModules = modules.filter((module) => {
    const search = searchValue.trim().toLowerCase();

    if (!search) {
      return true;
    }

    return `${module.title} ${module.subtitle}`.toLowerCase().includes(search);
  });

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        <View style={styles.topSpacer} />

        <AnimatedEntry delay={80} triggerKey={animationKey}>
          <HomeHeader
            userName={userName}
            notificationsCount={1}
          />
        </AnimatedEntry>

        <AnimatedEntry delay={180} triggerKey={animationKey}>
          <HomeSearchBar
            value={searchValue}
            onChangeText={setSearchValue}
          />
        </AnimatedEntry>

        <View style={styles.modulesSection}>
          <AnimatedEntry delay={280} triggerKey={animationKey}>
            <AppText variant="title" style={styles.sectionTitle}>
              Módulos
            </AppText>
          </AnimatedEntry>

          {isLoading ? (
            <AnimatedEntry delay={360} triggerKey={animationKey}>
              <View>
                <HomeModuleSkeletonCard delay={0} />
                <HomeModuleSkeletonCard delay={160} />
              </View>
            </AnimatedEntry>
          ) : null}

          {!isLoading && errorMessage ? (
            <AnimatedEntry delay={360} triggerKey={animationKey}>
              <AppText variant="error" style={styles.feedbackText}>
                {errorMessage}
              </AppText>
            </AnimatedEntry>
          ) : null}

          {!isLoading && !errorMessage && filteredModules.length === 0 ? (
            <AnimatedEntry delay={360} triggerKey={animationKey}>
              <AppText variant="body" style={styles.feedbackText}>
                No encontramos módulos con esa búsqueda.
              </AppText>
            </AnimatedEntry>
          ) : null}

          {!isLoading && !errorMessage
            ? filteredModules.map((module, index) => (
                <AnimatedEntry
                  key={`${module.id}-${animationKey}`}
                  delay={360 + index * 120}
                  triggerKey={animationKey}
                  style={styles.cardAnimationWrapper}
                >
                  <ModuleCard
                    module={module}
                    animationKey={animationKey}
                    onPress={() =>
                      navigation.navigate(ROUTES.MODULE_DETAIL, {
                        moduleId: module.id,
                        moduleName: module.subtitle,
                        moduleDescription:
                          module.detailDescription ?? module.description,
                        moduleProgress: module.progress,
                        lessons: module.lessons,
                      })
                    }
                  />
                </AnimatedEntry>
              ))
            : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HomeModuleSkeletonCard({ delay = 0 }: { delay?: number }) {
  const opacity = useSharedValue(0.45);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 780,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      )
    );
  }, [delay, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.skeletonCard, animatedStyle]}>
      <View style={styles.skeletonIconBox} />

      <View style={styles.skeletonContent}>
        <View style={styles.skeletonTitleLine} />
        <View style={styles.skeletonSubtitleLine} />
        <View style={styles.skeletonDescriptionLine} />
        <View style={styles.skeletonProgressTrack} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 28,
  },

  topSpacer: {
    height: 24,
  },

  modulesSection: {
    marginTop: 34,
  },

  sectionTitle: {
    fontSize: 29,
    lineHeight: 35,
    marginBottom: 16,
  },

  feedbackText: {
    marginTop: 4,
    marginBottom: 18,
    color: colors.textSecondary,
  },

  cardAnimationWrapper: {
    width: '100%',
  },

  skeletonCard: {
    width: '100%',
    minHeight: 158,
    borderRadius: 24,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 22,

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },

  skeletonIconBox: {
    width: 132,
    height: 132,
    borderRadius: 14,
    backgroundColor: '#DDE4E6',
    marginRight: 14,
  },

  skeletonContent: {
    flex: 1,
    justifyContent: 'center',
  },

  skeletonTitleLine: {
    width: '52%',
    height: 20,
    borderRadius: 10,
    backgroundColor: '#DDE4E6',
    marginBottom: 10,
  },

  skeletonSubtitleLine: {
    width: '72%',
    height: 20,
    borderRadius: 10,
    backgroundColor: '#DDE4E6',
    marginBottom: 20,
  },

  skeletonDescriptionLine: {
    width: '88%',
    height: 14,
    borderRadius: 8,
    backgroundColor: '#E5EAEC',
    marginBottom: 14,
  },

  skeletonProgressTrack: {
    width: '100%',
    height: 13,
    borderRadius: 8,
    backgroundColor: '#D8D8D8',
  },
});