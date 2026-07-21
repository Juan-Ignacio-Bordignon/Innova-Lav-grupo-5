// src/features/exercises/screens/ExerciseScreen.tsx

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import { IconRepetir } from '../../../assets/icons/IconRepetir';
import { HeaderLeccion } from '../../../components/layout/HeaderLeccion';
import { AppButton, AppText } from '../../../components/ui';
import { colors } from '../../../constants/colors';
import { ROUTES, type RootStackParamList } from '../../../constants/routes';
import { exerciseProgressMock } from '../../../data/mocks/progressMocks';
import {
  addFavorite,
  isExerciseFavorite,
  removeFavorite,
} from '../../favorites/services/favoritesService';
import { HandSignPointer } from '../components/HandSignPointer';

type ExerciseRouteProp = RouteProp<
  RootStackParamList,
  typeof ROUTES.EXERCISE
>;

export const ExerciseScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<ExerciseRouteProp>();

  const { exerciseId, moduleName, lessonTitle, exerciseTitle } = route.params;

  const [isFavorite, setIsFavorite] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(true);
  const [favoriteError, setFavoriteError] = useState('');

  const { moduleName: mockModuleName, currentQuestion, progressPercentage } =
    exerciseProgressMock;

  const visibleModuleName = moduleName ?? mockModuleName;
  const visibleLessonTitle = lessonTitle ?? 'Palabras';
  const visibleQuestion = exerciseTitle ?? currentQuestion;

  const loadFavoriteState = useCallback(async () => {
    try {
      setIsFavoriteLoading(true);
      setFavoriteError('');
      setIsFavorite(await isExerciseFavorite(exerciseId));
    } catch (error) {
      setFavoriteError(
        error instanceof Error
          ? error.message
          : 'No se pudo consultar el favorito.'
      );
    } finally {
      setIsFavoriteLoading(false);
    }
  }, [exerciseId]);

  useFocusEffect(
    useCallback(() => {
      void loadFavoriteState();
    }, [loadFavoriteState])
  );

  const handleFavoritePress = async () => {
    if (isFavoriteLoading) {
      return;
    }

    const previousValue = isFavorite;

    try {
      setIsFavoriteLoading(true);
      setFavoriteError('');
      setIsFavorite(!previousValue);

      if (previousValue) {
        await removeFavorite(exerciseId);
      } else {
        await addFavorite(exerciseId);
      }
    } catch (error) {
      setIsFavorite(previousValue);
      setFavoriteError(
        error instanceof Error
          ? error.message
          : 'No se pudo actualizar el favorito.'
      );
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#F8F8F8] px-4 pt-8">
      <HeaderLeccion
        onBack={() => navigation.goBack()}
        tituloModulo={visibleModuleName}
        categoria={visibleLessonTitle}
        progreso={progressPercentage / 100}
        disabledBack={false}
      />

      <AppText className="text-center text-primary font-bold text-xl my-6">
        {visibleQuestion}
      </AppText>

      <View className="bg-white rounded-3xl p-8 items-center justify-center mx-2 shadow-sm border border-gray-100 mb-8">
        <HandSignPointer width={150} height={200} color={colors.primary} />
      </View>

      <View className="flex-row justify-center gap-x-6 mb-4">
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={
            isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'
          }
          disabled={isFavoriteLoading}
          onPress={() => void handleFavoritePress()}
          className="bg-white rounded-full p-4 border border-gray-100 shadow-sm"
          style={{ opacity: isFavoriteLoading ? 0.72 : 1 }}
        >
          {isFavoriteLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <MaterialIcons
              name={isFavorite ? 'favorite' : 'favorite-border'}
              size={24}
              color={isFavorite ? colors.secondary : colors.primary}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity className="bg-white rounded-full p-4 border border-gray-100 shadow-sm">
          <IconRepetir size={24} iconColor={colors.primary} />
        </TouchableOpacity>
      </View>

      {favoriteError ? (
        <AppText variant="error" className="text-center mb-4 px-4">
          {favoriteError}
        </AppText>
      ) : null}

      <View className="mb-10 mt-4">
        <AppButton
          title="Continuar lección"
          onPress={() => console.log('Continuar')}
          variant="primary"
        />
      </View>
    </ScrollView>
  );
};
