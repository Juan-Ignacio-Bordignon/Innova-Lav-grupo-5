// src/features/modules/screens/ModuleDetailScreen.tsx
import React from 'react';
import { IconPalabras } from '../../../assets/icons/IconPalabras'; // Importación nombrada del ícono específico
import { View, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { useNavigation } from '@react-navigation/native';
import { MOCK_PALABRAS_DETAIL, SubCategoryItem } from '../../../data/mocks/homeMocks';
import { AppText } from '../../../components/ui/AppText'; 
import { styles } from './ModuleDetailScreen.styles';
import { colors } from '../../../constants/colors'; 

// 📥 Importamos de forma nombrada tus 4 componentes de código nativo TSX puros
import { IconDeletrear } from '../../../assets/icons/IconDeletrear';
import { IconAgenda } from '../../../assets/icons/IconAgenda';
import { IconNumeros } from '../../../assets/icons/IconNumeros';
import { IconSentimientos } from '../../../assets/icons/IconSentimientos';

export const ModuleDetailScreen = () => {
  const navigation = useNavigation();
  const { title, description, items } = MOCK_PALABRAS_DETAIL;

  // Renderizado dinámico y seguro usando los componentes matemáticos de UX
  const renderIcon = (iconName: string) => {
    // Los íconos en la lista siempre van con isCompleted={false} o según su estado real
    const iconProps = { width: 24, height: 24, fill: colors.primary, isCompleted: false };

    switch (iconName) {
      case 'font':
        return <IconDeletrear {...iconProps} />;
      case 'calendar':
        return <IconAgenda {...iconProps} />;
      case 'numeric':
        return <IconNumeros {...iconProps} />; 
      case 'shield-heart':
        return <IconSentimientos {...iconProps} />;
      default:
        return null;
    }
  };

  const renderSubCategoryItem = ({ item }: { item: SubCategoryItem }) => (
    <TouchableOpacity 
      style={styles.itemCard}
      onPress={() => navigation.navigate('Exercise' as never)} 
    >
      <View style={styles.itemLeftContainer}>
        <View style={styles.iconPlaceholder}>
          {renderIcon(item.iconName)}
        </View>
        <View style={styles.itemTextContainer}>
          <AppText style={styles.itemTitle}>{item.title}</AppText>
          <AppText style={styles.itemStatus}>{item.status}</AppText>
        </View>
      </View>
      <AppText style={styles.arrow}>›</AppText>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AppText style={styles.backButtonText}>‹</AppText>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <AppText style={styles.headerSubtitle}>Categoría:</AppText>
          <AppText style={styles.headerTitle}>{title}</AppText>
        </View>
      </View>

     {/* Tarjeta Informativa Principal */}
      <View style={styles.mainCard}>
        {/* Reemplazamos el Placeholder por el componente SVG real */}
        <View style={styles.mainCardIconContainer}> 
          <IconPalabras width={80} height={80} /> 
        </View>
        <View style={styles.mainCardTextContainer}>
          <AppText style={styles.mainCardTitle}>{title}</AppText>
          <AppText style={styles.mainCardDescription}>{description}</AppText>
        </View>
      </View>

      {/* Listado de Lecciones */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderSubCategoryItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};