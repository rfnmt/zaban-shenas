export interface DailyChallengeTypes {
  daily_quests: DailyQuest[];
  friend_quest: any[];
  challenge: Challenge[];
  challenge_items: ChallengeItem[];
  challenge_rewards: challengeRewards[] | [];
  friend_quest_message_status: null;
}

export interface Challenge {
  id: number;
  checksum: number;
  data: ChallengeData;
}

export interface challengeRewards {
  id: number;
  data: ChallengeRewardsItem;
}

export interface ChallengeRewardsItem {
  id: number;
  activity_type: string;
  activity_id: string;
  reward_type: string;
  reward_amount: number;
  created_at: string;
}

export interface ChallengeData {
  id: number;
  collected_points: number;
  challenge_item: number;
  is_successful: boolean;
  progress_chart: ProgressChart[];
}

export interface ProgressChart {
  date: Date;
  points: number;
}

export interface ChallengeItem {
  id: number;
  checksum: number;
  data: ChallengeItemData;
}

export interface ChallengeItemData {
  id: number;
  title: string;
  tag: string;
  subtitle: string;
  parameter: string;
  images: Images;
  theming: Theming;
  start_date: Date;
  end_date: Date;
  required_points: number;
  badge: Badge;
  explanation: Explanation[];
}

export interface Badge {
  title: string;
  description: string;
  thumbnail: string;
}

export interface Explanation {
  group_title: string;
  explanation_carts: ExplanationCart[];
}

export interface ExplanationCart {
  description: string;
  thumbnail: string;
}

export interface Images {
  wide_banner: string;
  reaction_thumbnail: string;
}

export interface Theming {
  id: number;
  background_gradiant_primary_light: string;
  background_gradiant_secondary_light: string;
  text_color_light: string;
  background_gradiant_primary_dark: string;
  background_gradiant_secondary_dark: string;
  text_color_dark: string;
}

export interface DailyQuest {
  id: number;
  checksum: number;
  data: DailyQuestData;
}

export interface DailyQuestData {
  id: number;
  collected_points: number;
  quest_item: QuestItem;
}

export interface QuestItem {
  title: string;
  parameter: string;
  required_points: number;
  thumbnail: string;
}
