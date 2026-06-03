import {
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { colors } from '../../constants/colors';
import { fonts } from '../../theme/fonts';
import { AppText } from './AppText';

type AppInputProps = TextInputProps & {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export function AppInput({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  style,
  placeholderTextColor = colors.textSecondary,
  editable = true,
  ...props
}: AppInputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <AppText variant="caption" style={styles.label}>
          {label}
        </AppText>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          error && styles.inputContainerError,
          !editable && styles.inputContainerDisabled,
          inputContainerStyle,
        ]}
      >
        {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}

        <TextInput
          placeholderTextColor={placeholderTextColor}
          editable={editable}
          style={[styles.input, inputStyle, style]}
          autoCapitalize="none"
          autoCorrect={false}
          {...props}
        />

        {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}
      </View>

      {error ? (
        <AppText variant="error" style={styles.errorText}>
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 6,
  },
  inputContainer: {
    width: '100%',
    minHeight: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  inputContainerError: {
    borderColor: colors.error,
  },
  inputContainerDisabled: {
    opacity: 0.6,
  },
  input: {
    flex: 1,
    minHeight: 48,
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  icon: {
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    marginTop: 6,
  },
});