import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '../../../components/ui';
import { colors } from '../../../constants/colors';
import { HOME_MODULES } from '../../../data/mocks/homeMocks';
import { MOCK_USER_PROFILE } from '../../../data/mocks/userMocks';
import { ModuleCard } from '../../modules/components/ModuleCard';
import { HomeHeader } from '../components/HomeHeader';
import { HomeSearchBar } from '../components/HomeSearchBar';

export function Home() {
  const [searchValue, setSearchValue] = useState('');

  const filteredModules = HOME_MODULES.filter((module) => {
    const search = searchValue.trim().toLowerCase();

    if (!search) {
      return true;
    }

    return `${module.title} ${module.subtitle}`
      .toLowerCase()
      .includes(search);
  });

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        <View style={styles.topSpacer} />

        <HomeHeader
          userName={MOCK_USER_PROFILE.name}
          notificationsCount={1}
        />

        <HomeSearchBar
          value={searchValue}
          onChangeText={setSearchValue}
        />

        <View style={styles.modulesSection}>
          <AppText variant="title" style={styles.sectionTitle}>
            Módulos
          </AppText>

          {filteredModules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
            />
          ))}
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
    height: 14,
  },

  modulesSection: {
    marginTop: 34,
  },

  sectionTitle: {
    fontSize: 29,
    lineHeight: 35,
    marginBottom: 16,
  },
});