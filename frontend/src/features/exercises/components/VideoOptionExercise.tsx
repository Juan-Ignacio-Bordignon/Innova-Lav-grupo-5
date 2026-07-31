// src/features/exercises/components/VideoOptionExercise.tsx

import {
  useEffect,
  useState,
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import {
  AppButton,
  AppText,
} from '../../../components/ui';
import { colors } from '../../../constants/colors';
import { fonts } from '../../../theme/fonts';
import type { ExerciseResolution } from '../../progress/types';
import type { ExerciseAnswerValue } from '../types';
import { formatAnswerLabel } from '../utils';

import { AnswerOption } from './AnswerOption';

type VideoOptionExerciseProps = {
  options: ExerciseAnswerValue[];
  continueTitle?: string;
  continueLoading?: boolean;

  onSubmitAnswer: (
    answer: ExerciseAnswerValue
  ) => Promise<ExerciseResolution>;

  onContinue: () => void | Promise<void>;
};

export function VideoOptionExercise({
  options,
  continueTitle = 'Siguiente lección',
  continueLoading = false,
  onSubmitAnswer,
  onContinue,
}: VideoOptionExerciseProps) {
  const [
    selectedAnswer,
    setSelectedAnswer,
  ] =
    useState<ExerciseAnswerValue | null>(
      null
    );

  const [
    resolution,
    setResolution,
  ] =
    useState<ExerciseResolution | null>(
      null
    );

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    submitError,
    setSubmitError,
  ] = useState('');

  useEffect(() => {
    setSelectedAnswer(null);
    setResolution(null);
    setIsSubmitting(false);
    setSubmitError('');
  }, [options]);

  const submitted =
    resolution !== null;

  const isBusy =
    isSubmitting || continueLoading;

  const handleOptionPress = (
    option: ExerciseAnswerValue
  ) => {
    if (submitted || isBusy) {
      return;
    }

    setSelectedAnswer(option);
    setSubmitError('');
  };

  const handlePrimaryAction =
    async () => {
      if (!submitted) {
        if (
          selectedAnswer === null ||
          isSubmitting
        ) {
          return;
        }

        try {
          setIsSubmitting(true);
          setSubmitError('');

          const result =
            await onSubmitAnswer(
              selectedAnswer
            );

          setResolution(result);
        } catch (error) {
          setSubmitError(
            error instanceof Error
              ? error.message
              : 'No se pudo comprobar la respuesta.'
          );
        } finally {
          setIsSubmitting(false);
        }

        return;
      }

      if (resolution.isCorrect) {
        await onContinue();
        return;
      }

      setSelectedAnswer(null);
      setResolution(null);
      setSubmitError('');
    };

  return (
    <View style={styles.container}>
      <View
        style={styles.optionsContainer}
      >
        {options.map(
          (option, index) => {
            const optionIsSelected =
              selectedAnswer === option;

            const optionIsCorrect =
              submitted &&
              optionIsSelected &&
              resolution.isCorrect;

            const optionIsIncorrect =
              submitted &&
              optionIsSelected &&
              !resolution.isCorrect;

            return (
              <AnswerOption
                key={`${String(
                  option
                )}-${index}`}
                label={formatAnswerLabel(
                  option
                )}
                selected={
                  optionIsSelected &&
                  !submitted
                }
                correct={
                  optionIsCorrect
                }
                incorrect={
                  optionIsIncorrect
                }
                disabled={
                  submitted || isBusy
                }
                onPress={() =>
                  handleOptionPress(
                    option
                  )
                }
              />
            );
          }
        )}
      </View>

      {submitError ? (
        <View
          style={[
            styles.feedback,
            styles.feedbackIncorrect,
          ]}
        >
          <AppText
            style={[
              styles.feedbackTitle,
              styles.feedbackIncorrectText,
            ]}
          >
            No pudimos comprobar la
            respuesta
          </AppText>

          <AppText
            style={
              styles.feedbackDescription
            }
          >
            {submitError}
          </AppText>
        </View>
      ) : null}

      {resolution ? (
        <View
          style={[
            styles.feedback,
            resolution.isCorrect
              ? styles.feedbackCorrect
              : styles.feedbackIncorrect,
          ]}
        >
          <AppText
            style={[
              styles.feedbackTitle,
              resolution.isCorrect
                ? styles.feedbackCorrectText
                : styles.feedbackIncorrectText,
            ]}
          >
            {resolution.isCorrect
              ? '¡Respuesta correcta!'
              : 'Todavía no es correcto'}
          </AppText>

          <AppText
            style={
              styles.feedbackDescription
            }
          >
            {getFeedbackDescription(
              resolution
            )}
          </AppText>
        </View>
      ) : null}

      <AppButton
        title={
          !submitted
            ? 'Comprobar respuesta'
            : resolution.isCorrect
              ? continueTitle
              : 'Intentar nuevamente'
        }
        disabled={
          !submitted &&
          selectedAnswer === null
        }
        loading={
          isSubmitting ||
          (continueLoading &&
            resolution?.isCorrect ===
              true)
        }
        onPress={
          handlePrimaryAction
        }
      />
    </View>
  );
}

function getFeedbackDescription(
  resolution: ExerciseResolution
) {
  const pointsText =
    resolution.pointsEarned === 1
      ? 'Sumaste 1 punto.'
      : `Sumaste ${resolution.pointsEarned} puntos.`;

  if (!resolution.isCorrect) {
    return `${pointsText} Revisá las opciones y volvé a intentarlo.`;
  }

  if (
    resolution.currentStreak > 0
  ) {
    const streakText =
      resolution.currentStreak === 1
        ? 'Tu racha es de 1 día.'
        : `Tu racha es de ${resolution.currentStreak} días.`;

    return `${pointsText} ${streakText}`;
  }

  return `${pointsText} Podés continuar con el siguiente contenido.`;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 20,
  },

  optionsContainer: {
    width: '100%',
    gap: 12,
  },

  feedback: {
    width: '100%',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 15,
    gap: 4,
    borderWidth: 1.3,
  },

  feedbackCorrect: {
    borderColor: colors.success,
    backgroundColor:
      'rgba(106, 173, 131, 0.12)',
  },

  feedbackIncorrect: {
    borderColor: colors.error,
    backgroundColor:
      'rgba(212, 63, 54, 0.09)',
  },

  feedbackTitle: {
    fontFamily: fonts.bold,
    fontSize: 15,
    lineHeight: 21,
  },

  feedbackCorrectText: {
    color: colors.success,
  },

  feedbackIncorrectText: {
    color: colors.error,
  },

  feedbackDescription: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
  },
});