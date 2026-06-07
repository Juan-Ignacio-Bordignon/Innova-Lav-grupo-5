import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROUTES, RootStackParamList } from '../../constants/routes';
import { View, Text } from 'react-native';

// Pantallas temporales básicas (cascarones) para que no tire error
function HomeScreen() { return <View className="flex-1 justify-center items-center"><Text>Home Screen (LSA)</Text></View>; }
function UpdatesScreen() { return <View className="flex-1 justify-center items-center"><Text>Novedades</Text></View>; }
function ProfileScreen() { return <View className="flex-1 justify-center items-center"><Text>Mi Perfil</Text></View>; }
function SettingsScreen() { return <View className="flex-1 justify-center items-center"><Text>Configuración</Text></View>; }

const Tab = createBottomTabNavigator<RootStackParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Tab.Screen name={ROUTES.UPDATES} component={UpdatesScreen} />
      <Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
      <Tab.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
    </Tab.Navigator>
  );
}