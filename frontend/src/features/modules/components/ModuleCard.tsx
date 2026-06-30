import {
  Pressable,
  StyleSheet,
  View,
  type DimensionValue,
} from 'react-native';

import { AppText } from '../../../components/ui';
import { colors } from '../../../constants/colors';
import type { HomeModule } from '../types';
import { AnimatedProgressBar } from '../../../components/ui';

import IconModulePhrases from '../../../assets/icons/ux/modules/IconModulePhrases.svg';
import IconModuleWords from '../../../assets/icons/ux/modules/IconModuleWords.svg';

type ModuleCardProps = {
  module: HomeModule;
  onPress?: () => void;
  animationKey?: number;
};

export function ModuleCard({ module, onPress, animationKey = 0, }: ModuleCardProps) {
  const safeProgress = Math.max(0, Math.min(module.progress, 100));
  const progressWidth = `${safeProgress}%` as DimensionValue;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${module.title} ${module.subtitle}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.iconBox}>
        {module.icon === 'words' ? (
          <IconModuleWords width={103} height={85} />
        ) : (
          <IconModulePhrases width={100} height={82} />
        )}
      </View>

      <View style={styles.content}>
        <AppText variant="subtitle" style={styles.moduleTitle}>
          {module.title}
        </AppText>

        <AppText variant="subtitle" style={styles.moduleSubtitle}>
          {module.subtitle}
        </AppText>

        <AppText variant="body" style={styles.description}>
          {module.description}
        </AppText>

        <AnimatedProgressBar
          progress={module.progress}
          triggerKey={animationKey}
          delay={450}
          duration={850}
          trackStyle={styles.progressTrack}
          fillStyle={styles.progressFill}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 158,
    borderRadius: 24,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 22,

    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  cardPressed: {
    opacity: 0.94,
    transform: [{ scale: 0.99 }],
  },

  iconBox: {
    width: 132,
    height: 132,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
  },

  moduleTitle: {
    fontSize: 22,
    lineHeight: 27,
  },

  moduleSubtitle: {
    fontSize: 22,
    lineHeight: 27,
    marginBottom: 18,
  },

  description: {
    marginBottom: 10,
    color: colors.textPrimary,
  },

  progressTrack: {
    width: '100%',
    height: 13,
    borderRadius: 8,
    backgroundColor: '#D8D8D8',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
});