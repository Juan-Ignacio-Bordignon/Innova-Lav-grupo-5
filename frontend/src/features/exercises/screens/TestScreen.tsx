import React from 'react';
import { View } from 'react-native';
import { HeaderLeccion } from '../../../components/layout/HeaderLeccion';
import { exerciseProgressMock } from '../../../data/mocks/progressMocks';

export const TestScreen = () => {
  const { moduleName, progressPercentage } = exerciseProgressMock;

  return (
    <View className="flex-1 bg-white pt-12">
      {/* Probando el Header de forma aislada */}
      <HeaderLeccion 
        onBack={() => console.log("Atrás presionado")} 
        tituloModulo={moduleName} 
        categoria="Palabras"
        progreso={progressPercentage / 100} 
      />
      
      {/* Aquí podrías probar otros componentes que vayas creando */}
    </View>
  );
};