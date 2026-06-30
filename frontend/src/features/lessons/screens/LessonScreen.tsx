// src/features/lessons/screens/LessonScreen.tsx

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import IconStatusCompleted from '../../../assets/icons/ux/status/IconStatusCompleted.svg';
import IconStatusInProgress from '../../../assets/icons/ux/status/IconStatusInProgress.svg';
import IconStatusNotStarted from '../../../assets/icons/ux/status/IconStatusNotStarted.svg';
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
import type { LessonExercise } from '../types';

import { styles } from './LessonScreen.styles';

type LessonRouteProp = RouteProp<RootStackParamList, typeof ROUTES.LESSON>;

export function LessonScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<LessonRouteProp>();

  const [animationKey, setAnimationKey] = useState(0);

  const { moduleId, moduleName, lessonId, lessonTitle } = route.params;

  useFocusEffect(
    useCallback(() => {
      setAnimationKey((value) => value + 1);
    }, [])
  );

  const exercises = useMemo(
    () => createTemporaryExercises(lessonTitle),
    [lessonTitle]
  );

  const completedCount = exercises.filter(
    (exercise) => exercise.status === 'completed'
  ).length;

  const progress =
    exercises.length > 0 ? (completedCount / exercises.length) * 100 : 0;

  const handleExercisePress = (exercise: LessonExercise) => {
    navigation.navigate(ROUTES.EXERCISE, {
      exerciseId: exercise.id,
      moduleId,
      lessonId,
      exerciseTitle: exercise.title.replace('\n', ' '),
    });
  };

  const renderStatusIcon = (status: LearningStatus) => {
    switch (status) {
      case 'completed':
        return <IconStatusCompleted width={34} height={34} />;

      case 'inProgress':
        return <IconStatusInProgress width={34} height={34} />;

      case 'notStarted':
      default:
        return <IconStatusNotStarted width={34} height={34} />;
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
      style={styles.exerciseAnimationWrapper}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Entrar a ${item.title.replace('\n', ' ')}`}
        onPress={() => handleExercisePress(item)}
        style={({ pressed }) => [
          styles.exerciseCard,
          pressed && styles.exerciseCardPressed,
        ]}
      >
        <AppText style={styles.exerciseTitle}>{item.title}</AppText>

        <AnimatedPop delay={480 + index * 70} triggerKey={animationKey}>
          {renderStatusIcon(item.status)}
        </AnimatedPop>
      </Pressable>
    </AnimatedEntry>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <AnimatedEntry delay={80} triggerKey={animationKey}>
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Volver"
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [
              styles.headerCircleButton,
              pressed && styles.pressed,
            ]}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={34}
              color={colors.primary}
            />
          </Pressable>

          <View style={styles.headerActions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Ver logros"
              style={({ pressed }) => [
                styles.headerIconButton,
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
              style={({ pressed }) => [
                styles.headerIconButton,
                pressed && styles.pressed,
              ]}
            >
              <MaterialIcons
                name="notifications-none"
                size={25}
                color={colors.textLight}
              />
            </Pressable>
          </View>
        </View>
      </AnimatedEntry>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={renderExerciseCard}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.exerciseRow}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <>
            <AnimatedEntry delay={150} triggerKey={animationKey}>
              <View style={styles.breadcrumbContainer}>
                <AppText style={styles.breadcrumbText}>{moduleName}</AppText>
                <AppText style={styles.breadcrumbSeparator}>·</AppText>
                <AppText style={styles.breadcrumbCurrent}>
                  {lessonTitle}
                </AppText>
              </View>
            </AnimatedEntry>

            <AnimatedEntry delay={220} triggerKey={animationKey}>
              <View style={styles.summaryCard}>
                <View style={styles.lessonIconBox}>
                  <AppText style={styles.lessonIconText}>
                    {getLessonIconText(lessonTitle)}
                  </AppText>
                  <View style={styles.lessonIconLine} />
                </View>

                <View style={styles.summaryContent}>
                  <AppText style={styles.summaryTitle}>{lessonTitle}</AppText>

                  <AnimatedProgressBar
                    progress={progress}
                    triggerKey={animationKey}
                    delay={380}
                    duration={850}
                    trackStyle={styles.summaryProgressTrack}
                    fillStyle={styles.summaryProgressFill}
                  />

                  <AppText style={styles.summaryProgressLabel}>
                    {completedCount} de {exercises.length} completadas
                  </AppText>
                </View>
              </View>
            </AnimatedEntry>

            <AnimatedEntry delay={300} triggerKey={animationKey}>
              <AppText style={styles.sectionTitle}>Lecciones</AppText>
            </AnimatedEntry>
          </>
        }
      />
    </SafeAreaView>
  );
}

function createTemporaryExercises(lessonTitle: string): LessonExercise[] {
  const normalizedTitle = lessonTitle.toLowerCase();

  if (normalizedTitle.includes('número')) {
    return Array.from({ length: 28 }, (_, index) => ({
      id: `number-${index}`,
      title: `Número\n${index}`,
      status: getTemporaryExerciseStatus(index),
    }));
  }

  if (normalizedTitle.includes('alfabeto')) {
    const letters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

    return letters.map((letter, index) => ({
      id: `letter-${letter}`,
      title: `Letra\n${letter}`,
      status: getTemporaryExerciseStatus(index),
    }));
  }

  if (normalizedTitle.includes('día')) {
    const days = [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ];

    return days.map((day, index) => ({
      id: `day-${index}`,
      title: day,
      status: getTemporaryExerciseStatus(index),
    }));
  }

  if (normalizedTitle.includes('sentimiento')) {
    const feelings = [
      'Feliz',
      'Triste',
      'Enojado',
      'Cansado',
      'Asustado',
      'Sorprendido',
      'Calmo',
      'Nervioso',
    ];

    return feelings.map((feeling, index) => ({
      id: `feeling-${index}`,
      title: feeling,
      status: getTemporaryExerciseStatus(index),
    }));
  }

  return Array.from({ length: 12 }, (_, index) => ({
    id: `exercise-${index + 1}`,
    title: `Ejercicio\n${index + 1}`,
    status: getTemporaryExerciseStatus(index),
  }));
}

function getTemporaryExerciseStatus(index: number): LearningStatus {
  if (index === 0 || index === 1) {
    return 'completed';
  }

  if (index === 2) {
    return 'inProgress';
  }

  return 'notStarted';
}

function getLessonIconText(lessonTitle: string) {
  const normalizedTitle = lessonTitle.toLowerCase();

  if (normalizedTitle.includes('número')) {
    return '123';
  }

  if (normalizedTitle.includes('alfabeto')) {
    return 'Aa';
  }

  if (normalizedTitle.includes('día')) {
    return 'Lu';
  }

  if (normalizedTitle.includes('sentimiento')) {
    return ':)';
  }

  return 'Aa';
}