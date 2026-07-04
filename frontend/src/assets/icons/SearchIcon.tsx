import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors } from '../../constants/colors'; // Asegúrate de ajustar esta ruta

export const SearchIcon = ({ size = 20, color = "#194650" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" />
    <Path d="M20 20L17 17" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);