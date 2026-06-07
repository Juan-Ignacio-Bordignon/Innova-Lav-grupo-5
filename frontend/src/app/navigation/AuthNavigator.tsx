import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES, RootStackParamList } from '../../constants/routes';
import { View, Text } from 'react-native';

// Cascarones de Auth
function LoginScreen() { return <View className="flex-1 justify-center items-center"><Text>Login Screen</Text></View>; }
function RegisterScreen() { return <View className="flex-1 justify-center items-center"><Text>Register Screen</Text></View>; }

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.REGISTER} component={RegisterScreen} />
    </Stack.Navigator>
  );
}