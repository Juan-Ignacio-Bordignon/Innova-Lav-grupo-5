// src/features/exercises/components/SequentialVideoPlayer.tsx

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  useEvent,
  useEventListener,
} from 'expo';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Pressable,
  View,
} from 'react-native';
import {
  useVideoPlayer,
  VideoView,
  type VideoPlayerStatus,
  type VideoSource,
} from 'expo-video';

import { AppText } from '../../../components/ui';
import { colors } from '../../../constants/colors';
import { styles } from '../screens/ExerciseScreen.styles';
import { resolveVideoUrl } from '../utils';

const PLAYBACK_RATE = 1.75;
const TIME_UPDATE_INTERVAL = 0.05;

type SequentialVideoPlayerProps = {
  multimedia: string[];
};

export function SequentialVideoPlayer({
  multimedia,
}: SequentialVideoPlayerProps) {
  const videoUrls = useMemo(
    () =>
      multimedia
        .map((item) =>
          resolveVideoUrl(item)
        )
        .filter(
          (item): item is string =>
            typeof item === 'string' &&
            item.length > 0
        ),
    [multimedia]
  );

  const sequenceIdentity =
    videoUrls.join('|');

  /*
   * activeIndex:
   * video que debería reproducirse.
   *
   * visibleIndex:
   * video que permanece visible.
   *
   * Se mantienen separados para conservar
   * el último fotograma mientras el siguiente
   * video termina de prepararse.
   */
  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const [
    visibleIndex,
    setVisibleIndex,
  ] = useState(0);

  const [
    statuses,
    setStatuses,
  ] = useState<
    VideoPlayerStatus[]
  >(() =>
    videoUrls.map(() => 'idle')
  );

  const [
    progressValues,
    setProgressValues,
  ] = useState<number[]>(
    () => videoUrls.map(() => 0)
  );

  const [
    resetToken,
    setResetToken,
  ] = useState(0);

  const [
    isSequenceFinished,
    setIsSequenceFinished,
  ] = useState(false);

  /*
   * Reiniciamos el estado cuando cambia
   * el ejercicio o cambia la lista de videos.
   */
  useEffect(() => {
    setActiveIndex(0);
    setVisibleIndex(0);

    setStatuses(
      videoUrls.map(() => 'idle')
    );

    setProgressValues(
      videoUrls.map(() => 0)
    );

    setIsSequenceFinished(false);

    setResetToken(
      (current) => current + 1
    );
  }, [sequenceIdentity]);

  const activeStatus =
    statuses[activeIndex] ??
    'idle';

  const allVideosFailed =
    videoUrls.length > 0 &&
    statuses.length ===
      videoUrls.length &&
    statuses.every(
      (status) =>
        status === 'error'
    );

  /*
   * Cuando el video activo está listo,
   * recién ahí lo hacemos visible.
   *
   * Hasta ese momento permanece visible
   * el último fotograma del video anterior.
   */
  useEffect(() => {
    if (
      activeStatus ===
      'readyToPlay'
    ) {
      setVisibleIndex(
        activeIndex
      );
    }
  }, [
    activeIndex,
    activeStatus,
  ]);

  /*
   * Si el video activo falla, se salta
   * automáticamente al siguiente.
   */
  useEffect(() => {
    if (
      activeStatus !== 'error' ||
      isSequenceFinished
    ) {
      return;
    }

    setProgressValues(
      (current) =>
        current.map(
          (
            value,
            index
          ) =>
            index ===
            activeIndex
              ? 1
              : value
        )
    );

    const nextIndex =
      findNextAvailableIndex(
        statuses,
        activeIndex
      );

    if (
      nextIndex !== -1
    ) {
      setActiveIndex(
        nextIndex
      );

      return;
    }

    setIsSequenceFinished(
      true
    );
  }, [
    activeIndex,
    activeStatus,
    isSequenceFinished,
    statuses,
  ]);

  const handleStatusChange =
    useCallback(
      (
        index: number,
        status: VideoPlayerStatus
      ) => {
        setStatuses(
          (current) => {
            if (
              current[index] ===
              status
            ) {
              return current;
            }

            return current.map(
              (
                currentStatus,
                currentIndex
              ) =>
                currentIndex ===
                index
                  ? status
                  : currentStatus
            );
          }
        );
      },
      []
    );

  const handleProgress =
    useCallback(
      (
        index: number,
        progress: number
      ) => {
        const safeProgress =
          Math.max(
            0,
            Math.min(
              progress,
              1
            )
          );

        setProgressValues(
          (current) => {
            const previousValue =
              current[index] ?? 0;

            /*
             * Evita renders excesivos por cambios
             * prácticamente imperceptibles.
             */
            if (
              Math.abs(
                previousValue -
                  safeProgress
              ) < 0.004
            ) {
              return current;
            }

            return current.map(
              (
                value,
                currentIndex
              ) =>
                currentIndex ===
                index
                  ? safeProgress
                  : value
            );
          }
        );
      },
      []
    );

  const handleVideoEnd =
    useCallback(
      (index: number) => {
        setProgressValues(
          (current) =>
            current.map(
              (
                value,
                currentIndex
              ) =>
                currentIndex ===
                index
                  ? 1
                  : value
            )
        );

        const nextIndex =
          findNextAvailableIndex(
            statuses,
            index
          );

        if (
          nextIndex !== -1
        ) {
          /*
           * Solicitamos el siguiente video,
           * pero el anterior permanece visible
           * hasta que el nuevo esté listo.
           */
          setActiveIndex(
            nextIndex
          );

          return;
        }

        setIsSequenceFinished(
          true
        );
      },
      [statuses]
    );

  const handleReplay =
    useCallback(() => {
      const firstAvailableIndex =
        statuses.findIndex(
          (status) =>
            status !== 'error'
        );

      if (
        firstAvailableIndex ===
        -1
      ) {
        return;
      }

      setProgressValues(
        videoUrls.map(() => 0)
      );

      setIsSequenceFinished(
        false
      );

      setActiveIndex(
        firstAvailableIndex
      );

      setVisibleIndex(
        firstAvailableIndex
      );

      setResetToken(
        (current) =>
          current + 1
      );
    }, [
      statuses,
      videoUrls,
    ]);

  if (
    videoUrls.length === 0
  ) {
    return (
      <View
        style={
          styles.sequenceVideoBlock
        }
      >
        <View
          style={[
            styles.videoCard,
            styles.sequenceVideoCard,
          ]}
        >
          <VideoUnavailablePlaceholder />
        </View>
      </View>
    );
  }

  return (
    <View
      style={
        styles.sequenceVideoBlock
      }
    >
      <View
        style={[
          styles.videoCard,
          styles.sequenceVideoCard,
        ]}
      >
        {/*
         * Todos los VideoView permanecen montados
         * desde el inicio.
         *
         * Los inactivos tienen opacity 0, pero siguen
         * existiendo para que el navegador pueda
         * preparar sus recursos.
         */}
        {videoUrls.map(
          (
            videoUrl,
            index
          ) => (
            <PreloadedVideo
              key={`${videoUrl}-${index}`}
              index={index}
              videoUrl={
                videoUrl
              }
              isActive={
                index ===
                  activeIndex
              }
              isVisible={
                index ===
                  visibleIndex
              }
              isSequenceFinished={
                isSequenceFinished
              }
              resetToken={
                resetToken
              }
              onStatusChange={
                handleStatusChange
              }
              onProgress={
                handleProgress
              }
              onEnded={
                handleVideoEnd
              }
            />
          )
        )}

        {/*
         * Solamente mostramos carga para el video
         * que debería reproducirse.
         *
         * Ya no esperamos que los cuatro estén listos.
         */}
        {!isSequenceFinished &&
        activeStatus !==
          'readyToPlay' &&
        activeStatus !==
          'error' ? (
          <View
            style={
              styles.sequenceLoadingOverlay
            }
          >
            <ActivityIndicator
              size="large"
              color={
                colors.primary
              }
            />

            <AppText
              style={
                styles.sequenceLoadingText
              }
            >
              Preparando la seña...
            </AppText>
          </View>
        ) : null}

        {allVideosFailed ? (
          <VideoUnavailablePlaceholder />
        ) : null}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Repetir secuencia de videos"
          accessibilityState={{
            disabled:
              allVideosFailed,
          }}
          disabled={
            allVideosFailed
          }
          onPress={
            handleReplay
          }
          style={({
            pressed,
          }) => [
            styles.replayButton,

            allVideosFailed &&
              styles.replayButtonDisabled,

            pressed &&
              !allVideosFailed &&
              styles.replayButtonPressed,
          ]}
        >
          <MaterialIcons
            name="replay"
            size={27}
            color={
              colors.primary
            }
          />
        </Pressable>
      </View>

      <View
        style={
          styles.sequenceProgressRow
        }
      >
        {videoUrls.map(
          (_, index) => (
            <View
              key={`progress-${index}`}
              style={[
                styles.sequenceProgressTrack,

                index ===
                  activeIndex &&
                  !isSequenceFinished &&
                  styles.sequenceProgressTrackActive,
              ]}
            >
              <View
                style={[
                  styles.sequenceProgressFill,
                  {
                    width: `${
                      (
                        progressValues[
                          index
                        ] ?? 0
                      ) * 100
                    }%`,
                  },
                ]}
              />
            </View>
          )
        )}
      </View>
    </View>
  );
}

