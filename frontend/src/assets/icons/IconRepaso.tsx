import React from 'react';
import Svg, { Path } from 'react-native-svg';
// Este icono tenía una parte en color dorado (#DAB16D)
export const IconRepaso = ({ size = 24, color = '#194650' }) => (
  <Svg width={size} height={size} viewBox="0 0 129 80" fill="none">
    <Path d="M0 23c0-12.7 10.3-23 23-23h82.8c12.7 0 23 10.3 23 23v57H0V23z" fill="#DAB16D" />
    <Path d="M64 13.9c3 0 6 0 9 0 3.5 0 5.6 1.9 5.7 5.3 0.2 4.6 0.1 9.2 0 13.8 -0.1 2.7-2.1 5-4.4 5.2 -0.8 0.1-1.7 0.1-2 0H63c-2.3 0-3.5 1.2-3.5 3.5 0 2.3 1.2 3.5 3.5 3.5h7c3 0 5 2.5 5 5 0 2.5-2 5-5 5H63c-3 0-5.5-2.5-5.5-5.5V23c0-2.4 1.2-3.5 3.5-3.5 3.2 0 6.3 0.1 9.5 0 2.2 0 3.4 1.2 3.4 3.5 0 3.2 0 6.3 0 9.5 0 2.2-1.3 3.4-3.5 3.4 -3.2 0-6.3 0-9.5 0 -2.2 0-3.4-1.3-3.4-3.5 0-3.2 0-6.3 0-9.5 0-2.3 1.2-3.5 3.5-3.5H64z" fill={color} />
  </Svg>
);