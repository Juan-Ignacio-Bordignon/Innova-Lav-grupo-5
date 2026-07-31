// src/features/exercises/screens/ExerciseScreen.tsx

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEvent } from 'expo';
import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  useVideoPlayer,
  VideoView,
  type VideoSource,
} from 'expo-video';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../../../components/navigation/AppHeader';
import {
  AppButton,
  AppText,
} from '../../../components/ui';
import { colors } from '../../../constants/colors';
import {
  ROUTES,
  type ExerciseExpectedAnswer,
  type RootStackParamList,
} from '../../../constants/routes';

import {
  addFavorite,
  isTheoryFavorite,
  removeFavorite,
} from '../../favorites/services/favoritesService';
import { getLessonExercises } from '../../lessons/services/lessonsService';
import type { LessonExercise } from '../../lessons/types';
import {
  resolveExercise,
  saveTheoryProgress,
} from '../../progress/services/progressService';
import type { ExerciseResolution } from '../../progress/types';

import { PhraseBuilderExercise } from '../components/PhraseBuilderExercise';
import { SequentialVideoPlayer } from '../components/SequentialVideoPlayer';
import { VideoOptionExercise } from '../components/VideoOptionExercise';
import type { ExerciseAnswerValue } from '../types';
import { resolveVideoUrl } from '../utils';

import { styles } from './ExerciseScreen.styles';

type ExerciseRouteProp = RouteProp<
  RootStackParamList,
  typeof ROUTES.EXERCISE
>;

