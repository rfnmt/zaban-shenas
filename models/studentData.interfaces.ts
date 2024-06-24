export interface IStudentData {
  relationship_status: RelationshipStatus;
  profile_data: ProfileData;
  xp_summaries: XPSummaries;
  attributes: Attributes;
  achievement_rewards: AchievementReward[];
}

export interface AchievementReward {
  id: number;
  data: AchievementRewardData;
}

export interface AchievementRewardData {
  id: number;
  activity_type: string;
  reward_type: string;
  achievement_slug: string;
  tier_index: number;
  reward_amount: number;
  created_at: Date;
}
export interface Attributes {
  id: number;
  checksum: number;
  data: AttributesDatum[];
}

export interface AttributesDatum {
  name: string;
  value: number | null | string;
}

export interface ProfileData {
  id: number;
  checksum: number;
  data: ProfileDataData;
}

export interface ProfileDataData {
  id: number;
  created_at: Date;
  profile_pic: string;
  username: null;
  name: string;
  is_staff?: boolean;
}

export interface RelationshipStatus {
  id: number;
  data: RelationshipStatusData;
}

export interface RelationshipStatusData {
  id: number;
  follows_viewer: boolean;
  followed_by_viewer: boolean;
  blocked_by_viewer: boolean;
  has_blocked_viewer: boolean;
}

export interface XPSummaries {
  id: number;
  checksum: number;
  data: XPSummariesDatum[];
}

export interface XPSummariesDatum {
  date: Date;
  gained_xp: number;
  frozen: boolean;
  daily_goal_xp: number;
  is_broken: boolean;
}
