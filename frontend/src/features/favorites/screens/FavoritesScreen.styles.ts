import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';

export const styles = StyleSheet.create({
  // En FavoritesScreen.styles.ts
categoryCard: {
  width: '100%', // Mantiene el tamaño para 3 columnas
  alignItems: 'center',      // Centra el ícono y el texto horizontalmente
  justifyContent: 'center',
  padding:16,  // Centra verticalmente
  paddingVertical: 12,       // Ajustado para que no sea muy alto
  paddingHorizontal: 8,      // Menos padding lateral para que el texto respire
  borderRadius: 12,
  backgroundColor: '#FFFFFF',
  flexDirection: 'row',   // Cambiado a COLUMN para que el ícono esté arriba y el texto abajo
  marginBottom: 15,          // Un poco más de espacio entre filas
  borderWidth: 1,
  borderColor: '#F1F5F9',
  // Sombra estándar para dar profundidad
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 3,
  elevation: 2,
},
  categoryTitle: {
  marginLeft: 16,           // Espacio entre el ícono y el texto
  fontSize: 16,
  fontWeight: '500',
  color: '#1B434D',
  flex: 1,
},
  safeArea: {
    flex: 1,
    backgroundColor: colors.background || '#F8F9FA',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  mainTitle: {
    fontSize: 24,
    color: '#1B434D',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary || '#4A646C',
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'colors.primary',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 12,
    height: 50,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1B434D',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  tabButton: {
    width: '48%',
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#1B434D',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  tabButtonActive: {
    backgroundColor: '#1B434D',
  },
  tabText: {
    fontWeight: 'bold',
    color: '#1B434D',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    color: '#1B434D',
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateDesc: {
    textAlign: 'center',
    color: colors.textSecondary || '#4A646C',
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  exploreButton: {
    backgroundColor: '#1B434D',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    marginTop: 8,
  },
  listTitle: {
    fontSize: 18,
    color: '#1B434D',
    marginBottom: 16,
  },

 
  bottomSpacing: {
    height: 80,
  }, })