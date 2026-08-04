// src/features/favorites/screens/FavoritesScreen.tsx

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
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import IconSearch from '../../../assets/icons/ux/home/IconSearch.svg';
import { IconFavoritos } from '../../../assets/icons/IconFavoritos';
import { AppHeader } from '../../../components/navigation/AppHeader';
import {
  AnimatedEntry,
  AnimatedPop,
  AppInput,
  AppText,
} from '../../../components/ui';
import { colors } from '../../../constants/colors';
import { ROUTES } from '../../../constants/routes';
import { getCurrentUser } from '../../user/services/userService';
import {
  getFavorites,
  removeFavorite,
} from '../services/favoritesService';
import type { FavoriteItem } from '../types';

import { styles } from './FavoritesScreen.styles';

export function FavoritesScreen() {
  const navigation = useNavigation<any>();

  const [favorites, setFavorites] =
    useState<FavoriteItem[]>([]);

  const [searchText, setSearchText] =
    useState('');

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

  const [
    actionErrorMessage,
    setActionErrorMessage,
  ] = useState('');

  const [removingIds, setRemovingIds] =
    useState<Set<string>>(new Set());

  const [animationKey, setAnimationKey] =
    useState(0);

  const loadFavorites = useCallback(
    async (refresh = false) => {
      try {
        if (refresh) {
          setIsRefreshing(true);
        } else {
          setIsLoading(true);
        }

        setErrorMessage('');
        setActionErrorMessage('');

        const [
          favoritesResult,
          userResult,
        ] = await Promise.allSettled([
          getFavorites(),
          getCurrentUser(),
        ]);

        if (
          userResult.status === 'fulfilled' &&
          userResult.value
        ) {
          const username =
            userResult.value.usuario
              ?.username
              ?.trim();

          const currentStreak = Number(
            userResult.value.racha,
          );

          setUserName(
            username || 'Usuario',
          );

          setStreak(
            Number.isFinite(currentStreak)
              ? Math.max(
                  0,
                  Math.trunc(currentStreak),
                )
              : 0,
          );
        } else {
          if (
            userResult.status ===
            'rejected'
          ) {
            console.error(
              'Error al obtener el usuario desde Favoritos:',
              userResult.reason,
            );
          } else {
            console.error(
              'getCurrentUser devolvió null desde Favoritos.',
            );
          }

          setUserName('Usuario');
          setStreak(0);
        }

        if (
          favoritesResult.status ===
          'fulfilled'
        ) {
          setFavorites(
            favoritesResult.value,
          );
        } else {
          console.error(
            'Error al obtener favoritos:',
            favoritesResult.reason,
          );

          throw favoritesResult.reason;
        }
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'No se pudieron obtener los favoritos.',
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
      setAnimationKey(
        (value) => value + 1,
      );

      void loadFavorites();
    }, [loadFavorites]),
  );

  const filteredFavorites =
    useMemo(() => {
      const search =
        searchText
          .trim()
          .toLowerCase();

      if (!search) {
        return favorites;
      }

      return favorites.filter(
        (favorite) =>
          `${
            favorite.title
          } ${
            favorite.description ?? ''
          }`
            .toLowerCase()
            .includes(search),
      );
    }, [
      favorites,
      searchText,
    ]);

  const handleFavoritePress = (
    favorite: FavoriteItem,
  ) => {
    navigation.navigate(
      ROUTES.EXERCISE,
      {
        source: 'favorites',

        exerciseId:
          favorite.exerciseId,

        contentKey:
          `favorite-theory-${favorite.exerciseId}`,

        contentType: 'theory',

        moduleId:
          favorite.moduleId,

        moduleName:
          favorite.moduleName,

        lessonId:
          favorite.lessonId,

        lessonTitle:
          favorite.lessonTitle,

        exerciseTitle:
          favorite.title,

        contenidoMultimedia:
          favorite.videoUrl,

        options: [],

        contentIndex: 0,
        contentTotal: 1,
      },
    );
  };

  const handleRemoveFavorite =
    async (
      favorite: FavoriteItem,
    ) => {
      if (
        removingIds.has(
          favorite.exerciseId,
        )
      ) {
        return;
      }

      setActionErrorMessage('');

      setRemovingIds(
        (current) => {
          const next =
            new Set(current);

          next.add(
            favorite.exerciseId,
          );

          return next;
        },
      );

      try {
        await removeFavorite(
          favorite.exerciseId,
        );

        setFavorites(
          (current) =>
            current.filter(
              (item) =>
                item.exerciseId !==
                favorite.exerciseId,
            ),
        );
      } catch (error) {
        setActionErrorMessage(
          error instanceof Error
            ? error.message
            : 'No se pudo eliminar de favoritos.',
        );
      } finally {
        setRemovingIds(
          (current) => {
            const next =
              new Set(current);

            next.delete(
              favorite.exerciseId,
            );

            return next;
          },
        );
      }
    };

  const handleExploreModules = () => {
    const tabsNavigation =
      navigation.getParent();

    if (tabsNavigation) {
      tabsNavigation.navigate(
        ROUTES.HOME,
      );

      return;
    }

    navigation.navigate(
      ROUTES.HOME_TABS,
    );
  };

  const handleStreakPress = () => {
    const tabsNavigation =
      navigation.getParent();

    if (tabsNavigation) {
      tabsNavigation.navigate(
        ROUTES.PROFILE_TAB,
      );

      return;
    }

    navigation.navigate(
      ROUTES.HOME_TABS,
    );
  };

  const handleAchievementsPress =
    () => {
      const tabsNavigation =
        navigation.getParent();

      if (tabsNavigation) {
        tabsNavigation.navigate(
          ROUTES.PROFILE_TAB,
          {
            screen:
              ROUTES.ACHIEVEMENTS,
          },
        );

        return;
      }

      navigation.navigate(
        ROUTES.ACHIEVEMENTS,
      );
    };

  const renderHeader = () => (
    <View
      style={
        styles.headerSection
      }
    >
      <AnimatedEntry
        delay={150}
        triggerKey={animationKey}
      >
        <AppText
          variant="title"
          style={styles.mainTitle}
        >
          Favoritos
        </AppText>

        <AppText
          variant="body"
          style={styles.subtitle}
        >
          Guardá tus señas y volvé a
          practicarlas cuando quieras.
        </AppText>
      </AnimatedEntry>

      <AnimatedEntry
        delay={220}
        triggerKey={animationKey}
      >
        <View
          style={styles.summaryCard}
        >
          <View
            style={
              styles.summaryIconBox
            }
          >
            <MaterialIcons
              name="favorite"
              size={38}
              color={
                colors.secondary
              }
            />
          </View>

          <View
            style={
              styles.summaryContent
            }
          >
            <AppText
              style={
                styles.summaryTitle
              }
            >
              Tu espacio de repaso
            </AppText>

            <AppText
              style={
                styles.summaryText
              }
            >
              {isLoading
                ? 'Cargando tus señas guardadas...'
                : favorites.length === 1
                  ? 'Tenés 1 seña guardada.'
                  : `Tenés ${favorites.length} señas guardadas.`}
            </AppText>
          </View>
        </View>
      </AnimatedEntry>

      <AnimatedEntry
        delay={290}
        triggerKey={animationKey}
      >
        <AppInput
          value={searchText}
          onChangeText={
            setSearchText
          }
          placeholder="Buscar favorito"
          leftIcon={
            <IconSearch
              width={28}
              height={24}
            />
          }
          inputContainerStyle={
            styles.searchInputContainer
          }
          inputStyle={
            styles.searchInput
          }
          returnKeyType="search"
        />
      </AnimatedEntry>

      {actionErrorMessage ? (
        <AnimatedEntry
          delay={330}
          triggerKey={
            animationKey
          }
        >
          <View
            style={
              styles.actionErrorCard
            }
          >
            <MaterialIcons
              name="error-outline"
              size={20}
              color={colors.error}
            />

            <AppText
              style={
                styles.actionErrorText
              }
            >
              {actionErrorMessage}
            </AppText>
          </View>
        </AnimatedEntry>
      ) : null}

      {!isLoading &&
      !errorMessage &&
      favorites.length > 0 ? (
        <AnimatedEntry
          delay={340}
          triggerKey={
            animationKey
          }
        >
          <View
            style={
              styles.listTitleRow
            }
          >
            <AppText
              style={
                styles.listTitle
              }
            >
              Para repasar
            </AppText>

            <AppText
              style={
                styles.resultCount
              }
            >
              {
                filteredFavorites.length
              }{' '}
              {filteredFavorites.length ===
              1
                ? 'resultado'
                : 'resultados'}
            </AppText>
          </View>
        </AnimatedEntry>
      ) : null}
    </View>
  );

  const renderFavorite = ({
    item,
    index,
  }: {
    item: FavoriteItem;
    index: number;
  }) => {
    const isRemoving =
      removingIds.has(
        item.exerciseId,
      );

    return (
      <AnimatedEntry
        delay={
          390 + index * 80
        }
        triggerKey={
          animationKey
        }
        style={
          styles.favoriteAnimationWrapper
        }
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Repasar ${item.title}`}
          onPress={() =>
            handleFavoritePress(item)
          }
          style={({
            pressed,
          }) => [
            styles.favoriteCard,

            pressed &&
              styles.favoriteCardPressed,
          ]}
        >
          <AnimatedPop
            delay={
              470 + index * 80
            }
            triggerKey={
              animationKey
            }
          >
            <View
              style={
                styles.favoriteIconBox
              }
            >
              <MaterialIcons
                name="favorite"
                size={27}
                color={
                  colors.secondary
                }
              />
            </View>
          </AnimatedPop>

          <View
            style={
              styles.favoriteContent
            }
          >
            <AppText
              numberOfLines={1}
              ellipsizeMode="tail"
              style={
                styles.favoriteTitle
              }
            >
              {item.title}
            </AppText>

            <AppText
              numberOfLines={2}
              ellipsizeMode="tail"
              style={
                styles.favoriteDescription
              }
            >
              {item.description ||
                'Tocá para volver a practicar esta seña.'}
            </AppText>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Eliminar ${item.title} de favoritos`}
            disabled={
              isRemoving
            }
            onPress={(event) => {
              event.stopPropagation();

              void handleRemoveFavorite(
                item,
              );
            }}
            style={({
              pressed,
            }) => [
              styles.removeButton,

              pressed &&
                styles.pressed,
            ]}
          >
            {isRemoving ? (
              <ActivityIndicator
                size="small"
                color={
                  colors.primary
                }
              />
            ) : (
              <MaterialIcons
                name="favorite-border"
                size={25}
                color={
                  colors.primary
                }
              />
            )}
          </Pressable>
        </Pressable>
      </AnimatedEntry>
    );
  };

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View>
          <FavoriteSkeletonCard />
          <FavoriteSkeletonCard />
          <FavoriteSkeletonCard />
        </View>
      );
    }

    if (errorMessage) {
      return (
        <AnimatedEntry
          delay={390}
          triggerKey={
            animationKey
          }
        >
          <View
            style={
              styles.feedbackContainer
            }
          >
            <MaterialIcons
              name="cloud-off"
              size={48}
              color={
                colors.primary
              }
            />

            <AppText
              style={
                styles.feedbackText
              }
            >
              {errorMessage}
            </AppText>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Reintentar carga de favoritos"
              onPress={() =>
                void loadFavorites()
              }
              style={({
                pressed,
              }) => [
                styles.retryButton,

                pressed &&
                  styles.pressed,
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
      );
    }

    const hasSearch =
      searchText.trim().length >
      0;

    return (
      <AnimatedEntry
        delay={390}
        triggerKey={
          animationKey
        }
      >
        <View
          style={
            styles.emptyContainer
          }
        >
          <AnimatedPop
            delay={470}
            triggerKey={
              animationKey
            }
          >
            <IconFavoritos
              width={96}
              height={96}
            />
          </AnimatedPop>

          <AppText
            style={
              styles.emptyTitle
            }
          >
            {hasSearch
              ? 'No encontramos ese favorito'
              : 'Tu espacio de repaso está vacío'}
          </AppText>

          <AppText
            style={
              styles.emptyDescription
            }
          >
            {hasSearch
              ? 'Probá con otra palabra o borrá la búsqueda.'
              : 'Marcá el corazón de una seña para encontrarla rápidamente acá.'}
          </AppText>

          {!hasSearch ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Explorar módulos"
              onPress={
                handleExploreModules
              }
              style={({
                pressed,
              }) => [
                styles.exploreButton,

                pressed &&
                  styles.pressed,
              ]}
            >
              <AppText
                style={
                  styles.exploreButtonText
                }
              >
                Explorar módulos
              </AppText>
            </Pressable>
          ) : null}
        </View>
      </AnimatedEntry>
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
        animationKey={
          animationKey
        }
        onStreakPress={
          handleStreakPress
        }
        onAchievementsPress={
          handleAchievementsPress
        }
      />

      <FlatList
        data={
          isLoading ||
          errorMessage
            ? []
            : filteredFavorites
        }
        keyExtractor={(item) =>
          item.favoriteId
        }
        renderItem={
          renderFavorite
        }
        showsVerticalScrollIndicator={
          false
        }
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={
          styles.contentContainer
        }
        ListHeaderComponent={
          renderHeader
        }
        ListEmptyComponent={
          renderEmpty
        }
        refreshControl={
          <RefreshControl
            refreshing={
              isRefreshing
            }
            onRefresh={() =>
              void loadFavorites(true)
            }
            tintColor={
              colors.primary
            }
          />
        }
      />
    </SafeAreaView>
  );
}

function FavoriteSkeletonCard() {
  const opacity =
    useSharedValue(0.45);

  useEffect(() => {
    opacity.value =
      withRepeat(
        withTiming(1, {
          duration: 780,
          easing:
            Easing.inOut(
              Easing.ease,
            ),
        }),
        -1,
        true,
      );
  }, [opacity]);

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
        style={
          styles.skeletonIcon
        }
      />

      <View
        style={
          styles.skeletonContent
        }
      >
        <View
          style={
            styles.skeletonTitle
          }
        />

        <View
          style={
            styles.skeletonDescription
          }
        />
      </View>
    </Animated.View>
  );
}