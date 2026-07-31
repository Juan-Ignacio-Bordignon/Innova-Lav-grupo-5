// src/features/exercises/components/PhraseBuilderExercise.tsx

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
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

type WordToken = {
  id: string;
  value: ExerciseAnswerValue;
};

type PhraseBuilderExerciseProps = {
  options: ExerciseAnswerValue[];

  /**
   * Cantidad exacta de elementos que debe seleccionar
   * el usuario para formar la respuesta.
   *
   * Las opciones restantes funcionan como distractores.
   */
  answerLength?: number;

  continueTitle?: string;
  continueLoading?: boolean;

  onSubmitAnswer: (
    answer: ExerciseAnswerValue[],
  ) => Promise<ExerciseResolution>;

  onContinue: () => void | Promise<void>;
};

export function PhraseBuilderExercise({
  options,
  answerLength,
  continueTitle = 'Siguiente lección',
  continueLoading = false,
  onSubmitAnswer,
  onContinue,
}: PhraseBuilderExerciseProps) {
  const tokens = useMemo<WordToken[]>(
    () =>
      options.map((value, index) => ({
        id: `${String(value)}-${index}`,
        value,
      })),
    [options],
  );

  /**
   * answerLength representa la longitud de la palabra.
   *
   * Ejemplo:
   *
   * options: D, A, C, A, B, E
   * answerLength: 4
   *
   * El usuario selecciona C, A, D, A
   * y deja B y E sin utilizar.
   */
  const requiredAnswerLength =
    useMemo(() => {
      const parsedLength =
        Number(answerLength);

      if (
        Number.isFinite(parsedLength) &&
        parsedLength > 0
      ) {
        return Math.min(
          Math.trunc(parsedLength),
          tokens.length,
        );
      }

      return tokens.length;
    }, [
      answerLength,
      tokens.length,
    ]);

  const [
    selectedTokenIds,
    setSelectedTokenIds,
  ] = useState<string[]>([]);

  const [
    resolution,
    setResolution,
  ] =
    useState<ExerciseResolution | null>(
      null,
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
    setSelectedTokenIds([]);
    setResolution(null);
    setIsSubmitting(false);
    setSubmitError('');
  }, [
    tokens,
    requiredAnswerLength,
  ]);

  const submitted =
    resolution !== null;

  const isBusy =
    isSubmitting ||
    continueLoading;

  const selectedTokens =
    selectedTokenIds
      .map((tokenId) =>
        tokens.find(
          (token) =>
            token.id === tokenId,
        ),
      )
      .filter(
        (
          token,
        ): token is WordToken =>
          token !== undefined,
      );

  const availableTokens =
    tokens.filter(
      (token) =>
        !selectedTokenIds.includes(
          token.id,
        ),
    );

  const selectedCount =
    selectedTokenIds.length;

  const hasCompleteAnswer =
    selectedCount ===
    requiredAnswerLength;

  const selectionIsFull =
    selectedCount >=
    requiredAnswerLength;

  const handleAddToken = (
    tokenId: string,
  ) => {
    if (
      submitted ||
      isBusy ||
      selectionIsFull
    ) {
      return;
    }

    setSelectedTokenIds(
      (current) => {
        if (
          current.length >=
          requiredAnswerLength
        ) {
          return current;
        }

        if (
          current.includes(tokenId)
        ) {
          return current;
        }

        return [
          ...current,
          tokenId,
        ];
      },
    );

    setSubmitError('');
  };

  const handleRemoveToken = (
    tokenId: string,
  ) => {
    if (
      submitted ||
      isBusy
    ) {
      return;
    }

    setSelectedTokenIds(
      (current) =>
        current.filter(
          (selectedId) =>
            selectedId !== tokenId,
        ),
    );

    setSubmitError('');
  };

  const handlePrimaryAction =
    async () => {
      if (!submitted) {
        if (
          !hasCompleteAnswer ||
          isSubmitting
        ) {
          return;
        }

        const selectedAnswer =
          selectedTokens.map(
            (token) =>
              token.value,
          );

        try {
          setIsSubmitting(true);
          setSubmitError('');

          const result =
            await onSubmitAnswer(
              selectedAnswer,
            );

          setResolution(result);
        } catch (error) {
          setSubmitError(
            error instanceof Error
              ? error.message
              : 'No se pudo comprobar la respuesta.',
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

      setSelectedTokenIds([]);
      setResolution(null);
      setSubmitError('');
    };

  return (
    <View style={styles.container}>
      <View style={styles.answerArea}>
        <View style={styles.answerHeader}>
          <View
            style={
              styles.answerTitleRow
            }
          >
            <MaterialIcons
              name="format-quote"
              size={22}
              color={colors.primary}
            />

            <AppText
              style={styles.answerTitle}
            >
              Tu respuesta
            </AppText>
          </View>

          {!submitted ? (
            <AppText
              style={
                styles.answerCounter
              }
            >
              {selectedCount} de{' '}
              {requiredAnswerLength}
            </AppText>
          ) : null}
        </View>

        <View
          style={
            styles.selectedWordsContainer
          }
        >
          {selectedTokens.length ===
          0 ? (
            <AppText
              style={styles.placeholder}
            >
              Tocá las letras para
              formar la respuesta
            </AppText>
          ) : (
            selectedTokens.map(
              (token) => (
                <Pressable
                  key={token.id}
                  disabled={
                    submitted ||
                    isBusy
                  }
                  onPress={() =>
                    handleRemoveToken(
                      token.id,
                    )
                  }
                  style={({
                    pressed,
                  }) => [
                    styles.wordChip,
                    styles.selectedWordChip,

                    pressed &&
                      !submitted &&
                      !isBusy &&
                      styles.pressed,
                  ]}
                >
                  <AppText
                    style={
                      styles.selectedWordText
                    }
                  >
                    {formatAnswerLabel(
                      token.value,
                    )}
                  </AppText>
                </Pressable>
              ),
            )
          )}
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.wordBank}>
        {availableTokens.map(
          (token) => (
            <Pressable
              key={token.id}
              disabled={
                submitted ||
                isBusy ||
                selectionIsFull
              }
              onPress={() =>
                handleAddToken(
                  token.id,
                )
              }
              style={({ pressed }) => [
                styles.wordChip,
                styles.availableWordChip,

                selectionIsFull &&
                  styles.disabledWordChip,

                pressed &&
                  !submitted &&
                  !isBusy &&
                  !selectionIsFull &&
                  styles.pressed,
              ]}
            >
              <AppText
                style={[
                  styles.availableWordText,

                  selectionIsFull &&
                    styles.disabledWordText,
                ]}
              >
                {formatAnswerLabel(
                  token.value,
                )}
              </AppText>
            </Pressable>
          ),
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
              ? '¡Orden correcto!'
              : 'El orden todavía no es correcto'}
          </AppText>

          <AppText
            style={
              styles.feedbackDescription
            }
          >
            {getFeedbackDescription(
              resolution,
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
          !hasCompleteAnswer
        }
        loading={
          isSubmitting ||
          (
            continueLoading &&
            resolution?.isCorrect ===
              true
          )
        }
        onPress={
          handlePrimaryAction
        }
      />
    </View>
  );
}

function getFeedbackDescription(
  resolution: ExerciseResolution,
) {
  const pointsText =
    resolution.pointsEarned === 1
      ? 'Sumaste 1 punto.'
      : `Sumaste ${resolution.pointsEarned} puntos.`;

  if (!resolution.isCorrect) {
    return `${pointsText} Volvé a ordenar las letras e intentá nuevamente.`;
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

  return `${pointsText} La respuesta quedó formada correctamente.`;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 20,
  },

  answerArea: {
    width: '100%',
    minHeight: 130,
    borderRadius: 20,
    padding: 17,
    gap: 14,
    backgroundColor:
      colors.surface,
    borderWidth: 1.3,
    borderColor:
      colors.primary,
  },

  answerHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
    gap: 12,
  },

  answerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  answerTitle: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.primary,
  },

  answerCounter: {
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 18,
    color:
      colors.textSecondary,
  },

  selectedWordsContainer: {
    minHeight: 55,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },

  placeholder: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 19,
    color:
      colors.textSecondary,
  },

  separator: {
    width: '100%',
    height:
      StyleSheet.hairlineWidth,
    backgroundColor:
      colors.border,
  },

  wordBank: {
    minHeight: 90,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  wordChip: {
    minHeight: 44,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  availableWordChip: {
    backgroundColor:
      colors.surface,
    borderWidth: 1.3,
    borderColor:
      colors.border,

    shadowColor:
      colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  disabledWordChip: {
    opacity: 0.42,
  },

  selectedWordChip: {
    backgroundColor:
      colors.primary,
    borderWidth: 1.3,
    borderColor:
      colors.primary,
  },

  availableWordText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 20,
    color:
      colors.primary,
  },

  disabledWordText: {
    color:
      colors.textSecondary,
  },

  selectedWordText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 20,
    color:
      colors.textLight,
  },

  pressed: {
    opacity: 0.88,
    transform: [
      {
        scale: 0.97,
      },
    ],
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
    borderColor:
      colors.success,
    backgroundColor:
      'rgba(106, 173, 131, 0.12)',
  },

  feedbackIncorrect: {
    borderColor:
      colors.error,
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
    color:
      colors.textSecondary,
  },
});