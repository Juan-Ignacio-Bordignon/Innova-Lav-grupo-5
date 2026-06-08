// src/navigation/AuthNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/routes'; // Ajustá los ../ según tu carpeta exacta
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { RegisterScreen } from '../features/auth/screens/RegisterScreen';

// 🌟 Formato Static API (React Navigation 7)
export const AuthNavigator = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    [ROUTES.LOGIN]: {
      screen: LoginScreen,
    },
    [ROUTES.REGISTER]: {
      screen: RegisterScreen,
    },
  },
});