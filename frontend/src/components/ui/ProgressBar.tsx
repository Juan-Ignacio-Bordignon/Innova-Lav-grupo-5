import React from 'react';
import { View } from 'react-native';
import { colors } from '../../constants/colors';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className }) => {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const greenWidth = (1 - clampedProgress) * 100;

  return (
    <View 
      // Contenedor principal con bordes redondeados y borde exterior
      className={`w-full h-3 rounded-full border-2 border-primary overflow-hidden bg-white ${className}`}
    >
      {/* Capa Verde: Es la que se encoge hacia la derecha */}
      <View 
        style={{ 
          width: `${greenWidth}%`, 
          backgroundColor: colors.primary,
          height: '100%',
          position: 'absolute',
          right: 0,
          // La clave es NO aplicar redondeo aquí para que la unión con lo blanco sea recta
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }} 
      />
      
      {/* Nota: Para que el borde sea redondeado donde termina lo blanco,
         simplemente dejamos que el overflow-hidden del contenedor principal 
         haga el trabajo, o si la barra blanca es un componente separado, 
         le aplicamos el redondeo a su lado derecho.
      */}
    </View>
  );
};