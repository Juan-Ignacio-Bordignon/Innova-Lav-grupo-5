import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, SafeAreaView, FlatList } from 'react-native';
import { styles } from './FavoritesScreen.styles';
import { AppText } from '../../../components/ui/AppText'; 
import { colors } from '../../../constants/colors';
import { CategoryIcon, IconState } from '../components/FavoriteIcons';

// Importamos nuestros datos mockeados
import { MOCK_FAVORITES, FavoriteItem } from '../../../data/mocks/mockFavorites';

type TabType = 'Palabras' | 'Frases';

export function FavoritesScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('Palabras');
  
  // Filtramos los datos según la pestaña activa
  const favoriteCategories = MOCK_FAVORITES.filter(item => item.type === activeTab);
  const isEmpty = favoriteCategories.length === 0;

return (
  <SafeAreaView style={styles.safeArea}>
    <FlatList
      data={favoriteCategories}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      
      // Todo lo que estaba antes del .map() ahora vive aquí:
      ListHeaderComponent={
        <View>
          <AppText variant="title" style={styles.mainTitle}>Favoritos</AppText>
          <AppText variant="body" style={styles.subtitle}>¿Qué lección repasamos?</AppText>

          <View style={styles.searchContainer}>
            <AppText style={styles.searchIcon}>🔍</AppText>
            <TextInput 
              placeholder="Buscar"
              style={styles.searchInput}
              placeholderTextColor={colors.textSecondary || "#A0AEC0"}
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
              <CategoryIcon state="notStarted" />
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
        <TouchableOpacity style={styles.categoryCard} activeOpacity={0.7}>
          <CategoryIcon state={item.status as IconState} />
          <AppText style={styles.categoryTitle}>{item.title}</AppText>
        </TouchableOpacity>
      )}
    />
  </SafeAreaView>
);}


