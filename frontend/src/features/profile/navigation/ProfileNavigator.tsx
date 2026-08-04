import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTES } from '../../../constants/routes';
import { AchievementsScreen } from '../screens/AchievementsScreen';
import { Profile } from '../screens/ProfileScreen';

export const ProfileStack =
  createNativeStackNavigator({
    screenOptions: {
      headerShown: false,
    },

    screens: {
      [ROUTES.PROFILE]: {
        screen: Profile,
      },

      [ROUTES.ACHIEVEMENTS]: {
        screen: AchievementsScreen,
      },
    },
  });