import { Button } from '@react-navigation/elements';
import { Text, View } from 'react-native';

export function Home() {
  return (
    <View className="flex-1 items-center justify-center gap-3 bg-white px-6">
      <Text className="text-2xl font-bold text-blue-600">
        InnovaLab Grupo 5
      </Text>

      <Text className="text-center text-base text-gray-600">
        React Native + Expo + React Navigation + NativeWind funcionando.
      </Text>

      <Button screen="Profile" params={{ user: 'jane' }}>
        Go to Profile
      </Button>

      <Button screen="Settings">
        Go to Settings
      </Button>
    </View>
  );
}