// src/features/modules/screens/ModuleDetailScreen.tsx

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

import IconModulePhrases from '../../../assets/icons/ux/modules/IconModulePhrases.svg';
import IconModuleWords from '../../../assets/icons/ux/modules/IconModuleWords.svg';
import IconStatusCompleted from '../../../assets/icons/ux/status/IconStatusCompleted.svg';
import IconStatusInProgress from '../../../assets/icons/ux/status/IconStatusInProgress.svg';
import IconStatusNotStarted from '../../../assets/icons/ux/status/IconStatusNotStarted.svg';
import {
  AnimatedEntry,
  AnimatedProgressBar,
  AppText,
  AnimatedPop,
} from '../../../components/ui';
import { colors } from '../../../constants/colors';
import {
  ROUTES,
  type LearningStatus,
  type RootStackParamList,
} from '../../../constants/routes';
import { styles } from './ModuleDetailScreen.styles';

type ModuleDetailRouteProp = RouteProp<
  RootStackParamList,
  typeof ROUTES.MODULE_DETAIL
>;

type LessonItem = {
  id: string;
  title: string;
  status: LearningStatus;
};

export const ModuleDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<ModuleDetailRouteProp>();
  const [animationKey, setAnimationKey] = useState(0);

  const {
    moduleId,
    moduleName,
    moduleDescription,
    moduleProgress,
    lessons,
  } = route.params;

  useFocusEffect(
    useCallback(() => {
      setAnimationKey((value) => value + 1);
    }, [])
  );

  const safeProgress = Math.max(0, Math.min(moduleProgress, 100));
  const isWordsModule = moduleName.toLowerCase().includes('palabra');

  const items: LessonItem[] = useMemo(
    () =>
      lessons.map((lesson, index) => ({
        id: lesson.id,
        title: lesson.title,
        status: lesson.status ?? getTemporaryLessonStatus(index),
      })),
    [lessons]
  );

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

  const renderLessonItem = ({
    item,
    index,
  }: {
    item: LessonItem;
    index: number;
  }) => (
    <AnimatedEntry
      delay={360 + index * 120}
      triggerKey={animationKey}
      style={styles.categoryAnimationWrapper}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Entrar a ${item.title}`}
        onPress={() =>
          navigation.navigate(ROUTES.LESSON, {
            moduleId,
            moduleName,
            lessonId: item.id,
            lessonTitle: item.title,
            lessonStatus: item.status,
            moduleProgress: safeProgress,
          })
        }
        style={({ pressed }) => [
          styles.categoryCard,
          pressed && styles.categoryCardPressed,
        ]}
      >
        <View style={styles.categoryLeftContainer}>
          <View style={styles.categoryIconContainer}>
            <AnimatedPop delay={520 + index * 120} triggerKey={animationKey}>
              {renderStatusIcon(item.status)}
            </AnimatedPop>
          </View>

          <AppText style={styles.categoryTitle}>{item.title}</AppText>
        </View>

        <MaterialIcons
          name="keyboard-arrow-right"
          size={28}
          color={colors.textSecondary}
        />
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

      <AnimatedEntry delay={180} triggerKey={animationKey}>
        <View style={styles.mainCard}>
          <View style={styles.mainIconBox}>
            {isWordsModule ? (
              <IconModuleWords width={112} height={92} />
            ) : (
              <IconModulePhrases width={110} height={90} />
            )}
          </View>

          <View style={styles.mainCardContent}>
            <AppText style={styles.mainCardTitle}>{moduleName}</AppText>

            <AppText style={styles.mainCardDescription}>
              {getModuleDetailDescription(moduleName, moduleDescription)}
            </AppText>

            <AppText style={styles.progressLabel}>
              Tu avance: {safeProgress}%
            </AppText>

            <AnimatedProgressBar
              progress={safeProgress}
              triggerKey={animationKey}
              delay={360}
              duration={850}
              trackStyle={styles.progressTrack}
              fillStyle={styles.progressFill}
            />
          </View>
        </View>
      </AnimatedEntry>

      <AnimatedEntry delay={280} triggerKey={animationKey}>
        <AppText style={styles.sectionTitle}>Categorías</AppText>
      </AnimatedEntry>

      <FlatList
        data={items}
        keyExtractor={(item) => `${moduleId}-${item.id}`}
        renderItem={renderLessonItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

function getTemporaryLessonStatus(index: number): LearningStatus {
  if (index === 0 || index === 1) {
    return 'completed';
  }

  if (index === 2) {
    return 'inProgress';
  }

  return 'notStarted';
}

function getModuleDetailDescription(
  moduleName: string,
  fallbackDescription: string
) {
  const normalizedName = moduleName.toLowerCase();

  if (normalizedName.includes('palabra')) {
    return 'Vocabulario para situaciones diarias.';
  }

  if (normalizedName.includes('frase')) {
    return 'Frases útiles para conversaciones diarias.';
  }

  return fallbackDescription;
}