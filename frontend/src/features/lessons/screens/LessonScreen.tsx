// src/features/lessons/screens/LessonScreen.tsx

import {
  useFocusEffect,
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import IconStatusCompleted from '../../../assets/icons/ux/status/IconStatusCompleted.svg';
import IconStatusInProgress from '../../../assets/icons/ux/status/IconStatusInProgress.svg';
import IconStatusNotStarted from '../../../assets/icons/ux/status/IconStatusNotStarted.svg';
import { AppHeader } from '../../../components/navigation/AppHeader';
import {
  AnimatedEntry,
  AnimatedPop,
  AnimatedProgressBar,
  AppText,
} from '../../../components/ui';
import { colors } from '../../../constants/colors';
import {
  ROUTES,
  type LearningStatus,
  type RootStackParamList,
} from '../../../constants/routes';
import { getLessonExercises } from '../services/lessonsService';
import type { LessonExercise } from '../types';

import {
  LESSON_GRID,
  styles,
} from './LessonScreen.styles';

type LessonRouteProp = RouteProp<
  RootStackParamList,
  typeof ROUTES.LESSON
>;

export function LessonScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<LessonRouteProp>();

  const { width: screenWidth } = useWindowDimensions();

  const [animationKey, setAnimationKey] = useState(0);
  const [exercises, setExercises] = useState<
    LessonExercise[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    moduleId,
    moduleName,
    moduleDescription = '',
    moduleLessons = [],
    lessonId,
    lessonTitle,
    moduleProgress = 0,
  } = route.params;

  const numColumns = useMemo(() => {
    if (screenWidth >= 1200) {
      return 6;
    }

    if (screenWidth >= 900) {
      return 5;
    }

    if (screenWidth >= 600) {
      return 4;
    }

    return 3;
  }, [screenWidth]);

  const exerciseCardWidth = useMemo(() => {
    const totalHorizontalPadding =
      LESSON_GRID.horizontalPadding * 2;

    const totalGaps =
      LESSON_GRID.gap * (numColumns - 1);

    const availableWidth =
      screenWidth -
      totalHorizontalPadding -
      totalGaps;

    return Math.max(
      0,
      availableWidth / numColumns
    );
  }, [numColumns, screenWidth]);

  const loadExercises = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const lessonExercises =
        await getLessonExercises({
          moduleId,
          lessonId,
        });

      setExercises(lessonExercises);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'No se pudieron obtener los ejercicios de la lección';

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, [lessonId, moduleId]);

  useFocusEffect(
    useCallback(() => {
      setAnimationKey((value) => value + 1);
      void loadExercises();
    }, [loadExercises])
  );

  const completedCount = useMemo(
    () =>
      exercises.filter(
        (exercise) =>
          exercise.status === 'completed'
      ).length,
    [exercises]
  );

  const progress =
    exercises.length > 0
      ? (completedCount / exercises.length) * 100
      : 0;

  const handleBackFallback = () => {
    if (moduleLessons.length > 0) {
      navigation.replace(ROUTES.MODULE_DETAIL, {
        moduleId,
        moduleName,
        moduleDescription,
        moduleProgress,
        lessons: moduleLessons,
      });

      return;
    }

    navigation.replace(ROUTES.HOME_TABS);
  };

  const handleExercisePress = (
    exercise: LessonExercise
  ) => {
    navigation.navigate(ROUTES.EXERCISE, {
      exerciseId: exercise.id,
      moduleId,
      moduleName,
      lessonId,
      lessonTitle,
      exerciseTitle: exercise.title,
      contenidoMultimedia:
        exercise.contenidoMultimedia,
    });
  };

  const renderStatusIcon = (
    status: LearningStatus
  ) => {
    switch (status) {
      case 'completed':
        return (
          <IconStatusCompleted
            width={34}
            height={34}
          />
        );

      case 'inProgress':
        return (
          <IconStatusInProgress
            width={34}
            height={34}
          />
        );

      case 'notStarted':
      default:
        return (
          <IconStatusNotStarted
            width={34}
            height={34}
          />
        );
    }
  };

  const renderExerciseCard = ({
    item,
    index,
  }: {
    item: LessonExercise;
    index: number;
  }) => (
    <AnimatedEntry
      delay={360 + index * 70}
      triggerKey={animationKey}
      style={{ width: exerciseCardWidth }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Entrar a ${item.title}`}
        onPress={() => handleExercisePress(item)}
        style={({ pressed }) => [
          styles.exerciseCard,
          pressed && styles.exerciseCardPressed,
        ]}
      >
        <AppText style={styles.exerciseTitle}>
          {item.title}
        </AppText>

        <AnimatedPop
          delay={480 + index * 70}
          triggerKey={animationKey}
        >
          {renderStatusIcon(item.status)}
        </AnimatedPop>
      </Pressable>
    </AnimatedEntry>
  );

  const renderListHeader = () => (
    <>
      <AnimatedEntry
        delay={150}
        triggerKey={animationKey}
      >
        <View style={styles.breadcrumbContainer}>
          <AppText style={styles.breadcrumbText}>
            {moduleName}
          </AppText>

          <AppText
            style={styles.breadcrumbSeparator}
          >
            ·
          </AppText>

          <AppText style={styles.breadcrumbCurrent}>
            {lessonTitle}
          </AppText>
        </View>
      </AnimatedEntry>

      <AnimatedEntry
        delay={220}
        triggerKey={animationKey}
      >
        <View style={styles.summaryCard}>
          <View style={styles.lessonIconBox}>
            <AppText style={styles.lessonIconText}>
              {getLessonIconText(lessonTitle)}
            </AppText>

            <View style={styles.lessonIconLine} />
          </View>

          <View style={styles.summaryContent}>
            <AppText style={styles.summaryTitle}>
              {lessonTitle}
            </AppText>

            <AnimatedProgressBar
              progress={progress}
              triggerKey={animationKey}
              delay={380}
              duration={850}
              trackStyle={
                styles.summaryProgressTrack
              }
              fillStyle={
                styles.summaryProgressFill
              }
            />

            <AppText
              style={styles.summaryProgressLabel}
            >
              {completedCount} de {exercises.length}{' '}
              completadas
            </AppText>
          </View>
        </View>
      </AnimatedEntry>

      <AnimatedEntry
        delay={300}
        triggerKey={animationKey}
      >
        <AppText style={styles.sectionTitle}>
          Lecciones
        </AppText>
      </AnimatedEntry>
    </>
  );

  const renderListEmpty = () => {
    if (isLoading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator
            color={colors.primary}
            size="large"
          />

          <AppText style={styles.emptyText}>
            Cargando ejercicios...
          </AppText>
        </View>
      );
    }

    if (errorMessage) {
      return (
        <View style={styles.emptyContainer}>
          <AppText style={styles.errorText}>
            {errorMessage}
          </AppText>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Reintentar"
            onPress={loadExercises}
            style={({ pressed }) => [
              styles.retryButton,
              pressed && styles.pressed,
            ]}
          >
            <AppText style={styles.retryButtonText}>
              Reintentar
            </AppText>
          </Pressable>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <AppText style={styles.emptyText}>
          Todavía no hay ejercicios para esta
          lección.
        </AppText>
      </View>
    );
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={styles.container}
    >
      <AppHeader
        variant="back"
        notificationCount={1}
        animationKey={animationKey}
        onBackFallback={handleBackFallback}
      />

      <FlatList
        key={`lesson-grid-${numColumns}`}
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={renderExerciseCard}
        numColumns={numColumns}
        extraData={exerciseCardWidth}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.exerciseRow}
        contentContainerStyle={
          styles.contentContainer
        }
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderListEmpty}
      />
    </SafeAreaView>
  );
}

function getLessonIconText(lessonTitle: string) {
  const normalizedTitle =
    lessonTitle.toLowerCase();

  if (normalizedTitle.includes('número')) {
    return '123';
  }

  if (normalizedTitle.includes('alfabeto')) {
    return 'Aa';
  }

  if (normalizedTitle.includes('día')) {
    return 'Lu';
  }

  if (
    normalizedTitle.includes('sentimiento')
  ) {
    return ':)';
  }

  return 'Aa';
}