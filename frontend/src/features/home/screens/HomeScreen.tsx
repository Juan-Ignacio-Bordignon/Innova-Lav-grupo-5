import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedEntry, AppText } from '../../../components/ui';
import { colors } from '../../../constants/colors';
import { MOCK_USER_PROFILE } from '../../../data/mocks/userMocks';
import { ModuleCard } from '../../modules/components/ModuleCard';
import { getHomeModules } from '../../modules/services/modulesService';
import type { HomeModule } from '../../modules/types';
import { HomeHeader } from '../components/HomeHeader';
import { HomeSearchBar } from '../components/HomeSearchBar';

export function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [modules, setModules] = useState<HomeModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadModules() {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const homeModules = await getHomeModules();

        if (isMounted) {
          setModules(homeModules);
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
            userName={MOCK_USER_PROFILE.name}
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
              <AppText variant="body" style={styles.feedbackText}>
                Cargando módulos...
              </AppText>
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
                  <ModuleCard module={module} />
                </AnimatedEntry>
              ))
            : null}
        </View>
      </ScrollView>
    </SafeAreaView>
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
});