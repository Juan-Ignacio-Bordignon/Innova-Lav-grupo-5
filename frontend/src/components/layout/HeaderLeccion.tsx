import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import { IconFlechaIzquierda } from '../../assets/icons/IconFlechaIzquierda';
import { IconTrofeo } from '../../assets/icons/IconTrofeo';
import { IconConNotificacion } from '../../assets/icons/IconConNotificacion';
import { AppText } from '../ui/AppText';
import { ProgressBar } from '../ui/ProgressBar';

interface HeaderLeccionProps {
  onBack: () => void;
  tituloModulo: string;
  categoria: string;
  progreso: number;
  disabledBack?: boolean;
}
// 1. IconButton con overflow visible para permitir que el badge sobresalga
const IconButton = ({ children, onPress, disabled, borderGreen }: any) => (
  <TouchableOpacity 
    onPress={onPress}
    disabled={disabled}
    // Quitamos 'opacity-50' del className global para que el icono no pierda color
    className={`w-12 h-12 bg-white rounded-full items-center justify-center shadow-md overflow-visible`}
    style={{ 
      elevation: 5,
      borderWidth: borderGreen ? 3 : 0, 
      borderColor: borderGreen ? '#194650' : 'transparent', // Verde sólido
      // Aplicamos la "desactivación" solo al fondo si es necesario, pero manteniendo el icono vivo
      backgroundColor: disabled ? '#f9f9f9' : 'white' 
    }}
  >
    {children}
  </TouchableOpacity>
);
export const HeaderLeccion: React.FC<HeaderLeccionProps> = ({ 
  onBack, tituloModulo, categoria, progreso, disabledBack 
}) => {
  return (
    <View className="w-full bg-white pt-6 pb-2 px-3"
    style={{ backgroundColor: colors.backgroundApp }} // Aplicamos el color importado
>
      {/* Contenedor superior */}
      <View className="flex-row items-center justify-between mb-4"> {/* Aumentamos mb-2 a mb-4 */}
        <IconButton onPress={onBack} disabled={disabledBack} borderGreen={disabledBack}>
          <IconFlechaIzquierda size={24} color={colors.primary} />
        </IconButton>

        <View className="items-center flex-1 mx-2">
          <AppText className="text-[10px] text-primary font-bold tracking-widest">
            Módulo:
          </AppText>
          <AppText className="text-sm text-primary font-bold">
            {categoria}
          </AppText>
        </View>

        <View className="flex-row items-center gap-x-2">
          <IconTrofeo size={24} iconColor={colors.primary} />
          <IconConNotificacion size={24} iconColor={colors.primary} showBadge={true} />
        </View>
      </View>

      {/* Barra de progreso: Añadimos un margin-top (mt-4) para separar del bloque superior */}
      <View className="px-2 mt-4"> 
        <ProgressBar progress={progreso} className="h-3" />
      </View>
    </View>
  );
};