import { apiClient } from '../../../services/api/apiClient';
import { ENDPOINTS } from '../../../services/api/endpoints';
import { getAuthToken } from '../../../services/storage/authStorage';
import type { ModulesResponse } from '../../modules/types';

import type {
  AchievementVisualKey,
  ProfileAchievement,
  ProfileOverview,
  RawAchievementsResponse,
  RawCurrentUserResponse,
  RawEarnedAchievement,
  RawUserAchievement,
  RawUserProgressItem,
} from '../types';

type AchievementCatalogItem = {
  id: string;
  name: string;
  description: string;
  icon: string;
  visualKey: AchievementVisualKey;
  aliases: string[];
};

const ACHIEVEMENT_CATALOG: AchievementCatalogItem[] = [
  {
    id: 'alphabet',
    name: 'Abecedario',
    description: 'Completaste la lección del abecedario.',
    icon: '🔤',
    visualKey: 'alphabet',
    aliases: ['abecedario', 'alfabeto'],
  },
  {
    id: 'days',
    name: 'Días',
    description: 'Completaste la lección de los días de la semana.',
    icon: '📅',
    visualKey: 'days',
    aliases: ['dias', 'dias de la semana'],
  },
  {
    id: 'numbers',
    name: 'Números',
    description: 'Completaste la lección de números.',
    icon: '🔢',
    visualKey: 'numbers',
    aliases: ['numeros', 'numero'],
  },
  {
    id: 'feelings',
    name: 'Sentimientos',
    description: 'Completaste la lección de sentimientos.',
    icon: '💛',
    visualKey: 'feelings',
    aliases: ['sentimientos', 'emociones'],
  },
  {
    id: 'greetings',
    name: 'Saludos',
    description: 'Completaste la lección de saludos.',
    icon: '👋',
    visualKey: 'greetings',
    aliases: ['saludos', 'saludo'],
  },
  {
    id: 'introductions',
    name: 'Presentaciones',
    description: 'Completaste la lección de presentaciones.',
    icon: '💬',
    visualKey: 'introductions',
    aliases: ['presentaciones', 'presentacion'],
  },
  {
    id: 'environment',
    name: 'Entorno',
    description: 'Completaste la lección de entorno.',
    icon: '🏠',
    visualKey: 'environment',
    aliases: ['entorno', 'hogar'],
  },
  {
    id: 'emergency',
    name: 'Emergencia',
    description: 'Completaste la lección de emergencia.',
    icon: '⚠️',
    visualKey: 'emergency',
    aliases: ['emergencia', 'emergencias'],
  },
  {
    id: 'perfect',
    name: 'Sin errores',
    description: 'Completaste una lección sin errores.',
    icon: '✅',
    visualKey: 'perfect',
    aliases: ['sin errores', 'sin error', 'perfecto'],
  },
  {
    id: 'diploma',
    name: 'Diploma',
    description: 'Completaste todos los objetivos principales.',
    icon: '🏆',
    visualKey: 'diploma',
    aliases: ['diploma', 'campeon', 'trofeo'],
  },
];

