import { apiClient } from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';
import { getAuthToken } from '../storage/authStorage';

import type { TrackingEventName } from './trackingEvents';
import type {
  EventLogRequest,
  EventLogResponse,
  TrackingPropertiesMap,
} from './trackingTypes';

export async function trackEvent<TEvent extends TrackingEventName>(
  eventName: TEvent,
  properties: TrackingPropertiesMap[TEvent]
): Promise<void> {
  try {
    const token = await getAuthToken();

    if (!token) {
      if (__DEV__) {
        console.warn(
          `[Tracking] No se envió "${eventName}" porque no hay un token guardado.`
        );
      }

      return;
    }

    const body: EventLogRequest<TrackingPropertiesMap[TEvent]> = {
      evento: eventName,
      properties,
    };

    await apiClient<EventLogResponse<TrackingPropertiesMap[TEvent]>>(
      ENDPOINTS.EVENT_LOG,
      {
        method: 'POST',
        token,
        body: JSON.stringify(body),
      }
    );

    if (__DEV__) {
      console.log(`[Tracking] Evento enviado: ${eventName}`, properties);
    }
  } catch (error) {
    if (__DEV__) {
      console.warn(
        `[Tracking] No se pudo enviar el evento "${eventName}".`,
        error
      );
    }
  }
}