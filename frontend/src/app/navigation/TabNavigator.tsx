// src/navigation/TabNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROUTES } from '../../constants/routes'; // Ajustá la cantidad de ../ según tu carpeta real

// 🌟 Importamos las pantallas REALES mapeadas por tu equipo
import { Home } from '../../features/home/screens/HomeScreen';
import { Updates } from '../../features/progress/screens/ProgressScreen';
import { Profile } from '../../features/profile/screens/ProfileScreen';
import { Settings } from '../../features/profile/screens/SettingsScreen';

// 🌟 Formato Static API (React Navigation 7) orientado a objetos
export const HomeTabs = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    [ROUTES.HOME]: {
      screen: Home,
      options: {
        title: 'Feed', // El texto que se va a ver abajo en la pestaña
      },
    },
    [ROUTES.UPDATES]: {
      screen: Updates,
      options: {
        title: 'Updates',
      },
    },
    [ROUTES.PROFILE]: {
      screen: Profile,
      options: {
        title: 'Perfil',
      },
    },
    [ROUTES.SETTINGS]: {
      screen: Settings,
      options: {
        title: 'Configuración',
      },
    },
  },
});