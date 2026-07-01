// src/features/modules/screens/ModuleDetailScreen.tsx
import { useFocusEffect, useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ModuleFooter } from '../../../components/layout/ModuleFooter';
import { HeaderLeccion } from '../../../components/layout/HeaderLeccion';
import { AnimatedEntry, AppText, LessonButton } from '../../../components/ui';
import { ROUTES, type RootStackParamList } from '../../../constants/routes';
import { MOCK_MODULE_DETAILS } from '../../../data/mocks/moduleMocks';
import { styles } from './ModuleDetailScreen.styles';

import IconModulePhrases from '../../../assets/icons/ux/modules/IconModulePhrases.svg';
import IconModuleWords from '../../../assets/icons/ux/modules/IconModuleWords.svg';

type ModuleDetailRouteProp = RouteProp<RootStackParamList, typeof ROUTES.MODULE_DETAIL>;

export const ModuleDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<ModuleDetailRouteProp>();
  const [animationKey, setAnimationKey] = useState(0);

  // Obtenemos los datos con fallback al mock
  const moduleData = route.params?.moduleData ?? MOCK_MODULE_DETAILS;
  const { 
 moduleId: moduleId, // <--- Aquí estás renombrando el 'id' del objeto a 'moduleId'
  title, 
  description, 
  progress, 
  lessons 
} = moduleData;

  useFocusEffect(
    useCallback(() => {
      setAnimationKey((value) => value + 1);
    }, [])
  );

  const safeProgress = Math.max(0, Math.min(progress, 100));
  const isWordsModule = title.toLowerCase().includes('palabra');

  const renderLessonItem = ({ item, index }: { item: any, index: number }) => (
    <AnimatedEntry
      delay={360 + index * 120}
      triggerKey={animationKey}
      style={styles.categoryAnimationWrapper}
    >
      <LessonButton 
        title={item.title} 
        status={item.status}
        onPress={() => navigation.navigate(ROUTES.LESSON, { lessonId: item.id })}
      />
    </AnimatedEntry>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <FlatList
          data={lessons}
          keyExtractor={(item) => `${moduleId}-${item.id}`}
          renderItem={renderLessonItem}
          contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              {/* Header Reutilizable */}
              <AnimatedEntry delay={100} triggerKey={animationKey}>
                <HeaderLeccion 
                  onBack={() => navigation.goBack()}
                  tituloModulo={title}
                  categoria={title}
                  progreso={safeProgress}
                />
              </AnimatedEntry>

              {/* Tarjeta Principal */}
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
                    <AppText style={styles.mainCardTitle}>{title}</AppText>
                    <AppText style={styles.mainCardDescription}>{description}</AppText>
                  </View>
                </View>
              </AnimatedEntry>

              <AppText style={styles.sectionTitle}>Categorías</AppText>
            </>
          }
        />
      </SafeAreaView>
      
     <ModuleFooter /> {/* ¡Ahora sí, renderizado sin errores! */}
    </View>
  );
};