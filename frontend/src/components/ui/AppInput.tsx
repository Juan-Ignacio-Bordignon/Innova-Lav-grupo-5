import { useState, type ReactNode } from 'react';
import {
  Platform,
  Pressable,
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
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

const webInputReset =
  Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : null;

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
  secureTextEntry = false,
  autoCapitalize = 'none',
  autoCorrect = false,
  onFocus,
  onBlur,
  ...props
}: AppInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const shouldShowPasswordToggle = secureTextEntry && !rightIcon;

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
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
          !editable && styles.inputContainerDisabled,
          inputContainerStyle,
        ]}
      >
        {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}

        <TextInput
          placeholderTextColor={placeholderTextColor}
          editable={editable}
          secureTextEntry={secureTextEntry ? !isPasswordVisible : false}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          style={[styles.input, webInputReset, inputStyle, style]}
          {...props}
        />

        {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}

        {shouldShowPasswordToggle ? (
          <Pressable
            onPress={() => setIsPasswordVisible((value) => !value)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={
              isPasswordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'
            }
            style={styles.passwordToggle}
          >
            <AppText variant="link" style={styles.passwordToggleText}>
              {isPasswordVisible ? 'Ocultar' : 'Ver'}
            </AppText>
          </Pressable>
        ) : null}
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
  inputContainerFocused: {
    borderColor: colors.primary,
    borderWidth: 1.5,
    shadowColor: colors.primary,
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 4,
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
  passwordToggle: {
    marginLeft: 8,
  },
  passwordToggleText: {
    fontSize: 12,
  },
  errorText: {
    marginTop: 6,
  },
});