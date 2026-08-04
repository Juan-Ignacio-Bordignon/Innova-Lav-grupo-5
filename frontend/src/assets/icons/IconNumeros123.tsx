import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../constants/colors'; // Importa aquí también

export const IconNumeros123 = ({ size = 44, color = colors.primary }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <Path
        d="M14 10V34M14 10L10 14M20 18C20 14 24 10 28 10C32 10 34 14 34 18C34 22 28 26 24 30L34 34M20 22C24 20 28 20 30 22C32 24 30 26 28 26C26 26 24 28 24 30"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};