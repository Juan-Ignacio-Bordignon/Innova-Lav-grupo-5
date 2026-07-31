// src/features/exercises/components/AnswerOption.tsx

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  Pressable,
  StyleSheet,
} from 'react-native';

import { AppText } from '../../../components/ui';
import { colors } from '../../../constants/colors';
import { fonts } from '../../../theme/fonts';

type AnswerOptionProps = {
  label: string;
  selected?: boolean;
  correct?: boolean;
  incorrect?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

export function AnswerOption({
  label,
  selected = false,
  correct = false,
  incorrect = false,
  disabled = false,
  onPress,
}: AnswerOptionProps) {
  const iconName = getIconName({
    selected,
    correct,
    incorrect,
  });

  const iconColor = getIconColor({
    selected,
    correct,
    incorrect,
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{
        selected,
        disabled,
      }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        selected && styles.selected,
        correct && styles.correct,
        incorrect && styles.incorrect,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <MaterialIcons
        name={iconName}
        size={25}
        color={iconColor}
      />

      <AppText
        style={[
          styles.label,
          selected && styles.selectedLabel,
          correct && styles.correctLabel,
          incorrect && styles.incorrectLabel,
        ]}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

function getIconName({
  selected,
  correct,
  incorrect,
}: {
  selected: boolean;
  correct: boolean;
  incorrect: boolean;
}) {
  if (correct) {
    return 'check-circle' as const;
  }

  if (incorrect) {
    return 'cancel' as const;
  }

  if (selected) {
    return 'radio-button-checked' as const;
  }

  return 'radio-button-unchecked' as const;
}

function getIconColor({
  selected,
  correct,
  incorrect,
}: {
  selected: boolean;
  correct: boolean;
  incorrect: boolean;
}) {
  if (correct) {
    return colors.success;
  }

  if (incorrect) {
    return colors.error;
  }

  if (selected) {
    return colors.primary;
  }

  return colors.textSecondary;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 58,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderWidth: 1.4,
    borderColor: colors.border,

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  selected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(25, 70, 80, 0.06)',
  },

  correct: {
    borderColor: colors.success,
    backgroundColor: 'rgba(106, 173, 131, 0.12)',
  },

  incorrect: {
    borderColor: colors.error,
    backgroundColor: 'rgba(212, 63, 54, 0.09)',
  },

  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },

  label: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 15,
    lineHeight: 21,
    color: colors.textPrimary,
  },

  selectedLabel: {
    fontFamily: fonts.bold,
    color: colors.primary,
  },

  correctLabel: {
    fontFamily: fonts.bold,
    color: colors.success,
  },

  incorrectLabel: {
    fontFamily: fonts.bold,
    color: colors.error,
  },
});