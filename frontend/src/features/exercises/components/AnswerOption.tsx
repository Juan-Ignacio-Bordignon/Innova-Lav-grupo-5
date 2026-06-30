import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Check, X } from 'lucide-react-native';
import { AppText } from '../../../components/ui';

interface AnswerOptionProps {
  text: string;
  state?: 'default' | 'correct' | 'incorrect';
  optionNumber?: number; // Para mostrar el 1, 2 o 3 en el estado default
  onPress?: () => void;
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  text,
  state = 'default',
  optionNumber = 1,
  onPress,
}) => {
  // Evaluamos el estado actual para renderizar condicionalmente
  const isDefault = state === 'default';
  const isCorrect = state === 'correct';
  const isIncorrect = state === 'incorrect';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!isDefault} // Deshabilitamos el botón si ya está mostrando un resultado
      className={`flex-row items-center w-full p-4 rounded-full border-2 mb-4
        ${isDefault ? 'bg-white border-gray-100' : ''}
        ${isCorrect ? 'bg-green-600 border-green-600' : ''}
        ${isIncorrect ? 'bg-red-600 border-red-600' : ''}
      `}
    >
      {/* Círculo indicador (Número o Ícono) */}
      <View 
        className={`w-8 h-8 rounded-full items-center justify-center mr-4
          ${isDefault ? 'bg-primary' : 'bg-white/30'}
        `}
      >
        {isDefault && (
          <AppText className="text-white font-bold text-sm">
            {optionNumber}
          </AppText>
        )}
        {isCorrect && <Check color="#FFFFFF" size={18} strokeWidth={3} />}
        {isIncorrect && <X color="#FFFFFF" size={18} strokeWidth={3} />}
      </View>

      {/* Texto de la respuesta */}
      <AppText 
        className={`font-semibold text-base flex-1
          ${isDefault ? 'text-primary' : 'text-white'}
        `}
      >
        {text}
      </AppText>
    </TouchableOpacity>
  );
};