export function ExerciseScreen() {
  const navigation =
    useNavigation<any>();

  const route =
    useRoute<ExerciseRouteProp>();

  const {
    source = 'lesson',

    exerciseId,
    contentKey,
    contentType = 'unknown',

    moduleId,
    moduleName = 'Módulo',

    lessonId,
    lessonTitle = 'Lección',

    exerciseTitle = 'Contenido',
    contenidoMultimedia,

    options = [],
    expectedAnswer,

    contentIndex = 0,
    contentTotal = 1,
  } = route.params;

  const [
    isMovingNext,
    setIsMovingNext,
  ] = useState(false);

  const [
    navigationError,
    setNavigationError,
  ] = useState('');

  const [
    favoriteError,
    setFavoriteError,
  ] = useState('');

  const [
    isFavorite,
    setIsFavorite,
  ] = useState(false);

  const [
    isFavoriteLoading,
    setIsFavoriteLoading,
  ] = useState(
    contentType === 'theory',
  );

  const isTheory =
    contentType === 'theory';

  const isFavoritePreview =
    source === 'favorites';

  const multimediaItems =
    useMemo(
      () =>
        normalizeMultimediaParam(
          contenidoMultimedia,
        ),
      [contenidoMultimedia],
    );

  const multimediaIdentity =
    multimediaItems.join('|');

  /**
   * La longitud correcta se obtiene principalmente
   * de respuestaEsperada.
   *
   * En el ejemplo:
   *
   * expectedAnswer = ["C", "A", "D", "A"]
   * options = ["D", "A", "C", "A", "B", "E"]
   *
   * El resultado será 4 y no 6.
   */
  const orderAnswerLength =
    useMemo(
      () =>
        getOrderAnswerLength({
          expectedAnswer,
          multimediaLength:
            multimediaItems.length,
          optionsLength:
            options.length,
        }),
      [
        expectedAnswer,
        multimediaItems.length,
        options.length,
      ],
    );

  useEffect(() => {
    let isMounted = true;

    if (!isTheory) {
      setIsFavorite(false);
      setIsFavoriteLoading(false);
      setFavoriteError('');

      return () => {
        isMounted = false;
      };
    }

    const loadFavoriteState =
      async () => {
        try {
          setIsFavoriteLoading(true);
          setFavoriteError('');

          const favoriteState =
            await isTheoryFavorite(
              exerciseId,
            );

          if (isMounted) {
            setIsFavorite(
              favoriteState,
            );
          }
        } catch (error) {
          if (!isMounted) {
            return;
          }

          setFavoriteError(
            error instanceof Error
              ? error.message
              : 'No se pudo consultar el favorito.',
          );
        } finally {
          if (isMounted) {
            setIsFavoriteLoading(
              false,
            );
          }
        }
      };

    void loadFavoriteState();

    return () => {
      isMounted = false;
    };
  }, [
    exerciseId,
    isTheory,
  ]);

  const safeContentTotal =
    Math.max(
      contentTotal,
      1,
    );

  const currentContentNumber =
    Math.min(
      contentIndex + 1,
      safeContentTotal,
    );

  const progressPercentage =
    (
      currentContentNumber /
      safeContentTotal
    ) * 100;

  const hasNextContent =
    currentContentNumber <
    safeContentTotal;

  const continueButtonTitle =
    hasNextContent
      ? 'Siguiente lección'
      : 'Finalizar lección';

  const handleFavoritePress =
    async () => {
      if (
        !isTheory ||
        isFavoriteLoading
      ) {
        return;
      }

      try {
        setIsFavoriteLoading(true);
        setFavoriteError('');

        if (isFavorite) {
          await removeFavorite(
            exerciseId,
          );

          setIsFavorite(false);
        } else {
          await addFavorite(
            exerciseId,
          );

          setIsFavorite(true);
        }
      } catch (error) {
        setFavoriteError(
          error instanceof Error
            ? error.message
            : isFavorite
              ? 'No se pudo quitar de favoritos.'
              : 'No se pudo agregar a favoritos.',
        );
      } finally {
        setIsFavoriteLoading(false);
      }
    };

  const navigateToNextContent =
    async () => {
      if (
        !moduleId ||
        !lessonId
      ) {
        navigation.goBack();
        return;
      }

      const lessonContents =
        await getLessonExercises({
          moduleId,
          lessonId,
        });

      const currentIndexByKey =
        contentKey
          ? lessonContents.findIndex(
              (content) =>
                content.key ===
                contentKey,
            )
          : -1;

      const resolvedCurrentIndex =
        currentIndexByKey >= 0
          ? currentIndexByKey
          : contentIndex;

      const nextContent =
        lessonContents[
          resolvedCurrentIndex + 1
        ];

      if (!nextContent) {
        navigation.goBack();
        return;
      }

      navigation.replace(
        ROUTES.EXERCISE,
        createExerciseRouteParams({
          exercise:
            nextContent,

          moduleId,
          moduleName,

          lessonId,
          lessonTitle,

          contentIndex:
            resolvedCurrentIndex + 1,

          contentTotal:
            lessonContents.length,
        }),
      );
    };

  const handleTheoryContinue =
    async () => {
      if (
        isFavoritePreview ||
        isMovingNext
      ) {
        return;
      }

      if (
        !moduleId ||
        !lessonId
      ) {
        setNavigationError(
          'No se pudo identificar el módulo o la lección actual.',
        );

        return;
      }

      try {
        setIsMovingNext(true);
        setNavigationError('');

        await saveTheoryProgress({
          moduleId,
          lessonId,
          theoryId:
            exerciseId,
        });

        await navigateToNextContent();
      } catch (error) {
        setNavigationError(
          error instanceof Error
            ? error.message
            : 'No se pudo guardar el progreso de la teoría.',
        );
      } finally {
        setIsMovingNext(false);
      }
    };

  const handleExerciseContinue =
    async () => {
      if (isMovingNext) {
        return;
      }

      try {
        setIsMovingNext(true);
        setNavigationError('');

        await navigateToNextContent();
      } catch (error) {
        setNavigationError(
          error instanceof Error
            ? error.message
            : 'No se pudo abrir el siguiente contenido.',
        );
      } finally {
        setIsMovingNext(false);
      }
    };

  const handleSubmitExerciseAnswer =
    async (
      answer:
        | ExerciseAnswerValue
        | ExerciseAnswerValue[],
    ): Promise<ExerciseResolution> => {
      if (
        !moduleId ||
        !lessonId
      ) {
        throw new Error(
          'No se pudo identificar el módulo o la lección actual.',
        );
      }

      return resolveExercise({
        moduleId,
        lessonId,
        exerciseId,
        answer,
      });
    };

  return (
    <SafeAreaView
      edges={['top']}
      style={styles.container}
    >
      <AppHeader
        variant="back"
        notificationCount={1}
      />

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.scrollContent
        }
      >
        <View
          style={
            styles.contentInner
          }
        >
          <View
            style={styles.breadcrumb}
          >
            <AppText
              style={
                styles.breadcrumbText
              }
            >
              {moduleName}
            </AppText>

            <AppText
              style={
                styles.breadcrumbSeparator
              }
            >
              ·
            </AppText>

            <AppText
              style={[
                styles.breadcrumbText,
                styles.breadcrumbCurrent,
              ]}
            >
              {lessonTitle}
            </AppText>
          </View>

          {!isFavoritePreview ? (
            <View
              style={
                styles.progressHeader
              }
            >
              <View
                style={
                  styles.progressLabels
                }
              >
                <AppText
                  numberOfLines={1}
                  style={
                    styles.progressTitle
                  }
                >
                  {lessonTitle}
                </AppText>

                <AppText
                  style={
                    styles.progressCount
                  }
                >
                  {currentContentNumber}{' '}
                  de {safeContentTotal}
                </AppText>
              </View>

              <View
                style={
                  styles.progressTrack
                }
              >
                <View
                  style={[
                    styles.progressFill,
                    {
                      width:
                        `${progressPercentage}%`,
                    },
                  ]}
                />
              </View>
            </View>
          ) : null}

          <AppText
            style={styles.title}
          >
            {exerciseTitle}
          </AppText>

          {contentType ===
          'orderWords' ? (
            <SequentialVideoPlayer
              key={`${
                contentKey ??
                exerciseId
              }-${multimediaIdentity}`}
              multimedia={
                multimediaItems
              }
            />
          ) : (
            <ExerciseVideo
              key={`${
                contentKey ??
                exerciseId
              }-${multimediaIdentity}`}
              multimedia={
                multimediaItems[0]
              }
              showFavoriteButton={
                isTheory
              }
              isFavorite={
                isFavorite
              }
              isFavoriteLoading={
                isFavoriteLoading
              }
              onFavoritePress={
                handleFavoritePress
              }
            />
          )}

          {favoriteError ? (
            <View
              style={
                styles.navigationError
              }
            >
              <MaterialIcons
                name="favorite-border"
                size={21}
                color={colors.error}
              />

              <AppText
                style={
                  styles.navigationErrorText
                }
              >
                {favoriteError}
              </AppText>
            </View>
          ) : null}

          {navigationError &&
          !isFavoritePreview ? (
            <View
              style={
                styles.navigationError
              }
            >
              <MaterialIcons
                name="error-outline"
                size={21}
                color={colors.error}
              />

              <AppText
                style={
                  styles.navigationErrorText
                }
              >
                {navigationError}
              </AppText>
            </View>
          ) : null}

          {isFavoritePreview &&
          isTheory ? (
            <FavoriteReviewPanel
              onBack={() =>
                navigation.goBack()
              }
            />
          ) : null}

          {!(
            isFavoritePreview &&
            isTheory
          ) ? (
            <View
              style={
                styles.interactionContainer
              }
            >
              {contentType ===
              'theory' ? (
                <TheoryExercise
                  buttonTitle={
                    continueButtonTitle
                  }
                  loading={
                    isMovingNext
                  }
                  onContinue={
                    handleTheoryContinue
                  }
                />
              ) : null}

              {contentType ===
              'trueFalse' ? (
                <VideoOptionExercise
                  options={
                    options.length > 0
                      ? options
                      : [true, false]
                  }
                  continueTitle={
                    continueButtonTitle
                  }
                  continueLoading={
                    isMovingNext
                  }
                  onSubmitAnswer={
                    handleSubmitExerciseAnswer
                  }
                  onContinue={
                    handleExerciseContinue
                  }
                />
              ) : null}

              {contentType ===
              'multipleChoice' ? (
                <VideoOptionExercise
                  options={
                    options as ExerciseAnswerValue[]
                  }
                  continueTitle={
                    continueButtonTitle
                  }
                  continueLoading={
                    isMovingNext
                  }
                  onSubmitAnswer={
                    handleSubmitExerciseAnswer
                  }
                  onContinue={
                    handleExerciseContinue
                  }
                />
              ) : null}

              {contentType ===
              'orderWords' ? (
                <PhraseBuilderExercise
                  options={
                    options as ExerciseAnswerValue[]
                  }
                  answerLength={
                    orderAnswerLength
                  }
                  continueTitle={
                    continueButtonTitle
                  }
                  continueLoading={
                    isMovingNext
                  }
                  onSubmitAnswer={
                    handleSubmitExerciseAnswer
                  }
                  onContinue={
                    handleExerciseContinue
                  }
                />
              ) : null}

              {contentType ===
              'unknown' ? (
                <View
                  style={
                    styles.fallbackContainer
                  }
                >
                  <MaterialIcons
                    name="construction"
                    size={38}
                    color={
                      colors.secondary
                    }
                  />

                  <AppText
                    style={
                      styles.fallbackText
                    }
                  >
                    Este tipo de contenido
                    todavía no está
                    disponible.
                  </AppText>

                  <AppButton
                    title="Volver a la lección"
                    onPress={() =>
                      navigation.goBack()
                    }
                  />
                </View>
              ) : null}
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type FavoriteReviewPanelProps = {
  onBack: () => void;
};

function FavoriteReviewPanel({
  onBack,
}: FavoriteReviewPanelProps) {
  return (
    <View
      style={
        favoriteReviewStyles.container
      }
    >
      <View
        style={
          favoriteReviewStyles.card
        }
      >
        <View
          style={
            favoriteReviewStyles.iconContainer
          }
        >
          <MaterialIcons
            name="lightbulb-outline"
            size={27}
            color={
              colors.secondary
            }
          />
        </View>

        <View
          style={
            favoriteReviewStyles.content
          }
        >
          <AppText
            style={
              favoriteReviewStyles.title
            }
          >
            Modo repaso
          </AppText>

          <AppText
            style={
              favoriteReviewStyles.description
            }
          >
            Mirá la seña las veces que
            necesites e intentá repetir
            el movimiento a tu ritmo.
          </AppText>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Volver a favoritos"
        onPress={onBack}
        style={({ pressed }) => [
          favoriteReviewStyles.backButton,

          pressed &&
            favoriteReviewStyles.backButtonPressed,
        ]}
      >
        <MaterialIcons
          name="arrow-back"
          size={22}
          color={colors.primary}
        />

        <AppText
          style={
            favoriteReviewStyles.backButtonText
          }
        >
          Volver a favoritos
        </AppText>
      </Pressable>
    </View>
  );
}

type ExerciseVideoProps = {
  multimedia?: string;
  showFavoriteButton: boolean;
  isFavorite: boolean;
  isFavoriteLoading: boolean;

  onFavoritePress:
    () => void | Promise<void>;
};

function ExerciseVideo({
  multimedia,
  showFavoriteButton,
  isFavorite,
  isFavoriteLoading,
  onFavoritePress,
}: ExerciseVideoProps) {
  const videoUrl =
    resolveVideoUrl(multimedia);

  const videoSource =
    useMemo<VideoSource | null>(
      () =>
        videoUrl
          ? {
              uri: videoUrl,
            }
          : null,
      [videoUrl],
    );

  const player =
    useVideoPlayer(
      videoSource,
      (videoPlayer) => {
        videoPlayer.muted = true;
        videoPlayer.loop = true;
        videoPlayer.play();
      },
    );

  const { status } =
    useEvent(
      player,
      'statusChange',
      {
        status:
          player.status,
      },
    );

  useEffect(() => {
    if (!videoUrl) {
      return;
    }

    player.muted = true;
    player.loop = true;

    if (
      status ===
      'readyToPlay'
    ) {
      player.play();
    }
  }, [
    player,
    status,
    videoUrl,
  ]);

  useEffect(() => {
    if (!videoUrl) {
      return;
    }

    const autoplayTimer =
      setTimeout(() => {
        player.muted = true;
        player.play();
      }, 250);

    return () => {
      clearTimeout(
        autoplayTimer,
      );
    };
  }, [
    player,
    videoUrl,
  ]);

  const handleReplay = () => {
    player.muted = true;
    player.replay();
    player.play();
  };

  return (
    <View style={styles.videoCard}>
      {videoUrl ? (
        <>
          <View
            style={styles.videoZoom}
          >
            <VideoView
              player={player}
              style={styles.video}
              nativeControls={false}
              contentFit="contain"
              playsInline
            />
          </View>

          {showFavoriteButton ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={
                isFavorite
                  ? 'Quitar de favoritos'
                  : 'Agregar a favoritos'
              }
              accessibilityState={{
                selected: isFavorite,
                disabled:
                  isFavoriteLoading,
              }}
              disabled={
                isFavoriteLoading
              }
              onPress={() => {
                void onFavoritePress();
              }}
              style={({ pressed }) => [
                styles.favoriteButton,

                isFavorite &&
                  styles.favoriteButtonActive,

                isFavoriteLoading &&
                  styles.favoriteButtonDisabled,

                pressed &&
                  !isFavoriteLoading &&
                  styles.favoriteButtonPressed,
              ]}
            >
              {isFavoriteLoading ? (
                <ActivityIndicator
                  size="small"
                  color={
                    colors.primary
                  }
                />
              ) : (
                <MaterialIcons
                  name={
                    isFavorite
                      ? 'favorite'
                      : 'favorite-border'
                  }
                  size={27}
                  color={
                    isFavorite
                      ? colors.secondary
                      : colors.primary
                  }
                />
              )}
            </Pressable>
          ) : null}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Repetir video"
            onPress={handleReplay}
            style={({ pressed }) => [
              styles.replayButton,

              pressed &&
                styles.replayButtonPressed,
            ]}
          >
            <MaterialIcons
              name="replay"
              size={27}
              color={
                colors.primary
              }
            />
          </Pressable>
        </>
      ) : (
        <View
          style={
            styles.videoPlaceholder
          }
        >
          <MaterialIcons
            name="videocam-off"
            size={48}
            color={
              colors.textSecondary
            }
          />

          <AppText
            style={
              styles.videoPlaceholderText
            }
          >
            No hay un video disponible
            para este contenido.
          </AppText>
        </View>
      )}
    </View>
  );
}

function normalizeMultimediaParam(
  value?: string | string[],
): string[] {
  const multimediaItems =
    Array.isArray(value)
      ? value
      : typeof value ===
          'string'
        ? [value]
        : [];

  return multimediaItems
    .filter(
      (
        item,
      ): item is string =>
        typeof item ===
        'string',
    )
    .map((item) =>
      item.trim(),
    )
    .filter(Boolean);
}

type GetOrderAnswerLengthParams = {
  expectedAnswer?:
    ExerciseExpectedAnswer;

  multimediaLength: number;
  optionsLength: number;
};

function getOrderAnswerLength({
  expectedAnswer,
  multimediaLength,
  optionsLength,
}: GetOrderAnswerLengthParams) {
  if (
    Array.isArray(
      expectedAnswer,
    ) &&
    expectedAnswer.length > 0
  ) {
    return Math.min(
      expectedAnswer.length,
      optionsLength,
    );
  }

  if (
    multimediaLength > 0
  ) {
    return Math.min(
      multimediaLength,
      optionsLength,
    );
  }

  return optionsLength;
}

function TheoryExercise({
  buttonTitle,
  loading,
  onContinue,
}: {
  buttonTitle: string;
  loading: boolean;

  onContinue:
    () => void | Promise<void>;
}) {
  const [
    learned,
    setLearned,
  ] = useState(false);

  return (
    <View
      style={
        styles.theoryContainer
      }
    >
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{
          checked: learned,
        }}
        disabled={loading}
        onPress={() =>
          setLearned(
            (current) =>
              !current,
          )
        }
        style={({ pressed }) => [
          styles.learnedButton,

          learned &&
            styles.learnedButtonSelected,

          pressed &&
            !loading &&
            styles.learnedButtonPressed,
        ]}
      >
        <MaterialIcons
          name={
            learned
              ? 'check-circle'
              : 'radio-button-unchecked'
          }
          size={28}
          color={
            learned
              ? colors.primary
              : colors.textSecondary
          }
        />

        <AppText
          style={styles.learnedText}
        >
          ¡Listo, lo aprendí!
        </AppText>
      </Pressable>

      <AppButton
        title={buttonTitle}
        disabled={!learned}
        loading={loading}
        onPress={onContinue}
      />
    </View>
  );
}

type CreateExerciseRouteParams = {
  exercise: LessonExercise;

  moduleId: string;
  moduleName: string;

  lessonId: string;
  lessonTitle: string;

  contentIndex: number;
  contentTotal: number;
};

function createExerciseRouteParams({
  exercise,

  moduleId,
  moduleName,

  lessonId,
  lessonTitle,

  contentIndex,
  contentTotal,
}: CreateExerciseRouteParams) {
  return {
    source: 'lesson' as const,

    exerciseId:
      exercise.id,

    contentKey:
      exercise.key,

    contentType:
      exercise.type,

    moduleId,
    moduleName,

    lessonId,
    lessonTitle,

    exerciseTitle:
      exercise.title,

    contenidoMultimedia:
      exercise.contenidoMultimedia,

    options:
      exercise.options,

    expectedAnswer:
      exercise.expectedAnswer,

    contentIndex,
    contentTotal,
  };
}

const favoriteReviewStyles =
  StyleSheet.create({
    container: {
      width: '100%',
      marginTop: 20,
      paddingBottom: 24,
      gap: 14,
    },

    card: {
      width: '100%',
      paddingHorizontal: 18,
      paddingVertical: 17,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      borderWidth: 1,
      borderColor:
        'rgba(25, 70, 80, 0.18)',
      borderRadius: 18,
      backgroundColor:
        'rgba(25, 70, 80, 0.045)',
    },

    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:
        'rgba(218, 177, 109, 0.17)',
    },

    content: {
      flex: 1,
    },

    title: {
      marginBottom: 4,
      fontSize: 16,
      lineHeight: 21,
      fontWeight: '700',
      color:
        colors.primary,
    },

    description: {
      fontSize: 13,
      lineHeight: 20,
      color:
        colors.textSecondary,
    },

    backButton: {
      width: '100%',
      minHeight: 54,
      paddingHorizontal: 18,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 9,
      borderWidth: 1.5,
      borderColor:
        colors.primary,
      borderRadius: 17,
      backgroundColor:
        '#FFFFFF',
    },

    backButtonPressed: {
      opacity: 0.76,
      transform: [
        {
          scale: 0.985,
        },
      ],
    },

    backButtonText: {
      fontSize: 15,
      lineHeight: 21,
      fontWeight: '700',
      color:
        colors.primary,
    },
  });