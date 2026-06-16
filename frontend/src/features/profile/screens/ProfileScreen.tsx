import { useState } from 'react';
import { Text } from '@react-navigation/elements';
import { StaticScreenProps } from '@react-navigation/native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '../../../components/ui';
import { ROUTES } from '../../../constants/routes';
import { logout } from '../../auth/services/authService';

type Props = StaticScreenProps<{
  user: string;
}>;

export function Profile({ route }: Props) {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    try {
      setLoading(true);

      await logout();

      const rootNavigation = navigation.getParent() ?? navigation;

      rootNavigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: ROUTES.LOGIN }],
        }),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text>{route.params?.user ?? 'Usuario'}'s Profile</Text>

      <AppButton
        title="Cerrar sesión"
        variant="outline"
        loading={loading}
        onPress={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});