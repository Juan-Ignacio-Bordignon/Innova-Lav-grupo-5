import { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CommonActions, useNavigation, StaticScreenProps } from '@react-navigation/native';

import { AppText } from '../../../components/ui/AppText'; 
import { ROUTES } from '../../../constants/routes';
import { logout } from '../../auth/services/authService';

import { IconAgenda } from '../../../assets/icons/IconAgenda';

type Props = StaticScreenProps<{
  user: string;
}>;

export function Profile({ route }: Props) {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);

  // ¡Acá agregamos la rachaActual simulada para que el diseño la tome!
  const userMock = {
    name: 'Carolina',
    currentModule: 'Aprendiendo módulo 2\nFrases de entorno',
    progress: 65,
    completedLessons: 25,
    totalPoints: 70,
    pendingLessons: 22,
    rachaActual: 5, // 🔥 5 días de racha simulados
  };

  async function handleLogout() {
    try {
      setLoading(true);
      await logout();
      const rootNavigation = navigation.getParent() ?? navigation;
      rootNavigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: ROUTES.LOGIN }],
        }),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.webCenteringWrapper}>
      <View style={styles.mobileConstraints}>
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* 1. Header superior (¡Ahora con Racha!) */}
          <View style={styles.topBar}>
            <AppText style={styles.screenTitle}>Mi Perfil</AppText>
            
            <View style={styles.topIcons}>
              {/* Bloque visual de la Racha 🔥 */}
              <View style={styles.streakBadge}>
                <AppText style={styles.iconPlaceholder}>🔥</AppText>
                <AppText style={styles.streakText}>{userMock.rachaActual}</AppText>
              </View>

              <AppText style={styles.iconPlaceholder}>🏆</AppText>
              
              <View style={styles.bellContainer}>
                <AppText style={styles.iconPlaceholder}>🔔</AppText>
                <View style={styles.notificationBadge}>
                  <AppText style={styles.badgeText}>1</AppText>
                </View>
              </View>
            </View>
          </View>

          {/* 2. Tarjeta del Usuario */}
          <View style={styles.userCard}>
            <View style={styles.avatarCircle} />
            <View style={styles.userInfo}>
              <AppText style={styles.userName}>{userMock.name}</AppText>
              <AppText style={styles.userModule}>{userMock.currentModule}</AppText>
            </View>
          </View>

          {/* 3. Tarjeta de Progreso */}
          <View style={styles.progressCard}>
            <View style={styles.progressMainRow}>
              <View style={styles.progressLeftColumn}>
                <AppText style={styles.cardTitle}>Tu progreso</AppText>
                <AppText style={styles.progressText}>{userMock.progress}% completado</AppText>
                <AppText style={styles.progressText}>{userMock.completedLessons} lecciones completas</AppText>
                <AppText style={styles.progressText}>{userMock.totalPoints} puntos de experiencia acumulada</AppText>
              </View>
              
              <View style={styles.rightTrophyBox}>
                <AppText style={styles.bigTrophy}>🏆</AppText>
                <View style={styles.pointsBadgeInside}>
                  <AppText style={styles.pointsTextInside}>{userMock.totalPoints}</AppText>
                </View>
              </View>
            </View>
            
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${userMock.progress}%` }]} />
            </View>
            
            <AppText style={styles.pendingText}>{userMock.pendingLessons} lecciones pendientes</AppText>
          </View>

          {/* 4. Logros Recientes */}
          <View style={styles.achievementsSection}>
            <View style={styles.achievementsHeader}>
              <AppText style={styles.cardTitle}>Logros recientes</AppText>
              <TouchableOpacity>
                <AppText style={styles.seeAllText}>Ver todos</AppText>
              </TouchableOpacity>
            </View>
            
            <View style={styles.achievementsRow}>
              <View style={styles.achievementBadge}>
                <View style={styles.iconBox}>
                  <AppText style={styles.textIconAa}>Aa</AppText>
                </View>
                <AppText style={styles.achievementName}>Deletrear</AppText>
              </View>
              
              <View style={styles.achievementBadge}>
                <View style={styles.iconBox}>
                  <IconAgenda width={26} height={26} fill="#004C66" isCompleted={true} />
                </View>
                <AppText style={styles.achievementName}>En agenda</AppText>
              </View>
              
              <View style={styles.achievementBadge}>
                <View style={styles.iconBox}>
                  <AppText style={styles.textIconNumbers}>123</AppText>
                </View>
                <AppText style={styles.achievementName}>En orden</AppText>
              </View>
            </View>
          </View>

          {/* 5. Acciones Inferiores */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <AppText style={styles.menuIcon}>⚙️</AppText>
                <AppText style={styles.menuText}>Configuración</AppText>
              </View>
              <AppText style={styles.menuArrow}>›</AppText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <View style={styles.menuItemLeft}>
                <AppText style={styles.menuIcon}>🚪</AppText>
                <AppText style={styles.menuText}>Cerrar sesión</AppText>
              </View>
              <AppText style={styles.menuArrow}>›</AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* 6. BARRA DE NAVEGACIÓN INFERIOR FIJA */}
        <View style={styles.bottomTabBar}>
          <TouchableOpacity style={[styles.tabButton, styles.tabMustard]}>
            <AppText style={styles.tabIconText}>🏠</AppText>
            <AppText style={styles.tabLabelTextDark}>Inicio</AppText>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.tabButton, styles.tabMustard]}>
            <AppText style={styles.tabIconText}>⭐</AppText>
            <AppText style={styles.tabLabelTextDark}>Favoritos</AppText>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.tabButton, styles.tabBlueActive]}>
            <AppText style={styles.tabIconText}>👤</AppText>
            <AppText style={styles.tabLabelTextLight}>Perfil</AppText>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webCenteringWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#E8ECEF', 
  },
  mobileConstraints: {
    flex: 1,
    width: '100%',
    maxWidth: 400, 
    backgroundColor: '#FFFFFF', 
    position: 'relative', 
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, 
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004C66',
  },
  topIcons: {
    flexDirection: 'row',
    gap: 15, // Un poco más juntos para que entre la racha
    alignItems: 'center',
  },
  iconPlaceholder: {
    fontSize: 24,
  },
  // --- ESTILOS NUEVOS DE LA RACHA ---
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0E6', // Fondo naranjita claro
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6A15C',
  },
  streakText: {
    color: '#E6A15C',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 4,
  },
  // ----------------------------------
  bellContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#E6A15C',
    borderRadius: 8,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E8ED',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#004C66',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E6A15C',
    marginBottom: 4,
  },
  userModule: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E1E8ED',
  },
  progressMainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  progressLeftColumn: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004C66',
    marginBottom: 12,
  },
  rightTrophyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 5,
  },
  bigTrophy: {
    fontSize: 32,
  },
  pointsBadgeInside: {
    backgroundColor: '#E6A15C',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: -5,
  },
  pointsTextInside: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: 13,
    color: '#444',
    marginBottom: 6,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E1E8ED',
    borderRadius: 4,
    marginTop: 15,
    marginBottom: 8,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#004C66',
    borderRadius: 4,
  },
  pendingText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  achievementsSection: {
    marginBottom: 25,
  },
  achievementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 13,
    color: '#888',
  },
  achievementsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  achievementBadge: {
    width: '31%',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#E1E8ED',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#004C66', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  textIconAa: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004C66',
  },
  textIconNumbers: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004C66',
  },
  achievementName: {
    fontSize: 11,
    color: '#555',
    textAlign: 'center',
    fontWeight: '500',
  },
  actionsContainer: {
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E8ED',
    borderRadius: 18,
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  menuText: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
  },
  menuArrow: {
    fontSize: 18,
    color: '#A0AEC0',
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderColor: '#E1E8ED',
    paddingBottom: 10,
  },
  tabButton: {
    flex: 1,
    height: 50,
    marginHorizontal: 5,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabMustard: {
    backgroundColor: '#E6A15C', 
  },
  tabBlueActive: {
    backgroundColor: '#004C66', 
  },
  tabIconText: {
    fontSize: 18,
    marginBottom: 2,
  },
  tabLabelTextDark: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#222222',
  },
  tabLabelTextLight: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
