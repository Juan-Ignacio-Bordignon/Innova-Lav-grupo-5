import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors'; // Corregido a minúsculas

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.white 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 15 
  },
  backButton: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: colors.border, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  backButtonText: { 
    fontSize: 24, 
    color: colors.primary, 
    fontWeight: 'bold' 
  },
  headerTitleContainer: { 
    marginLeft: 15 
  },
  headerSubtitle: { 
    fontSize: 14, 
    color: colors.textSecondary 
  },
  headerTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: colors.secondary 
  },
  mainCard: { 
    flexDirection: 'row', 
    backgroundColor: '#F8F9FA', // Un gris clarito sutil para el fondo de la tarjeta
    marginHorizontal: 20, 
    marginVertical: 15, 
    padding: 20, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: colors.border 
  },
  mainCardIconPlaceholder: { 
    width: 60, 
    height: 60, 
    borderRadius: 15, 
    backgroundColor: colors.primary 
  },
  mainCardTextContainer: { 
    flex: 1, 
    marginLeft: 15, 
    justifyContent: 'center' 
  },
  mainCardTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: colors.primary 
  },
  mainCardDescription: { 
    fontSize: 13, 
    color: colors.textSecondary, 
    marginTop: 4 
  },
  listContainer: { 
    paddingHorizontal: 20, 
    paddingBottom: 20 
  },
  itemCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: colors.white, 
    borderWidth: 1, 
    borderColor: colors.border, 
    borderRadius: 18, 
    padding: 15, 
    marginBottom: 12, 
    shadowColor: colors.shadow, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 4, 
    elevation: 2 
  },
  itemLeftContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    flex: 1 
  },
  iconPlaceholder: { 
    width: 45, 
    height: 45, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: colors.primary, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  iconText: { 
    color: colors.primary 
  },
  itemTextContainer: { 
    marginLeft: 15 
  },
  itemTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: colors.primary 
  },
  itemStatus: { 
    fontSize: 12, 
    color: colors.textSecondary, 
    marginTop: 2 
  },
  arrow: { 
    fontSize: 20, 
    color: colors.textSecondary, 
    paddingHorizontal: 5 
  },
});