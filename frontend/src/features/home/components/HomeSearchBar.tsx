import { StyleSheet, View } from 'react-native';

import { AppInput, AppText } from '../../../components/ui';
import { colors } from '../../../constants/colors';

import IconSearch from '../../../assets/icons/ux/home/IconSearch.svg';

type HomeSearchBarProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export function HomeSearchBar({ value, onChangeText }: HomeSearchBarProps) {
  return (
    <View style={styles.container}>
      <AppText variant="subtitle" style={styles.title}>
        ¿Qué aprendemos hoy?
      </AppText>

      <AppInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar"
        leftIcon={<IconSearch width={28} height={24} />}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 28,
  },

  title: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 14,
    color: colors.textPrimary,
  },

  inputContainer: {
    minHeight: 58,
    borderRadius: 30,
    paddingHorizontal: 22,
  },

  input: {
    fontSize: 16,
  },
});