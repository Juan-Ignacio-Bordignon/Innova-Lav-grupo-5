import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from '../ui/AppText';
import { colors } from '../../constants/colors';
import { IconInicio } from '../../assets/icons/IconInicio';
import { IconRepaso } from '../../assets/icons/IconRepaso';
import { IconPerfil } from '../../assets/icons/IconPerfil';

export const ModuleFooter = () => {
  return (
    <View style={styles.footerContainer}>
     <TouchableOpacity style={styles.navItem}>
        <IconInicio size={24} color={colors.primary} />
        <AppText style={styles.navText}>Inicio</AppText>
    </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => console.log('Ir a Repaso')}>
        <IconRepaso size={24} color={colors.primary} />
        <AppText style={styles.navText}>Repaso</AppText>
      </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
        <IconPerfil size={24} color={colors.primary} />
        <AppText style={styles.navText}>Perfil</AppText>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
  }
});