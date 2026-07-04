import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F9FA' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  categoryBanner: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, alignItems: 'center', marginBottom: 20 },
  categoryNumber: { fontSize: 40, fontWeight: 'bold' },
  categoryLabel: { fontSize: 16, color: '#000' }, 
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  lessonCard: { 
    flex: 1, 
    margin: 5, 
    height: 100, 
    backgroundColor: '#FFF', 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
});