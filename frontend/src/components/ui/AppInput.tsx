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
  passwordVisibleIcon?: ReactNode;
  passwordHiddenIcon?: ReactNode;
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
  passwordVisibleIcon,
  passwordHiddenIcon,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  style,
  placeholderTextColor = colors.placeholder,
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
  const isActive = isFocused || Boolean(props.value);
  const hasError = Boolean(error);

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
          isActive && styles.inputContainerActive,
          hasError && styles.inputContainerError,
          !editable && styles.inputContainerDisabled,
          inputContainerStyle,
        ]}
      >
        {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}

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

        {rightIcon ? <View style={styles.rightIcon}>{rightIcon}</View> : null}

        {shouldShowPasswordToggle ? (
          <Pressable
            onPress={() => setIsPasswordVisible((value) => !value)}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={
              isPasswordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'
            }
            style={styles.passwordToggle}
          >
            {isPasswordVisible && passwordVisibleIcon ? (
              passwordVisibleIcon
            ) : !isPasswordVisible && passwordHiddenIcon ? (
              passwordHiddenIcon
            ) : (
              <AppText variant="link" style={styles.passwordToggleText}>
                {isPasswordVisible ? 'Ocultar' : 'Ver'}
              </AppText>
            )}
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
    minHeight: 50,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  inputContainerActive: {
    borderColor: colors.inputBorder,
  },
  inputContainerError: {
    borderColor: colors.error,
    shadowColor: colors.error,
    shadowOpacity: 0.2,
  },
  inputContainerDisabled: {
    opacity: 0.6,
  },
  input: {
    flex: 1,
    minHeight: 50,
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textPrimary,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  leftIcon: {
    width: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon: {
    width: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordToggle: {
    minWidth: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordToggleText: {
    fontSize: 11,
  },
  errorText: {
    marginTop: 5,
    textAlign: 'center',
  },
});