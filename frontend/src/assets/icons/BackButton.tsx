import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { IconFlechaIzquierda } from '../../assets/icons/IconFlechaIzquierda';

export const BackButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.circle}>
      <IconFlechaIzquierda />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20, // Esto lo hace circular
    borderWidth: 1,
    borderColor: '#7A9191', // Ajusta este color al de tu diseño
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});