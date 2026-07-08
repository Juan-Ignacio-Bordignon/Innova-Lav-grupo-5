// src/features/exercises/screens/ExerciseScreen.tsx

import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { IconFavorito } from '../../../assets/icons/IconFavorito';
import { IconRepetir } from '../../../assets/icons/IconRepetir';
import { HeaderLeccion } from '../../../components/layout/HeaderLeccion';
import { AppButton, AppText } from '../../../components/ui';
import { colors } from '../../../constants/colors';
import { ROUTES, type RootStackParamList } from '../../../constants/routes';
import { exerciseProgressMock } from '../../../data/mocks/progressMocks';
import { HandSignPointer } from '../components/HandSignPointer';

type ExerciseRouteProp = RouteProp<RootStackParamList, typeof ROUTES.EXERCISE>;

export const ExerciseScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<ExerciseRouteProp>();

  const { moduleName, lessonTitle, exerciseTitle } = route.params;

  const { moduleName: mockModuleName, currentQuestion, progressPercentage } =
    exerciseProgressMock;

  const visibleModuleName = moduleName ?? mockModuleName;
  const visibleLessonTitle = lessonTitle ?? 'Palabras';
  const visibleQuestion = exerciseTitle ?? currentQuestion;

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

      <View className="flex-row justify-center gap-x-6 mb-8">
        <TouchableOpacity className="bg-white rounded-full p-4 border border-gray-100 shadow-sm">
          <IconFavorito size={24} iconColor={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity className="bg-white rounded-full p-4 border border-gray-100 shadow-sm">
          <IconRepetir size={24} iconColor={colors.primary} />
        </TouchableOpacity>
      </View>

      <View className="mb-10">
        <AppButton
          title="Continuar lección"
          onPress={() => console.log('Continuar')}
          variant="primary"
        />
      </View>
    </ScrollView>
  );
};