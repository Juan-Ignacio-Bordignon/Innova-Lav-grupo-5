// src/features/favorites/navigation/FavoritesNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { LessonSelectionScreen } from '../screens/LessonSelectionScreen';
import { LessonHeader } from '../../../app/navigation/components/LessonHeader';
import { ROUTES } from '../../../constants/routes';

export const FavoritesStack = createNativeStackNavigator({
  screens: {
    FavoritesMain: {
      screen: FavoritesScreen,
      options: {
        headerShown: false, // Esto oculta completamente el header
      },
    },
    [ROUTES.LESSON_SELECTION]: {
      screen: LessonSelectionScreen,
      options: ({ navigation }) => ({
        headerShown: true,
        // Usamos la propiedad 'header' para renderizar tu componente personalizado
        // Esto reemplaza todo el header nativo por el tuyo
        header: () => (
          <LessonHeader 
            navigation={navigation} 
            title="Repasemos" // Pasamos el título aquí
          />
        ),
      }),
    },
  },
});