type PreloadedVideoProps = {
  index: number;
  videoUrl: string;
  isActive: boolean;
  isVisible: boolean;
  isSequenceFinished: boolean;
  resetToken: number;

  onStatusChange: (
    index: number,
    status: VideoPlayerStatus
  ) => void;

  onProgress: (
    index: number,
    progress: number
  ) => void;

  onEnded: (
    index: number
  ) => void;
};

function PreloadedVideo({
  index,
  videoUrl,
  isActive,
  isVisible,
  isSequenceFinished,
  resetToken,
  onStatusChange,
  onProgress,
  onEnded,
}: PreloadedVideoProps) {
  const source =
    useMemo<VideoSource>(
      () => ({
        uri: videoUrl,
      }),
      [videoUrl]
    );

  const player =
    useVideoPlayer(
      source,
      (videoPlayer) => {
        videoPlayer.muted =
          true;

        videoPlayer.loop =
          false;

        videoPlayer.playbackRate =
          PLAYBACK_RATE;

        videoPlayer.timeUpdateEventInterval =
          TIME_UPDATE_INTERVAL;
      }
    );

  const { status } =
    useEvent(
      player,
      'statusChange',
      {
        status:
          player.status,
      }
    );

  const previousResetToken =
    useRef(resetToken);

  useEffect(() => {
    onStatusChange(
      index,
      status
    );
  }, [
    index,
    onStatusChange,
    status,
  ]);

  useEventListener(
    player,
    'timeUpdate',
    ({
      currentTime,
    }) => {
      if (!isActive) {
        return;
      }

      const duration =
        player.duration;

      if (
        !duration ||
        duration <= 0
      ) {
        return;
      }

      onProgress(
        index,
        currentTime /
          duration
      );
    }
  );

  useEventListener(
    player,
    'playToEnd',
    () => {
      if (!isActive) {
        return;
      }

      onProgress(
        index,
        1
      );

      onEnded(index);
    }
  );

  useEffect(() => {
    player.muted = true;
    player.loop = false;

    player.playbackRate =
      PLAYBACK_RATE;

    player.timeUpdateEventInterval =
      TIME_UPDATE_INTERVAL;

    if (
      previousResetToken.current !==
      resetToken
    ) {
      player.pause();
      player.currentTime = 0;

      previousResetToken.current =
        resetToken;
    }

    const shouldPlay =
      isActive &&
      !isSequenceFinished &&
      status ===
        'readyToPlay';

    if (shouldPlay) {
      /*
       * En web algunos navegadores necesitan que
       * play se ejecute después de que la vista
       * ya fue montada.
       */
      const playTimer =
        setTimeout(() => {
          player.muted = true;
          player.playbackRate =
            PLAYBACK_RATE;
          player.play();
        }, 30);

      return () => {
        clearTimeout(
          playTimer
        );
      };
    }

    player.pause();

    return undefined;
  }, [
    isActive,
    isSequenceFinished,
    player,
    resetToken,
    status,
  ]);

  return (
    <View
      pointerEvents="none"
      style={[
        styles.videoZoom,
        {
          opacity:
            isVisible
              ? 1
              : 0,

          zIndex:
            isVisible
              ? 1
              : 0,
        },
      ]}
    >
      <VideoView
        player={player}
        style={styles.video}
        nativeControls={false}
        contentFit="contain"
        playsInline
      />
    </View>
  );
}

function VideoUnavailablePlaceholder() {
  return (
    <View
      style={
        styles.videoPlaceholder
      }
    >
      <MaterialIcons
        name="videocam-off"
        size={48}
        color={
          colors.textSecondary
        }
      />

      <AppText
        style={
          styles.videoPlaceholderText
        }
      >
        No se pudieron cargar
        los videos de este ejercicio.
      </AppText>
    </View>
  );
}

function findNextAvailableIndex(
  statuses: VideoPlayerStatus[],
  currentIndex: number
) {
  for (
    let index =
      currentIndex + 1;
    index <
    statuses.length;
    index += 1
  ) {
    /*
     * También aceptamos idle/loading porque
     * podría seguir preparándose cuando termine
     * el video anterior.
     */
    if (
      statuses[index] !==
      'error'
    ) {
      return index;
    }
  }

  return -1;
}