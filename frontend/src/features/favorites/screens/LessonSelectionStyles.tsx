import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';

export const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, backgroundColor: colors.backgroundApp },
  categoryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 20,
    marginVertical: 16,
    elevation: 3,
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  categoryTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
    
  },
  categorySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  lessonCard: { 
    flex: 1, 
    aspectRatio: 1,
    margin: 6, 
    height: 100, 
    backgroundColor: colors.surface, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});