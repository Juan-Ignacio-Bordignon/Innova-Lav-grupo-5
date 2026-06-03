import { Text } from '@react-navigation/elements';
import { StaticScreenProps } from '@react-navigation/native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { AppButton } from '../../../components/ui';
import { ROUTES } from '../../../constants/routes';
import { StyleSheet, View } from 'react-native';

type Props = StaticScreenProps<{
  user: string;
}>;

export function Profile({ route }: Props) {

    const navigation = useNavigation<any>();
  
    function handleLogout() {
      const rootNavigation = navigation.getParent() ?? navigation;
  
    rootNavigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: ROUTES.LOGIN }],
      }),
    );
  }

  return (
    <View style={styles.container}>
      <Text>{route.params.user}'s Profile</Text>
      <AppButton
        title="Cerrar sesión"
        variant="outline"
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
