import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BackButton } from '../../../assets/icons/BackButton';
import { AppText } from '../../../components/ui'; // Ajusta la ruta a tu AppText
import { colors } from '../../../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const LessonHeader = ({ navigation, title }: { navigation: any, title: string }) => 
  (
  <View style={styles.headerContainer}>
    {/* Botón a la izquierda */}
    <View style={styles.leftContainer}>
      <BackButton onPress={() => navigation.goBack()} />
    </View>

    {/* Título centrado */}
    <View style={styles.centerContainer}>
      <AppText style={styles.title}>{title}</AppText>
    </View>

    {/* Espacio a la derecha para equilibrar el centrado */}
    <View style={styles.rightContainer} />
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50, // 👈 
    height: 100,
    backgroundColor: colors.backgroundApp,
  },
  leftContainer: { width: 50 }, // Espacio fijo para el botón
  centerContainer: { flex: 1, alignItems: 'center' },
  rightContainer: { width: 50 }, // Mismo ancho que la izquierda para centrar perfecto
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.primary,
  },
});