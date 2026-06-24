// src/features/exercises/screens/ExerciseScreen.tsx
import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronLeft, Trophy, Bell, RotateCcw, Heart } from 'lucide-react-native';

// Componentes UI globales
import { AppButton, AppText } from '../../../components/ui';

// Componentes locales de la feature (Asegúrate de que existan)
import { HandSignPointer } from '../components/HandSignPointer';
import { AnswerOption } from '../components/AnswerOption';

// Mock de datos (Asegúrate de que este archivo exporte 'exerciseProgressMock')
import { exerciseProgressMock } from '../../../data/mocks/progressMocks';

export const ExerciseScreen = () => {
  const { moduleName, currentQuestion, progressPercentage } = exerciseProgressMock;

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-8">
      
      {/* Barra superior */}
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity className="bg-primary rounded-full p-2">
          <ChevronLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        
        <View className="items-center">
          <AppText className="text-primary font-bold text-lg">Módulo:</AppText>
          <AppText className="text-primary font-semibold text-base">{moduleName}</AppText>
        </View>

        <View className="flex-row gap-x-4">
          <Trophy color="#194650" size={24} />
          <Bell color="#194650" size={24} />
        </View>
      </View>

      {/* Barra de progreso */}
      <View className="h-2 w-full bg-gray-200 rounded-full mb-6">
        <View 
          className="h-full bg-primary rounded-full" 
          style={{ width: `${progressPercentage}%` }} 
        />
      </View>

      {/* Número de pregunta */}
      <AppText className="text-center text-primary font-bold text-xl mb-6">
        {currentQuestion}
      </AppText>

      {/* Contenedor del SVG (HandSignPointer) */}
      <View className="items-center justify-center mb-8">
        <HandSignPointer width={150} height={200} color="#194650" />
      </View>

      {/* Opciones de respuesta */}
      <View className="w-full mb-8">
        <AnswerOption optionNumber={1} text="Tristeza" state="default" />
        <AnswerOption optionNumber={2} text="Enojo" state="default" />
        <AnswerOption optionNumber={3} text="Cansancio" state="default" />
      </View>

      {/* Botones secundarios */}
      <View className="flex-row justify-center gap-x-6 mb-8">
        <TouchableOpacity className="bg-white rounded-full p-4 border border-gray-100">
          <RotateCcw color="#194650" size={24} />
        </TouchableOpacity>
        <TouchableOpacity className="bg-primary rounded-full p-4">
          <Heart color="#FFFFFF" size={24} />
        </TouchableOpacity>
      </View>

      {/* Botón Principal */}
      <AppButton 
        title="Continuar lección" 
        onPress={() => console.log("Continuar")}
      />
    </ScrollView>
  );
};