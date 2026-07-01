import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { AppText } from './AppText'; // Importamos desde la misma carpeta
import { colors } from '../../constants/colors';
import { IconContenedorVacio } from '../../assets/icons/IconContenedorVacio';
import { IconSinComenzar } from '../../assets/icons/IconSinComenzar';
import { IconEnProceso } from '../../assets/icons/IconEnProceso';


// En src/components/ui/LessonButton.tsx
interface LessonButtonProps {
  title: string;
  status: 'completed' | 'inProgress' | 'notStarted'; // Basado en tu lógica de pantalla
  onPress: () => void;
}

export const LessonButton: React.FC<LessonButtonProps> = ({ title, status, onPress }) => {
  const isCompleted = status === 'completed';
// Define qué color usar según el estado
const getBackgroundColor = (status: string) => {
  if (status === 'completed') return colors.secondary; // Oro
  return colors.primary; // Verde oscuro para inProgress y notStarted
};

  
  return (
   <TouchableOpacity style={[styles.button, { backgroundColor: status === 'completed' ? colors.secondary : colors.primary }]} onPress={onPress}>
      <View style={styles.iconWrapper}>
        {status === 'completed' ? (
          <IconContenedorVacio width={24} height={24} />
        ) : status === 'inProgress' ? (
          <IconEnProceso width={24} height={24} />
        ) : (
          <IconSinComenzar width={24} height={24} />
        )}
      </View>
      <AppText style={[
  styles.text, 
  { color: status === 'completed' ? colors.primary : colors.white } 
]}>
  {title}
</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 12,
    marginVertical: 6,
    paddingHorizontal: 16,
    flexDirection: 'row', // Esto mantiene los elementos en fila
    alignItems: 'center', // Alinea verticalmente
    justifyContent: 'flex-start', // Cambiamos esto para que todo comience a la izquierda
    // Sombras...
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconWrapper: {
    marginRight: 12, // Asegúrate de que esto exista
  },
  text: {
    color: colors.primary, // Cambiamos a verde primario
    fontWeight: '600',
    marginLeft: 12, // Agregamos un margen a la izquierda del texto para que no toque el icono
  },
});