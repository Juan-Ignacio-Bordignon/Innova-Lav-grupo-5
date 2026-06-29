import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface IconProps extends SvgProps {
  size?: number;
  color?: string;
}

export const IconFlechaIzquierda = ({ size = 24, color = "#194650", ...props }: IconProps) => {
  return (
    <Svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      {...props}
    >
      <Path
        // IMPORTANTE: Aquí cambiamos el stroke fijo por la variable 'color'
        d="M15 18L9 12L15 6" 
        stroke={color} 
        strokeWidth={3} // Aumenté un poco el ancho para que se vea más sólido como en la foto
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};