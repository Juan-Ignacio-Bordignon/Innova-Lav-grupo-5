// src/assets/icons/IconDeletrear.tsx
import * as React from 'react';
import Svg, { Path, Rect, G, SvgProps } from 'react-native-svg';

interface IconDeletrearProps extends SvgProps {
  isCompleted?: boolean;
}

export const IconDeletrear = ({ isCompleted = false, ...props }: IconDeletrearProps) => {
  // 🧭 Encuadre matemático idéntico al de IconNumeros e IconAgenda
  // Si está completado mira abajo (Y: 85), si está pendiente mira arriba (Y: 20)
  const viewBoxWindow = isCompleted ? "20 85 55 45.1" : "20 20 55 45.1";

  return (
    <Svg 
      width={props.width || 24} 
      height={props.height || 24} 
      viewBox={viewBoxWindow} 
      fill="none"
      {...props}
    >
      {/* ================= ESTADO PENDIENTE (Arriba) ================= */}
      {!isCompleted && (
        <G>
          {/* El "A a" original vectorizado en Verde Oscuro oficial */}
          <Path 
            fill={props.fill || '#194650'} 
            d="M36.12 43.12H29.16L27.64 47H24L31.04 31H34.28L41.32 47H37.64L36.12 43.12ZM30.16 40.28H35.12L32.64 33.72L30.16 40.28ZM53.64 40.16C53.64 36.6 51.52 35.12 47.92 35.12C44.76 35.12 42.6 36.32 42.04 38.32H45.4C45.72 37.44 46.6 37.16 47.72 37.16C49.28 37.16 50.16 37.76 50.16 39.04V40.16H46.88C42.84 40.16 40.96 41.92 40.96 44.44C40.96 46.76 42.84 48.16 45.92 48.16C48.4 48.16 50.04 47.16 50.48 46.12H50.64L51.04 47.84H54.08L53.64 40.16ZM50.16 43.28C50.16 45.08 48.88 46 47.04 46C45.36 46 44.44 45.24 44.44 44.16C44.44 42.88 45.52 42.24 47.4 42.24H50.16V43.28Z" 
          />
          {/* Subrayado de la letra minúscula en Dorado oficial */}
          <Path 
            fill="#DAB16D" 
            stroke="#DAB16D" 
            strokeWidth="2" 
            d="M51.5 53.5H43.5C42.67 53.5 42 52.83 42 52C42 51.17 42.67 50.5 43.5 50.5H51.5C52.33 50.5 53 51.17 53 52C53 52.83 52.33 53.5 51.5 53.5Z" 
          />
          {/* Rectángulo contenedor con fill transparente que hereda props.fill */}
          <Rect 
            x="20" 
            y="20" 
            width="55" 
            height="45.1" 
            rx="8.25" 
            stroke={props.fill || '#194650'} 
            strokeWidth="4" 
            fill="none" 
          />
        </G>
      )}

      {/* ================= ESTADO COMPLETADO (Abajo) ================= */}
      {isCompleted && (
        <G>
          {/* El "A a" original vectorizado en Blanco Puro */}
          <Path 
            fill="white" 
            d="M36.12 108.12H29.16L27.64 112H24L31.04 96H34.28L41.32 112H37.64L36.12 108.12ZM30.16 105.28H35.12L32.64 98.72L30.16 105.28ZM53.64 105.16C53.64 101.6 51.52 100.12 47.92 100.12C44.76 100.12 42.6 101.32 42.04 103.32H45.4C45.72 102.44 46.6 102.16 47.72 102.16C49.28 102.16 50.16 102.76 50.16 104.04V105.16H46.88C42.84 105.16 40.96 106.92 40.96 109.44C40.96 111.76 42.84 113.16 45.92 113.16C48.4 113.16 50.04 112.16 50.48 111.12H50.64L51.04 112.84H54.08L53.64 105.16ZM50.16 108.28C50.16 110.08 48.88 111 47.04 111C45.36 111 44.44 110.24 44.44 109.16C44.44 107.88 45.52 107.24 47.4 107.24H50.16V108.28Z" 
          />
          {/* Subrayado de la letra minúscula en Dorado oficial */}
          <Path 
            fill="#DAB16D" 
            stroke="#DAB16D" 
            strokeWidth="2" 
            d="M51.5 118.5H43.5C42.67 118.5 42 117.83 42 117C42 116.17 42.67 115.5 43.5 115.5H51.5C52.33 115.5 53 116.17 53 117C53 117.83 52.33 118.5 51.5 118.5Z" 
          />
          {/* Rectángulo contenedor del estado completado en Blanco Puro */}
          <Rect 
            x="20" 
            y="85" 
            width="55" 
            height="45.1" 
            rx="8.25" 
            stroke="white" 
            strokeWidth="4" 
            fill="none" 
          />
        </G>
      )}
    </Svg>
  );
};