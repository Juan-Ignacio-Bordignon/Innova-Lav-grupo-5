import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';

import {
  useCallback,
  useMemo,
  useState,
} from 'react';

import {
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
  AppText,
} from '../../../components/ui';

import { colors } from '../../../constants/colors';
import { AchievementCard } from '../components/AchievementCard';
import { getProfileOverview } from '../services/profileService';

import type {
  AchievementFilter,
  ProfileAchievement,
} from '../types';

import { styles } from './AchievementsScreen.styles';

const FILTERS: {
  key: AchievementFilter;
  label: string;
}[] = [
  {
    key: 'all',
    label: 'Todos',
  },
  {
    key: 'completed',
    label: 'Completos',
  },
  {
    key: 'pending',
    label: 'Pendientes',
  },
];

export function AchievementsScreen() {
  const [achievements, setAchievements] =
    useState<ProfileAchievement[]>([]);

  const [activeFilter, setActiveFilter] =
    useState<AchievementFilter>('all');

  const [isLoading, setIsLoading] =
    useState(true);

  const [isRefreshing, setIsRefreshing] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState('');

  const [animationKey, setAnimationKey] =
    useState(0);

  const loadAchievements = useCallback(
    async (refresh = false) => {
      try {
        if (refresh) {
          setIsRefreshing(true);
        } else {
          setIsLoading(true);
        }

        setErrorMessage('');

        const profile =
          await getProfileOverview();

        setAchievements(
          profile.achievements,
        );
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'No se pudieron cargar los logros.',
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
      void loadAchievements();
    }, [loadAchievements]),
  );

  const filteredAchievements = useMemo(() => {
    if (activeFilter === 'completed') {
      return achievements.filter(
        (achievement) =>
          achievement.achieved,
      );
    }

    if (activeFilter === 'pending') {
      return achievements.filter(
        (achievement) =>
          !achievement.achieved,
      );
    }

    return achievements;
  }, [achievements, activeFilter]);

  const highlightedAchievementId =
    useMemo(
      () =>
        achievements.find(
          (achievement) =>
            achievement.achieved,
        )?.id,
      [achievements],
    );

  const handleNotifications = () => {
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
        variant="back"
        title="Mis logros"
        notificationCount={1}
        animationKey={animationKey}
        showAchievements={false}
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
              void loadAchievements(true)
            }
            tintColor={colors.primary}
          />
        }
      >
        <AnimatedEntry
          delay={160}
          triggerKey={animationKey}
        >
          <View style={styles.filtersRow}>
            {FILTERS.map((filter) => {
              const isActive =
                activeFilter === filter.key;

              return (
                <Pressable
                  key={filter.key}
                  accessibilityRole="button"
                  accessibilityState={{
                    selected: isActive,
                  }}
                  accessibilityLabel={`Filtrar por ${filter.label}`}
                  onPress={() =>
                    setActiveFilter(filter.key)
                  }
                  style={({ pressed }) => [
                    styles.filterButton,
                    isActive &&
                      styles.activeFilterButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <AppText
                    style={[
                      styles.filterText,
                      isActive &&
                        styles.activeFilterText,
                    ]}
                  >
                    {filter.label}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </AnimatedEntry>

        {isLoading ? (
          <AchievementsSkeleton
            animationKey={animationKey}
          />
        ) : errorMessage ? (
          <AnimatedEntry
            delay={260}
            triggerKey={animationKey}
          >
            <View
              style={
                styles.feedbackContainer
              }
            >
              <MaterialIcons
                name="cloud-off"
                size={52}
                color={colors.primary}
              />

              <AppText
                style={styles.feedbackText}
              >
                {errorMessage}
              </AppText>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Reintentar carga de logros"
                onPress={() =>
                  void loadAchievements()
                }
                style={({ pressed }) => [
                  styles.retryButton,
                  pressed && styles.pressed,
                ]}
              >
                <AppText
                  style={
                    styles.retryButtonText
                  }
                >
                  Reintentar
                </AppText>
              </Pressable>
            </View>
          </AnimatedEntry>
        ) : filteredAchievements.length ===
          0 ? (
          <AnimatedEntry
            delay={260}
            triggerKey={animationKey}
          >
            <View
              style={
                styles.feedbackContainer
              }
            >
              <MaterialIcons
                name="emoji-events"
                size={52}
                color={colors.secondary}
              />

              <AppText
                style={styles.feedbackTitle}
              >
                No hay logros en esta
                categoría
              </AppText>

              <AppText
                style={styles.feedbackText}
              >
                Probá seleccionando otro
                filtro.
              </AppText>
            </View>
          </AnimatedEntry>
        ) : (
          <View style={styles.grid}>
            {filteredAchievements.map(
              (achievement, index) => (
                <AnimatedEntry
                  key={`${achievement.id}-${activeFilter}-${animationKey}`}
                  delay={250 + index * 65}
                  triggerKey={`${animationKey}-${activeFilter}`}
                  style={
                    styles.cardAnimationWrapper
                  }
                >
                  <AchievementCard
                    achievement={achievement}
                    highlighted={
                      achievement.achieved &&
                      achievement.id ===
                        highlightedAchievementId
                    }
                    animationKey={
                      animationKey
                    }
                    animationDelay={
                      330 + index * 65
                    }
                    onPress={() =>
                      Alert.alert(
                        achievement.name,
                        achievement.description,
                      )
                    }
                  />
                </AnimatedEntry>
              ),
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function AchievementsSkeleton({
  animationKey,
}: {
  animationKey: number;
}) {
  return (
    <AnimatedEntry
      delay={240}
      triggerKey={animationKey}
    >
      <View style={styles.skeletonGrid}>
        {Array.from({
          length: 9,
        }).map((_, index) => (
          <View
            key={index}
            style={styles.skeletonCard}
          >
            <View
              style={styles.skeletonMedal}
            />

            <View
              style={styles.skeletonName}
            />
          </View>
        ))}
      </View>
    </AnimatedEntry>
  );
}