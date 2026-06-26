import { StyleSheet, View } from 'react-native';

import { AppText } from '../../../components/ui';
import { colors } from '../../../constants/colors';

export function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <AppText variant="title" style={styles.title}>
        Favoritos
      </AppText>

      <AppText variant="body" style={styles.description}>
        Todavía no agregaste módulos favoritos.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    color: colors.textSecondary,
  },
});