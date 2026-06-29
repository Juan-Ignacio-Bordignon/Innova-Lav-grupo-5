import { ExerciseScreen } from '../../features/exercises/screens/ExerciseScreen';
import { ModuleDetailScreen } from '../../features/modules/screens/ModuleDetailScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
} from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, View } from 'react-native';

// Assets existentes del equipo
import bell from '../../assets/bell.png';
import newspaper from '../../assets/newspaper.png';

// Pantallas existentes mapeadas por el equipo
import { LoginScreen } from '../../features/auth/screens/LoginScreen';
import { RegisterScreen } from '../../features/auth/screens/RegisterScreen';
import { ROUTES } from '../../constants/routes';
import { Home } from '../../features/home/screens/HomeScreen';
import { Updates } from '../../features/progress/screens/ProgressScreen';
import { Profile } from '../../features/profile/screens/ProfileScreen';
import { Settings } from '../../features/profile/screens/SettingsScreen';
import { NotFound } from './screens/NotFoundScreen';

// 🆕 Cascarones temporales para el núcleo de aprendizaje LSA (Semanas 4 y 5)
function LessonScreen() { return <View className="flex-1 justify-center items-center"><Text>Video de Seña LSA</Text></View>; }
function FeedbackScreen() { return <View className="flex-1 justify-center items-center"><Text>Resultado del Ejercicio</Text></View>; }

// 1. Contenedor de las pestañas inferiores (TabNavigator)
const HomeTabs = createBottomTabNavigator({
  screens: {
    [ROUTES.HOME]: {
      screen: Home,
      options: {
        title: 'Feed',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            tintColor={color}
            style={{ width: size, height: size }}
          />
        ),
      },
    },
    [ROUTES.UPDATES]: {
      screen: Updates,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={bell}
            tintColor={color}
            style={{ width: size, height: size }}
          />
        ),
      },
    },
  },
});

// 2. Enrutador Maestro (RootNavigator) usando la API Estática de React Navigation 7
const RootStack = createNativeStackNavigator({
  initialRouteName: ROUTES.LOGIN, // Cambié a EXERCISE para pruebas rápidas
  screens: {
    [ROUTES.LOGIN]: {
      screen: LoginScreen,
      options: { headerShown: false },
    },
    [ROUTES.REGISTER]: {
      screen: RegisterScreen,
      options: { headerShown: false },
    },
    [ROUTES.HOME_TABS]: {
      screen: HomeTabs,
      options: { title: 'Home', headerShown: false },
    },
    [ROUTES.LESSON]: {
      screen: LessonScreen,
      options: { title: 'Lección LSA' },
    },
    // 💡 CORRECCIÓN AQUÍ: Estructura correcta de options
    [ROUTES.EXERCISE]: {
      screen: ExerciseScreen,
      options: { 
        title: 'Ejercicio',
        headerShown: false // Esto quitará el encabezado nativo "Ejercicio"
      },
    },
    [ROUTES.FEEDBACK]: {
      screen: FeedbackScreen,
      options: { headerShown: false },
    },
    [ROUTES.PROFILE]: {
      screen: Profile,
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: { user: (value: string) => value.replace(/^@/, '') },
        stringify: { user: (value: string) => `@${value}` },
      },
    },
    [ROUTES.SETTINGS]: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={() => navigation.goBack()}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    [ROUTES.NOT_FOUND]: {
      screen: NotFound,
      options: { title: '404' },
      linking: { path: '*' },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);