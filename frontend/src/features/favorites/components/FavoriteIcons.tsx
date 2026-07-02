import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

// 1. Ícono para el Empty State (Estado vacío)
export const EmptyFavoritesIcon = () => (
  <Svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <Circle cx="40" cy="40" r="40" fill="#1B434D" />
    <Path 
      d="M52.5 45.8333C52.5 50.4357 48.769 54.1667 44.1667 54.1667H33.3333L25 62.5V33.3333C25 28.731 28.731 25 33.3333 25H44.1667C48.769 25 52.5 28.731 52.5 33.3333V45.8333Z" 
      stroke="#FFFFFF" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <Path 
      d="M38.75 36.6667C38.75 35.2858 37.6308 34.1667 36.25 34.1667C34.8692 34.1667 33.75 35.2858 33.75 36.6667C33.75 39.1667 38.75 42.5 38.75 42.5C38.75 42.5 43.75 39.1667 43.75 36.6667C43.75 35.2858 42.6308 34.1667 41.25 34.1667C39.8692 34.1667 38.75 35.2858 38.75 36.6667Z" 
      fill="#D59B54" 
    />
  </Svg>
);

// 2. Ícono del corazón para las tarjetas (Dinámico)
export const HeartBubbleIcon = ({ isFilled = false }: { isFilled?: boolean }) => {
  const heartColor = isFilled ? "#1B434D" : "none";
  const strokeColor = "#1B434D";

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path 
        d="M21 15A2 2 0 0 1 19 17H7L3 21V5A2 2 0 0 1 5 3H19A2 2 0 0 1 21 5V15Z" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M12 10.5C12 9.11929 10.8807 8 9.5 8C8.11929 8 7 9.11929 7 10.5C7 13 12 16.3333 12 16.3333C12 16.3333 17 13 17 10.5C17 9.11929 15.8807 8 14.5 8C13.1193 8 12 9.11929 12 10.5Z" 
        fill={heartColor}
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
};