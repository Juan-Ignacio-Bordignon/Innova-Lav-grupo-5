import { TRACKING_EVENTS } from './trackingEvents';

export type TrackingTabName = 'home' | 'favorites' | 'profile';

export type UserRegisteredProperties = {
  authMethod: 'email';
  sourceScreen: 'register';
};

export type UserLoggedInProperties = {
  authMethod: 'email';
  sourceScreen: 'login';
};

export type LoginFailedReason =
  | 'invalid_credentials'
  | 'validation_error'
  | 'network_error'
  | 'server_error'
  | 'unknown';

export type LoginFailedProperties = {
  authMethod: 'email';
  sourceScreen: 'login';
  failureReason: LoginFailedReason;
  httpStatus?: number;
};

export type TabViewedProperties = {
  tabName: TrackingTabName;
  previousTab: TrackingTabName | null;
};

export type ModuleOpenedProperties = {
  moduleId: string | number;
  moduleName: string;
  moduleProgress: number;
  sourceScreen: 'home';
};

export type CategorySelectedProperties = {
  moduleId: string | number;
  moduleName: string;
  lessonId: string | number;
  lessonName: string;
  lessonStatus: 'completed' | 'inProgress' | 'notStarted';
  sourceScreen: 'module_detail';
};

export type TrackingPropertiesMap = {
  [TRACKING_EVENTS.USER_REGISTERED]: UserRegisteredProperties;
  [TRACKING_EVENTS.USER_LOGGED_IN]: UserLoggedInProperties;
  [TRACKING_EVENTS.LOGIN_FAILED]: LoginFailedProperties;
  [TRACKING_EVENTS.TAB_VIEWED]: TabViewedProperties;
  [TRACKING_EVENTS.MODULE_OPENED]: ModuleOpenedProperties;
  [TRACKING_EVENTS.CATEGORY_SELECTED]: CategorySelectedProperties;
};

export type EventLogRequest<TProperties> = {
  evento: string;
  properties: TProperties;
};

export type CreatedEvent<TProperties> = {
  id: string | number;
  userId: string | number;
  evento: string;
  properties: TProperties;
  timestamp: string;
};

export type EventLogResponse<TProperties> = {
  createdEvent: CreatedEvent<TProperties>;
};