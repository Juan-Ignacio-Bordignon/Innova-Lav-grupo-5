import { Text, type TextProps, StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { fonts } from '../../theme/fonts';

type AppTextVariant =
  | 'title'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'button'
  | 'link'
  | 'error'
  | 'small';

type AppTextProps = TextProps & {
  variant?: AppTextVariant;
};

export function AppText({ variant = 'body', style, ...props }: AppTextProps) {
  return <Text style={[styles[variant], style]} {...props} />;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.textPrimary,
  },
  body: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  caption: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  small: {
    fontFamily: fonts.medium,
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
  },
  button: {
    fontFamily: fonts.bold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textLight,
    textAlign: 'center',
  },
  link: {
    fontFamily: fonts.bold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.primary,
  },
  error: {
    fontFamily: fonts.medium,
    fontSize: 11,
    lineHeight: 16,
    color: colors.error,
  },
});