import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import IconModulePhrases from '../../../assets/icons/ux/modules/IconModulePhrases.svg';
import IconModuleWords from '../../../assets/icons/ux/modules/IconModuleWords.svg';

import {
  AnimatedProgressBar,
  AppText,
} from '../../../components/ui';

import { colors } from '../../../constants/colors';
import { fonts } from '../../../theme/fonts';

import type { HomeModule } from '../types';

type ModuleCardProps = {
  module: HomeModule;
  onPress?: () => void;
  animationKey?: number;
};

export function ModuleCard({
  module,
  onPress,
  animationKey = 0,
}: ModuleCardProps) {
  const safeProgress = Math.max(
    0,
    Math.min(Number(module.progress) || 0, 100),
  );

  const description =
    module.description?.trim() ?? '';

  /*
   * Algunas versiones del servicio usan la descripción
   * para mostrar "Tu avance: 0%".
   *
   * Como ahora el progreso tiene su propia sección,
   * evitamos repetir esa información.
   */
  const shouldShowDescription =
    description.length > 0 &&
    !/^tu avance\s*:/i.test(description);

  const progressLabel =
    safeProgress >= 100
      ? 'Completado'
      : safeProgress > 0
        ? 'En progreso'
        : 'Sin comenzar';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${module.title} ${module.subtitle}. ${safeProgress}% completado`}
      accessibilityHint="Abre las lecciones de este módulo"
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.iconBox}>
        {module.icon === 'words' ? (
          <IconModuleWords
            width={88}
            height={74}
          />
        ) : (
          <IconModulePhrases
            width={88}
            height={72}
          />
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.titleSection}>
          <AppText
            numberOfLines={1}
            style={styles.moduleEyebrow}
          >
            {module.title}
          </AppText>

          <View style={styles.moduleNameRow}>
            <AppText
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.moduleName}
            >
              {module.subtitle}
            </AppText>

            <MaterialIcons
              name="arrow-forward-ios"
              size={16}
              color={colors.primary}
              style={styles.arrowIcon}
            />
          </View>
        </View>

        {shouldShowDescription ? (
          <AppText
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.description}
          >
            {description}
          </AppText>
        ) : null}

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <AppText style={styles.progressStatus}>
              {progressLabel}
            </AppText>

            <AppText style={styles.progressPercentage}>
              {safeProgress}%
            </AppText>
          </View>

          <AnimatedProgressBar
            progress={safeProgress}
            triggerKey={animationKey}
            delay={420}
            duration={850}
            trackStyle={styles.progressTrack}
            fillStyle={styles.progressFill}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 144,

    flexDirection: 'row',
    alignItems: 'center',

    padding: 14,
    marginBottom: 16,

    borderRadius: 20,
    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: '#E4E9EA',

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  cardPressed: {
    opacity: 0.94,
    transform: [
      {
        scale: 0.985,
      },
    ],
  },

  iconBox: {
    width: 112,
    height: 112,

    borderRadius: 18,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.primary,

    marginRight: 16,
  },

  content: {
    flex: 1,
    minWidth: 0,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },

  titleSection: {
    width: '100%',
  },

  moduleEyebrow: {
    fontFamily: fonts.medium,
    fontSize: 11,
    lineHeight: 15,

    letterSpacing: 0.7,
    textTransform: 'uppercase',

    color: colors.textSecondary,

    marginBottom: 2,
  },

  moduleNameRow: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 6,
  },

  moduleName: {
    flex: 1,

    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 25,

    color: colors.textPrimary,
  },

  arrowIcon: {
    marginLeft: 6,
  },

  description: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 17,

    color: colors.textSecondary,

    marginBottom: 10,
  },

  progressSection: {
    width: '100%',
    marginTop: 4,
  },

  progressHeader: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 6,
  },

  progressStatus: {
    fontFamily: fonts.medium,
    fontSize: 11,
    lineHeight: 15,

    color: colors.textSecondary,
  },

  progressPercentage: {
    fontFamily: fonts.bold,
    fontSize: 11,
    lineHeight: 15,

    color: colors.primary,
  },

  progressTrack: {
    width: '100%',
    height: 8,

    borderRadius: 4,

    backgroundColor: '#E1E5E6',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
});