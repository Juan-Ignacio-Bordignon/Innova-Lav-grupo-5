import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native'; // Quitamos SafeAreaView de acá
import { SafeAreaView } from 'react-native-safe-area-context'; // Lo importamos de la librería moderna
import { useNavigation } from '@react-navigation/native';
import { MOCK_PALABRAS_DETAIL, SubCategoryItem } from '../../../data/mocks/homeMocks';
import { AppText } from '../../../components/ui/AppText'; 
import { styles } from './ModuleDetailScreen.styles'; // Importación limpia

export const ModuleDetailScreen = () => {
  const navigation = useNavigation();
  const { title, description, items } = MOCK_PALABRAS_DETAIL;

  const renderSubCategoryItem = ({ item }: { item: SubCategoryItem }) => (
    <TouchableOpacity 
      style={styles.itemCard}
      onPress={() => navigation.navigate('Exercise' as never)}
    >
      <View style={styles.itemLeftContainer}>
        <View style={styles.iconPlaceholder}>
          <AppText style={styles.iconText}>★</AppText> 
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
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AppText style={styles.backButtonText}>‹</AppText>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <AppText style={styles.headerSubtitle}>Categoría:</AppText>
          <AppText style={styles.headerTitle}>{title}</AppText>
        </View>
      </View>

      <View style={styles.mainCard}>
        <View style={styles.mainCardIconPlaceholder} />
        <View style={styles.mainCardTextContainer}>
          <AppText style={styles.mainCardTitle}>{title}</AppText>
          <AppText style={styles.mainCardDescription}>{description}</AppText>
        </View>
      </View>

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