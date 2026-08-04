export const TRACKING_EVENTS = {
  USER_REGISTERED: 'user_registered',
  USER_LOGGED_IN: 'user_logged_in',
  LOGIN_FAILED: 'login_failed',
  TAB_VIEWED: 'tab_viewed',
  MODULE_OPENED: 'module_opened',
  CATEGORY_SELECTED: 'category_selected',
} as const;

export type TrackingEventName =
  (typeof TRACKING_EVENTS)[keyof typeof TRACKING_EVENTS];