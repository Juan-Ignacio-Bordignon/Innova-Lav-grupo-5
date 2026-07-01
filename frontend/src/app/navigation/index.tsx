// src/app/index.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import { HeaderButton, Text } from '@react-navigation/elements';
import { View } from 'react-native';

// Importaciones de características
import { ModuleDetailScreen } from '../../features/modules/screens/ModuleDetailScreen';
import { ExerciseScreen } from '../../features/exercises/screens/ExerciseScreen';
import { FavoritesScreen } from '../../features/favorites/screens/FavoritesScreen';
import { LoginScreen } from '../../features/auth/screens/LoginScreen';
import { RegisterScreen } from '../../features/auth/screens/RegisterScreen';
import { Home } from '../../features/home/screens/HomeScreen';
import { Updates } from '../../features/progress/screens/ProgressScreen';
import { Profile } from '../../features/profile/screens/ProfileScreen';
import { Settings } from '../../features/profile/screens/SettingsScreen';
import { NotFound } from './screens/NotFoundScreen';

// Componentes y Constantes
import { AppBottomTabBar } from './components/AppBottomTabBar';
import { ROUTES } from '../../constants/routes';
import { MOCK_MODULE_DETAILS } from '../../data/mocks/moduleMocks'; // Importamos el Mock

// Cascarones temporales
function LessonScreen() { return <View className="flex-1 justify-center items-center"><Text>Video de Seña LSA</Text></View>; }
function FeedbackScreen() { return <View className="flex-1 justify-center items-center"><Text>Resultado del Ejercicio</Text></View>; }

// 1. Tab Navigator
const HomeTabs = createBottomTabNavigator({
  screenOptions: { headerShown: false },
  tabBar: (props) => <AppBottomTabBar {...props} />,
  screens: {
    [ROUTES.HOME]: { screen: Home, options: { title: 'Inicio' } },
    [ROUTES.FAVORITES]: { screen: FavoritesScreen, options: { title: 'Favoritos' } },
    [ROUTES.PROFILE_TAB]: { screen: Profile, options: { title: 'Perfil' } },
   
    
  },
});

// 2. Root Navigator
const RootStack = createNativeStackNavigator({
  initialRouteName: ROUTES.LOGIN, // Cambiado a MODULE_DETAIL para pruebas
  screens: {
    [ROUTES.LOGIN]: { screen: LoginScreen, options: { headerShown: false } },
    [ROUTES.REGISTER]: { screen: RegisterScreen, options: { headerShown: false } },
    [ROUTES.HOME_TABS]: { screen: HomeTabs, options: { title: 'Home', headerShown: false } },
    
    [ROUTES.MODULE_DETAIL]: {
      screen: ModuleDetailScreen,
      options: { headerShown: false },
      // AQUÍ pasamos el objeto completo como parámetro inicial
      initialParams: {
        moduleData: MOCK_MODULE_DETAILS,
      },
    },

    [ROUTES.LESSON]: { screen: LessonScreen, options: { title: 'Lección LSA' } },
    [ROUTES.EXERCISE]: { 
      screen: ExerciseScreen, 
      options: { title: 'Ejercicio', headerShown: false } 
    },
    [ROUTES.FEEDBACK]: { screen: FeedbackScreen, options: { headerShown: false } },
    
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