import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FavoritesScreen } from '../screens/FavoritesScreen';

export const FavoritesStack = createNativeStackNavigator({
  screens: {
    FavoritesMain: {
      screen: FavoritesScreen,
      options: {
        headerShown: false,
      },
    },
  },
});
