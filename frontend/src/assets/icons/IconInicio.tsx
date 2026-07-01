import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const IconInicio = ({ size = 24, color = '#194650' }) => (
  <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <Path d="M8 36c0-12.7 10.3-23 23-23h82.8c12.7 0 23 10.3 23 23v58.3H31c-12.7 0-23-10.3-23-23V36z" fill={color} />
  </Svg>
);