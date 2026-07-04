import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { IconFlechaIzquierda } from '../../../assets/icons/IconFlechaIzquierda';

export const LessonHeader = ({ navigation }: { navigation: any }) => (
  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
    <IconFlechaIzquierda />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  backButton: { padding: 10 },
});