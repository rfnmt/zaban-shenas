export interface INotification {
  settings: Settings;
}

export interface Settings {
  checksum: number;
  data: Data;
}

export interface Data {
  conversation_notification_opt_in: boolean;
  streak_notification_opt_in: boolean;
  conversation_email_opt_in: boolean;
  conversation_sms_opt_in: boolean;
  streak_email_opt_in: boolean;
  streak_sms_opt_in: boolean;
  daily_goal_xp: string;
  timezone: string;
}
