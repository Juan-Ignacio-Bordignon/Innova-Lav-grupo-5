import { getLessonExercises } from '../../lessons/services/lessonsService';

import type { LessonExercise } from '../../lessons/types';
import type {
  ApiModule,
  LessonStatus,
} from '../../modules/types';

import type { ProgressEntryApi } from '../types';

export type LearningProgressOverview = {
  totalLessons: number;
  completedLessons: number;
  pendingLessons: number;

  totalContents: number;
  completedContents: number;

  progressPercentage: number;

  moduleProgressById: Map<string, number>;
  lessonStatusByKey: Map<string, LessonStatus>;
};

type LessonCatalogItem = {
  moduleId: string;
  lessonId: string;
  contents: LessonExercise[];
};

/**
 * Calcula el progreso real del usuario.
 *
 * - Las teorías y ejercicios se cuentan individualmente.
 * - Una lección solamente está completa si todos sus contenidos
 *   están completos.
 * - El porcentaje general se calcula sobre contenidos, no solamente
 *   sobre lecciones tocadas.
 */
export async function buildLearningProgressOverview(
  modules: ApiModule[],
  progressEntries: ProgressEntryApi[],
): Promise<LearningProgressOverview> {
  const lessonCatalog =
    await loadLessonCatalog(modules);

  const completedContentKeys =
    createCompletedContentKeys(progressEntries);

  const startedLessonKeys =
    createStartedLessonKeys(progressEntries);

  const lessonStatusByKey =
    new Map<string, LessonStatus>();

  const moduleContentStats = new Map<
    string,
    {
      total: number;
      completed: number;
    }
  >();

  let totalContents = 0;
  let completedContents = 0;
  let completedLessons = 0;

  lessonCatalog.forEach((lesson) => {
    const lessonKey = createLessonKey(
      lesson.moduleId,
      lesson.lessonId,
    );

    /*
     * Usamos Set por seguridad, por si el backend devuelve
     * accidentalmente algún contenido repetido.
     */
    const contentKeys = new Set(
      lesson.contents.map((content) =>
        createLessonContentKey({
          moduleId: lesson.moduleId,
          lessonId: lesson.lessonId,
          content,
        }),
      ),
    );

    const lessonTotalContents =
      contentKeys.size;

    const lessonCompletedContents =
      Array.from(contentKeys).filter((key) =>
        completedContentKeys.has(key),
      ).length;

    const isLessonCompleted =
      lessonTotalContents > 0 &&
      lessonCompletedContents ===
        lessonTotalContents;

    const isLessonStarted =
      startedLessonKeys.has(lessonKey);

    totalContents += lessonTotalContents;
    completedContents +=
      lessonCompletedContents;

    if (isLessonCompleted) {
      completedLessons += 1;

      lessonStatusByKey.set(
        lessonKey,
        'completed',
      );
    } else if (isLessonStarted) {
      lessonStatusByKey.set(
        lessonKey,
        'inProgress',
      );
    } else {
      lessonStatusByKey.set(
        lessonKey,
        'notStarted',
      );
    }

    const moduleStats =
      moduleContentStats.get(
        lesson.moduleId,
      ) ?? {
        total: 0,
        completed: 0,
      };

    moduleStats.total +=
      lessonTotalContents;

    moduleStats.completed +=
      lessonCompletedContents;

    moduleContentStats.set(
      lesson.moduleId,
      moduleStats,
    );
  });

  /*
   * Si un módulo todavía no tiene una lección iniciada,
   * marcamos su primera lección pendiente como la próxima
   * disponible.
   */
  modules.forEach((module) => {
    const moduleId = String(module.id);

    const lessonKeys =
      module.lecciones.map((lesson) =>
        createLessonKey(
          moduleId,
          String(lesson.id),
        ),
      );

    const alreadyHasInProgress =
      lessonKeys.some(
        (key) =>
          lessonStatusByKey.get(key) ===
          'inProgress',
      );

    if (alreadyHasInProgress) {
      return;
    }

    const firstPendingLessonKey =
      lessonKeys.find(
        (key) =>
          lessonStatusByKey.get(key) ===
          'notStarted',
      );

    if (firstPendingLessonKey) {
      lessonStatusByKey.set(
        firstPendingLessonKey,
        'inProgress',
      );
    }
  });

  const moduleProgressById =
    new Map<string, number>();

  modules.forEach((module) => {
    const moduleId = String(module.id);

    const stats =
      moduleContentStats.get(moduleId);

    const progress =
      stats && stats.total > 0
        ? Math.round(
            (stats.completed /
              stats.total) *
              100,
          )
        : 0;

    moduleProgressById.set(
      moduleId,
      progress,
    );
  });

  const totalLessons = modules.reduce(
    (total, module) =>
      total + module.lecciones.length,
    0,
  );

  const pendingLessons = Math.max(
    totalLessons - completedLessons,
    0,
  );

  const progressPercentage =
    totalContents > 0
      ? Math.round(
          (completedContents /
            totalContents) *
            100,
        )
      : 0;

  return {
    totalLessons,
    completedLessons,
    pendingLessons,

    totalContents,
    completedContents,

    progressPercentage,

    moduleProgressById,
    lessonStatusByKey,
  };
}

async function loadLessonCatalog(
  modules: ApiModule[],
): Promise<LessonCatalogItem[]> {
  const lessonRequests =
    modules.flatMap((module) =>
      module.lecciones.map(
        async (
          lesson,
        ): Promise<LessonCatalogItem> => {
          const moduleId = String(
            module.id,
          );

          const lessonId = String(
            lesson.id,
          );

          const contents =
            await getLessonExercises({
              moduleId,
              lessonId,
            });

          return {
            moduleId,
            lessonId,
            contents,
          };
        },
      ),
    );

  return Promise.all(lessonRequests);
}

function createCompletedContentKeys(
  progressEntries: ProgressEntryApi[],
) {
  const completedKeys =
    new Set<string>();

  progressEntries.forEach((entry) => {
    if (!entry.completadoEn) {
      return;
    }

    const contentKey =
      createProgressContentKey(entry);

    if (contentKey) {
      completedKeys.add(contentKey);
    }
  });

  return completedKeys;
}

function createStartedLessonKeys(
  progressEntries: ProgressEntryApi[],
) {
  const startedLessons =
    new Set<string>();

  progressEntries.forEach((entry) => {
    startedLessons.add(
      createLessonKey(
        entry.moduloId,
        entry.leccionId,
      ),
    );
  });

  return startedLessons;
}

function createProgressContentKey(
  entry: ProgressEntryApi,
) {
  const moduleId = String(
    entry.moduloId,
  );

  const lessonId = String(
    entry.leccionId,
  );

  if (
    entry.teoriaId !== null &&
    entry.teoriaId !== undefined
  ) {
    return `${moduleId}:${lessonId}:theory:${entry.teoriaId}`;
  }

  if (
    entry.ejercicioId !== null &&
    entry.ejercicioId !== undefined
  ) {
    return `${moduleId}:${lessonId}:exercise:${entry.ejercicioId}`;
  }

  return null;
}

function createLessonContentKey({
  moduleId,
  lessonId,
  content,
}: {
  moduleId: string;
  lessonId: string;
  content: LessonExercise;
}) {
  const contentType =
    content.type === 'theory'
      ? 'theory'
      : 'exercise';

  return `${moduleId}:${lessonId}:${contentType}:${content.id}`;
}

function createLessonKey(
  moduleId: number | string,
  lessonId: number | string,
) {
  return `${moduleId}:${lessonId}`;
}