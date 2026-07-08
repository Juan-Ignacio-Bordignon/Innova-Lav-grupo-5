import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, SafeAreaView, FlatList } from 'react-native';
import { styles } from './FavoritesScreen.styles';
import { AppText } from '../../../components/ui/AppText'; 
import { colors } from '../../../constants/colors';
import { CategoryIcon, IconState } from '../components/FavoriteIcons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../modules/types'; // Ruta a tus tipos
import { IconFavoritos } from '../../../assets/icons/IconFavoritos';
// Importamos nuestros datos mockeados
import { MOCK_FAVORITES, FavoriteItem } from '../../../data/mocks/mockFavorites';
import { SearchIcon } from '../../../assets/icons/SearchIcon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { ROUTES } from '../../../constants/routes';

type TabType = 'Palabras' | 'Frases';
type FavoritesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Favorites'>;

export function FavoritesScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('Palabras');
  // 1. Estado para guardar lo que el usuario escribe
const [searchText, setSearchText] = useState('');
const navigation = useNavigation<FavoritesScreenNavigationProp>();
// 2. Filtramos en dos niveles: 
// Primero por pestaña (Palabras/Frases) y luego por texto (título)
const filteredData = MOCK_FAVORITES.filter(item => {
  const matchesTab = item.type === activeTab;
  const matchesSearch = item.title.toLowerCase().includes(searchText.toLowerCase());
  return matchesTab && matchesSearch;
});
  
  // Filtramos los datos según la pestaña activa
  
  const isEmpty = filteredData.length === 0;

return (
  <SafeAreaView style={styles.safeArea}>
    <FlatList
      data={filteredData} // <--- Aquí usamos la constante que definimos arriba
      keyboardShouldPersistTaps="handled"
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      
      // Todo lo que estaba antes del .map() ahora vive aquí:
      ListHeaderComponent={
        <View>
          <AppText variant="title" style={styles.mainTitle}>Favoritos</AppText>
          <AppText variant="body" style={styles.subtitle}>¿Qué lección repasamos?</AppText>

      {/* BUSCADOR */}
  <View style={styles.searchContainer}>
  <SearchIcon color={colors.primary} /> {/* Usando el nuevo icono */}
  <TextInput 
    placeholder="Buscar"
    style={styles.searchInput}
    placeholderTextColor={colors.textSecondary || "#A0AEC0"}
    value={searchText}
    onChangeText={setSearchText}
  />
  </View>

          <View style={styles.tabContainer}>
            {(['Palabras', 'Frases'] as TabType[]).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[styles.tabButton, isActive && styles.tabButtonActive]}
                >
                  <AppText style={[styles.tabText, isActive && styles.tabTextActive]}>
                    {tab}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Renderizado de estado vacío si no hay favoritos */}
          {isEmpty && (
            <View style={styles.emptyStateContainer}>
            {/* Aquí agregas el ícono */}
    <IconFavoritos width={100} height={100} />
              <AppText variant="title" style={styles.emptyStateTitle}>
                Tu espacio de repaso está vacío
              </AppText>
              <AppText variant="body" style={styles.emptyStateDesc}>
                Guardá tus señas favoritas para volver a practicarlas.
              </AppText>
              <TouchableOpacity style={styles.exploreButton}>
                <AppText style={styles.exploreButtonText}>Explorar módulos</AppText>
              </TouchableOpacity>
            </View>
          )}

          {!isEmpty && <AppText variant="title" style={styles.listTitle}>Para repasar</AppText>}
        </View>
      }

      // El renderizado de los items que están en "Para repasar"
      renderItem={({ item }) => (
        <TouchableOpacity 
    style={styles.categoryCard} 
    activeOpacity={0.7}
   onPress={() => {
    navigation.navigate(ROUTES.LESSON_SELECTION, { categoryId: item.id });
  }}

  >
    <CategoryIcon state={item.status as IconState} />
    <AppText style={styles.categoryTitle}>{item.title}</AppText>
  </TouchableOpacity>
      )}
    />
  </SafeAreaView>
);}


