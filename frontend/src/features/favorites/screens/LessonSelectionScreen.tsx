import React from 'react';
import { SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../modules/types'; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import { AppText } from '../../../components/ui/AppText';
import { View, FlatList, StyleSheet } from 'react-native';
import { styles } from './LessonSelectionStyles';
import { IconNumeros } from '../../../assets/icons/IconNumeros';
import { colors } from '../../../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'LessonSelection'>;

export function LessonSelectionScreen({ route }: Props) {
  const { categoryId } = route.params;
  // Mock de datos para la grilla (luego esto vendrá de tu API/Store)
  const lessons = [1, 2, 3, 4, 5, 6];

 return (
    <View style={styles.container}>
     

      {/* 2. Banner de Categoría */}
      <View style={styles.categoryBanner}>
       <IconNumeros color={colors.primary} />
       <View style={styles.categoryTextContainer}>
    {/* Asegúrate de usar el nombre correcto definido en tu StyleSheet */}
    <AppText style={styles.categoryTitle}>Categoría {categoryId}</AppText>
    <AppText style={styles.categorySubtitle}>Lecciones Guardadas</AppText>
  </View>
      </View>

      {/* 3. Grilla de Lecciones */}
      <AppText style={styles.sectionTitle}>Lecciones guardadas</AppText>
      <FlatList
        data={lessons}
        numColumns={3} // Esto crea la grilla de 3 columnas
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View style={styles.lessonCard}>
            <AppText>Lección {item}</AppText>
          </View>
        )}
      />
    </View>
  );
}