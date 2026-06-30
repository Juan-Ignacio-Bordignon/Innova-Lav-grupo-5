import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '../../../components/ui';
import { colors } from '../../../constants/colors';

type HomeHeaderProps = {
  userName: string;
  notificationsCount?: number;
};

export function HomeHeader({
  userName,
  notificationsCount = 1,
}: HomeHeaderProps) {
  return (
    <View style={styles.container}>
        
      <AppText variant="body" style={styles.greeting} numberOfLines={1}>
        ¡Hola {userName}!
      </AppText>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ver logros"
          style={styles.iconButton}
        >
          <MaterialIcons
            name="emoji-events"
            size={25}
            color={colors.textLight}
          />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ver notificaciones"
          style={styles.iconButton}
        >
          <MaterialIcons
            name="notifications-none"
            size={25}
            color={colors.textLight}
          />

          {notificationsCount > 0 ? (
            <View style={styles.badge}>
              <AppText variant="small" style={styles.badgeText}>
                {notificationsCount}
              </AppText>
            </View>
          ) : null}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  greeting: {
    flex: 1,
    fontSize: 22,
    lineHeight: 31,
    color: colors.textPrimary,
    marginRight: 14,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  iconButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 5,
  },

  badge: {
    position: 'absolute',
    top: -7,
    right: -5,
    width: 23,
    height: 23,
    borderRadius: 12,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    color: colors.primary,
    fontSize: 12,
    lineHeight: 15,
  },
});