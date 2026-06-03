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
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getLoadingColor(variant)} />
      ) : (
        <AppText variant="button" style={getTextStyle(variant)}>
          {title}
        </AppText>
      )}
    </Pressable>
  );
}

function getLoadingColor(variant: AppButtonVariant) {
  if (
    variant === 'outline' ||
    variant === 'secondaryDarkText' ||
    variant === 'ghost'
  ) {
    return colors.primary;
  }

  return colors.textLight;
}

function getTextStyle(variant: AppButtonVariant) {
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
    minHeight: 52,
    borderRadius: 18,
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
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  success: {
    backgroundColor: colors.success,
  },
  danger: {
    backgroundColor: colors.error,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  lightText: {
    color: colors.textLight,
  },
  darkText: {
    color: colors.primary,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: 0.5,
  },
});