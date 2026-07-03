import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { styles } from './FavoritesScreen.styles';


// Importaciones de tu sistema de diseño
import { AppText } from '../../../components/ui/AppText'; 
import { colors } from '../../../constants/colors';

// Importamos los íconos (Asegurate de haber creado este archivo según la tarea del issue)
import {CategoryIcon,IconState } from '../components/FavoriteIcons';

type TabType = 'Palabras' | 'Frases';

export function FavoritesScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('Palabras');
  
  // Mock temporal para simular el cambio de estado (Palabras tiene items, Frases está vacío)
  const favoriteCategories = activeTab === 'Palabras' ? [
    { id: 1, title: 'Abecedario', status: 'completed' },
    { id: 2, title: 'Días de la semana', status: 'completed' },
    { id: 3, title: 'Números', status: 'notStarted' },
  ] : [];

  const isEmpty = favoriteCategories.length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <AppText variant="title" style={styles.mainTitle}>Favoritos</AppText>
        <AppText variant="body" style={styles.subtitle}>¿Qué lección repasamos?</AppText>

        {/* BUSCADOR */}
        <View style={styles.searchContainer}>
          <AppText style={styles.searchIcon}>🔍</AppText>
          <TextInput 
            placeholder="Buscar"
            style={styles.searchInput}
            placeholderTextColor={colors.textSecondary || "#A0AEC0"}
          />
        </View>

        {/* TAB TOGGLE (Palabras / Frases) */}
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

        {/* RENDERIZADO CONDICIONAL */}
        {isEmpty ? (
          <View style={styles.emptyStateContainer}>
            <CategoryIcon state="notStarted" />
            <AppText variant="title" style={styles.emptyStateTitle}>
              Tu espacio de repaso está vacío
            </AppText>
            <AppText variant="body" style={styles.emptyStateDesc}>
              Guardá tus señas favoritas para volver a practicarlas.
            </AppText>
            
            {/* Botón Explorar */}
            <TouchableOpacity style={styles.exploreButton}>
              <AppText style={styles.exploreButtonText}>Explorar módulos</AppText>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.listContainer}>
            <AppText variant="title" style={styles.listTitle}>Para repasar</AppText>
            
            {favoriteCategories.map((cat) => (
              <TouchableOpacity key={cat.id} style={styles.categoryCard} activeOpacity={0.7}>
                <CategoryIcon state={cat.status as IconState} />
                <AppText style={styles.categoryTitle}>{cat.title}</AppText>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}


