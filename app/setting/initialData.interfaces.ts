export interface InitialData {
  leagues: Leagues;
  friend_quest_message_data: FriendQuestMessageData;
  achievements: Achievements;
  daily_goals: DailyGoals;
  report_problem_data: ReportProblemData;
  remote_config: null;
}

export interface Achievements {
  checksum: number;
  data: AchievementsDatum[];
}

export interface AchievementsDatum {
  id: number;
  title: string;
  slug: string;
  parameter: string;
  description: Description;
  thumbnail: Description;
  tier_counts: number[];
}

export interface Description {
  ongoing: string;
  completed: string;
  neutral: string;
  announcement: string;
  id?: null;
}

export interface DailyGoals {
  checksum: number;
  data: DailyGoalsDatum[];
}

export interface DailyGoalsDatum {
  id: number;
  title: string;
  slug: string;
  daily_goal_xp: number;
}

export interface FriendQuestMessageData {
  checksum: number;
  data: FriendQuestMessageDataDatum[];
}

export interface FriendQuestMessageDataDatum {
  id: number;
  text: string;
  type: PurpleType;
  slug: string;
  thumbnail: string;
}

export enum PurpleType {
  Celebrate = "celebrate",
  Nudge = "nudge",
  Welcome = "welcome",
}

export interface Leagues {
  checksum: number;
  data: LeaguesDatum[];
}

export interface LeaguesDatum {
  id: number;
  title: string;
  slug: string;
  max_rank_to_promote: number;
  min_rank_to_demote: number;
  room_size: number;
  thumbnail: string;
  notif_thumbnail: string;
}

export interface ReportProblemData {
  checksum: number;
  data: ReportProblemDataDatum[];
}

export interface ReportProblemDataDatum {
  id: number;
  title: string;
  type: FluffyType;
}

export enum FluffyType {
  Person = "person",
  Question = "question",
  Story = "story",
  Tip = "tip",
}