export async function getProfileOverview(): Promise<ProfileOverview> {
  const token = await getAuthToken();

  if (!token) {
    throw new Error('No se encontró una sesión activa.');
  }

  const [userResponse, modulesResponse, achievementsResponse] =
    await Promise.all([
      apiClient<RawCurrentUserResponse>(ENDPOINTS.USER, {
        method: 'GET',
        token,
      }),

      apiClient<ModulesResponse>(ENDPOINTS.MODULES, {
        method: 'GET',
      }).catch(() => ({
        modules: [],
      })),

      apiClient<RawAchievementsResponse>(
        ENDPOINTS.USER_ACHIEVEMENTS,
        {
          method: 'GET',
          token,
        },
      ).catch(() => null),
    ]);

  const completedLessonKeys = getCompletedLessonKeys(
    userResponse.progreso,
  );

  const totalLessons = modulesResponse.modules.reduce(
    (total, module) => total + module.lecciones.length,
    0,
  );

  const completedLessons =
    totalLessons > 0
      ? Math.min(completedLessonKeys.size, totalLessons)
      : completedLessonKeys.size;

  const pendingLessons = Math.max(
    totalLessons - completedLessons,
    0,
  );

  const progressPercentage =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  const earnedAchievements = achievementsResponse
    ? achievementsResponse.logros
    : userResponse.logros.map(mapFlatAchievementToEarned);

  return {
    username: userResponse.usuario.username || 'Usuario',
    email: userResponse.usuario.email || '',
    completedLessons,
    pendingLessons,
    totalLessons,
    progressPercentage,
    points: Number(userResponse.puntos) || 0,
    streak: Number(userResponse.racha) || 0,
    achievements: mergeAchievementsWithCatalog(
      earnedAchievements,
    ),
  };
}

function getCompletedLessonKeys(
  progress: RawUserProgressItem[],
) {
  const completedLessons = new Set<string>();

  progress.forEach((item) => {
    if (!item.completadoEn) {
      return;
    }

    const moduleId =
      item.moduleId ??
      item.ModuleId ??
      item.moduloId ??
      'module';

    const lessonId =
      item.lessonId ??
      item.LessonId ??
      item.leccionId;

    if (lessonId === undefined || lessonId === null) {
      return;
    }

    completedLessons.add(`${moduleId}:${lessonId}`);
  });

  return completedLessons;
}

function mapFlatAchievementToEarned(
  achievement: RawUserAchievement,
): RawEarnedAchievement {
  return {
    id: achievement.id,
    logroId: achievement.id,
    fechaObtenido: '',
    logro: achievement,
  };
}

function mergeAchievementsWithCatalog(
  earnedAchievements: RawEarnedAchievement[],
): ProfileAchievement[] {
  const consumedAchievementIds = new Set<number>();

  const catalogAchievements = ACHIEVEMENT_CATALOG.map(
    (catalogItem) => {
      const earnedAchievement = earnedAchievements.find(
        (item) => {
          if (consumedAchievementIds.has(item.id)) {
            return false;
          }

          const isMatch = catalogItem.aliases.some((alias) =>
            normalizeText(item.logro.nombre).includes(
              normalizeText(alias),
            ),
          );

          if (isMatch) {
            consumedAchievementIds.add(item.id);
          }

          return isMatch;
        },
      );

      return {
        id: catalogItem.id,
        backendId: earnedAchievement?.logro.id,
        name:
          earnedAchievement?.logro.nombre ||
          catalogItem.name,
        description:
          earnedAchievement?.logro.descripcion ||
          catalogItem.description,
        icon:
          earnedAchievement?.logro.icono ||
          catalogItem.icon,
        visualKey: catalogItem.visualKey,
        achieved: Boolean(earnedAchievement),
        achievedAt:
          earnedAchievement?.fechaObtenido || undefined,
      } satisfies ProfileAchievement;
    },
  );

  const extraAchievements = earnedAchievements
    .filter(
      (item) => !consumedAchievementIds.has(item.id),
    )
    .map(
      (item): ProfileAchievement => ({
        id: `backend-${item.id}`,
        backendId: item.logro.id,
        name: item.logro.nombre,
        description: item.logro.descripcion,
        icon: item.logro.icono,
        visualKey: 'generic',
        achieved: true,
        achievedAt: item.fechaObtenido || undefined,
      }),
    );

  return [
    ...catalogAchievements,
    ...extraAchievements,
  ].sort((first, second) => {
    if (first.achieved !== second.achieved) {
      return first.achieved ? -1 : 1;
    }

    const firstDate = first.achievedAt
      ? new Date(first.achievedAt).getTime()
      : 0;

    const secondDate = second.achievedAt
      ? new Date(second.achievedAt).getTime()
      : 0;

    return secondDate - firstDate;
  });
}

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}