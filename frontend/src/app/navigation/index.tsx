// src/app/navigation/index.tsx

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

import { AppBottomTabBar } from './components/AppBottomTabBar';
import { NotFound } from './screens/NotFoundScreen';

import { ROUTES } from '../../constants/routes';
import { LoginScreen } from '../../features/auth/screens/LoginScreen';
import { RegisterScreen } from '../../features/auth/screens/RegisterScreen';
import { ExerciseScreen } from '../../features/exercises/screens/ExerciseScreen';
import { FavoritesScreen } from '../../features/favorites/screens/FavoritesScreen';
import { Home } from '../../features/home/screens/HomeScreen';
import { LessonScreen } from '../../features/lessons/screens/LessonScreen';
import { ModuleDetailScreen } from '../../features/modules/screens/ModuleDetailScreen';
import { Profile } from '../../features/profile/screens/ProfileScreen';
import { Settings } from '../../features/profile/screens/SettingsScreen';
import { LessonSelectionScreen } from '../../features/favorites/screens/LessonSelectionScreen';
import { LessonHeader } from './components/LessonHeader';
import { FavoritesStack } from '../../features/favorites/navigation/FavoritesNavigator';

function FeedbackScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Resultado del Ejercicio</Text>
    </View>
  );
}

const HomeTabs = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
  },
  tabBar: (props) => <AppBottomTabBar {...props} />,
  screens: {
    [ROUTES.HOME]: {
      screen: Home,
      options: {
        title: 'Inicio',
      },
    },
    [ROUTES.FAVORITES]: {
      screen: FavoritesStack, // Usamos el stack de favoritos aquí
      options: {
        title: 'Favoritos',
      },
    },
    [ROUTES.PROFILE_TAB]: {
      screen: Profile,
      options: {
        title: 'Perfil',
      },
    },
  /*[ROUTES.LESSON_SELECTION]: {
    screen: LessonSelectionScreen,
    options: ({ navigation }) => ({
    headerShown: true,
    headerTitle: 'Repasemos',
    headerShadowVisible: false,
    headerLeft: () => <LessonHeader navigation={navigation} />,// O true si quieres que aparezca el botón de "atrás" por defecto
    }),
    },//*/
    
  },
});

const RootStack = createNativeStackNavigator({
  initialRouteName: ROUTES.LOGIN,
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
    [ROUTES.MODULE_DETAIL]: {
      screen: ModuleDetailScreen,
      options: {
        headerShown: false,
      },
    },
    [ROUTES.LESSON]: {
      screen: LessonScreen,
      options: {
        headerShown: false,
      },
    },
    [ROUTES.EXERCISE]: {
      screen: ExerciseScreen,
      options: {
        title: 'Ejercicio',
        headerShown: false,
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
    // En tu objeto screens dentro de RootStack:
    
  },
});

export const Navigation = createStaticNavigation(RootStack);