import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors } from '../../constants/colors';
import { AppText } from './AppText';

type AppButtonVariant =
  | 'primary'
  | 'secondary'
  | 'secondaryDarkText'
  | 'outline'
  | 'success'
  | 'danger'
  | 'ghost';

type AppButtonProps = PressableProps & {
  title: string;
  variant?: AppButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function AppButton({
  title,
  variant = 'primary',
  loading = false,
  fullWidth = true,
  disabled,
  style,
  ...props
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        fullWidth && styles.fullWidth,
        hasShadow(variant) && styles.shadow,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getLoadingColor(variant, isDisabled)} />
      ) : (
        <AppText variant="button" style={getTextStyle(variant, isDisabled)}>
          {title}
        </AppText>
      )}
    </Pressable>
  );
}

function hasShadow(variant: AppButtonVariant) {
  return variant !== 'ghost';
}

function getLoadingColor(variant: AppButtonVariant, disabled?: boolean) {
  if (disabled) {
    return colors.white;
  }

  if (
    variant === 'outline' ||
    variant === 'secondaryDarkText' ||
    variant === 'ghost'
  ) {
    return colors.primary;
  }

  return colors.textLight;
}

function getTextStyle(variant: AppButtonVariant, disabled?: boolean) {
  if (disabled) {
    return styles.disabledText;
  }

  if (
    variant === 'outline' ||
    variant === 'secondaryDarkText' ||
    variant === 'ghost'
  ) {
    return styles.darkText;
  }

  return styles.lightText;
}

const styles = StyleSheet.create({
  base: {
    minHeight: 50,
    borderRadius: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  secondaryDarkText: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: colors.surface,
    borderWidth: 1.3,
    borderColor: colors.primary,
  },
  success: {
    backgroundColor: colors.success,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  shadow: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  lightText: {
    color: colors.textLight,
  },
  darkText: {
    color: colors.primary,
  },
  disabled: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled,
  },
  disabledText: {
    color: colors.white,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
});