import React from 'react';
import Svg, { Path } from 'react-native-svg';

export type IconState = 'completed' | 'progress' | 'notStarted' | 'favorite';

interface CategoryIconProps {
  state: IconState;
  width?: number;
  height?: number;
}

export const CategoryIcon = ({ state, width = 30, height = 30 }: CategoryIconProps) => {
  // Colores definidos según los lineamientos de diseño de la marca
  const color = state === 'progress' ? '#DAB16D' : '#194650';

  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      {/* Burbuja Base con extensión a la derecha */}
      {/* El segmento 'L21 22' crea la punta de la burbuja en la parte inferior derecha */}
      <Path 
        d="M21 5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V17C3 18.1 3.9 19 5 19H18L21 22V5Z" 
        stroke={color} 
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Ícono interno: Check (Completado) */}
      {state === 'completed' && (
        <Path d="M9 11l2 2 4-4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
      
      {/* Ícono interno: Puntos (Progreso) */}
      {state === 'progress' && (
        <Path d="M8 12h.01M12 12h.01M16 12h.01" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      )}
      
      {/* Ícono interno: Corazón (Favorito) */}
      {state === 'favorite' && (
        <Path d="M12 14.5l-1-1c-2-2-4-3.5-4-5.5A2.5 2.5 0 019.5 5.5c1.2 0 2.5.6 3.5 1.5 1-0.9 2.3-1.5 3.5-1.5A2.5 2.5 0 0119 8c0 2-2 3.5-4 5.5l-1 1z" fill={color} />
      )}
    </Svg>
  );
};