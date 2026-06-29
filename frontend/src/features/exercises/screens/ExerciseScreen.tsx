// src/features/exercises/screens/ExerciseScreen.tsx
import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { HeaderLeccion } from '../../../components/layout/HeaderLeccion';
import { AppButton, AppText } from '../../../components/ui';
import { HandSignPointer } from '../components/HandSignPointer';
import { colors } from '../../../constants/colors';
import { IconRepetir } from '../../../assets/icons/IconRepetir';
import { IconFavorito } from '../../../assets/icons/IconFavorito';
import { exerciseProgressMock } from '../../../data/mocks/progressMocks';

export const ExerciseScreen = () => {
  const { moduleName, currentQuestion, progressPercentage } = exerciseProgressMock;

  return (
    <ScrollView className="flex-1 bg-[#F8F8F8] px-4 pt-8">
      <HeaderLeccion 
        onBack={() => console.log("Atrás")} 
        tituloModulo={moduleName} 
        categoria="Palabras"
        progreso={progressPercentage / 100} 
        disabledBack={true}
      />
     
      <AppText className="text-center text-primary font-bold text-xl my-6">
        {currentQuestion}
      </AppText>

      <View className="bg-white rounded-3xl p-8 items-center justify-center mx-2 shadow-sm border border-gray-100 mb-8">
        <HandSignPointer width={150} height={200} color={colors.primary} />
      </View>

      <View className="flex-row justify-center gap-x-6 mb-8">
        <TouchableOpacity className="bg-white rounded-full p-4 border border-gray-100 shadow-sm">
          <IconRepetir size={24} iconColor={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity className="bg-white rounded-full p-4 border border-gray-100 shadow-sm">
          <IconFavorito size={24} iconColor={colors.primary} />
        </TouchableOpacity>
      </View>

      <View className="mb-10">
        <AppButton 
          title="Continuar lección" 
          onPress={() => console.log("Continuar")}
          variant="primary"
        />
      </View>
    </ScrollView>
  );
};