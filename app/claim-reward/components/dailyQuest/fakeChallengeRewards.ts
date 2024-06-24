import {
  ChallengeRewardsItem,
  challengeRewards,
} from "@/models/dailyChallenge.interface";

export const fakeChallengeRawardsData = [
  {
    id: 1492,
    data: {
      id: 1492,
      activity_type: "daily_quest",
      activity_id: "112",
      reward_type: "booster",
      reward_amount: 23,
      created_at: "2024-06-19T13:21:10.394Z",
    },
  },
  {
    id: 1490,
    data: {
      id: 1490,
      activity_type: "daily_quest",
      activity_id: "112",
      reward_type: "gem",
      reward_amount: 2,
      created_at: "2024-06-19T13:19:34.411Z",
    },
  },
  {
    id: 1491,
    data: {
      id: 1491,
      activity_type: "daily_quest",
      activity_id: "112",
      reward_type: "gem",
      reward_amount: 4,
      created_at: "2024-06-19T13:20:52.825Z",
    },
  },
  {
    id: 1493,
    data: {
      id: 1493,
      activity_type: "daily_quest",
      activity_id: "112",
      reward_type: "gem",
      reward_amount: 2,
      created_at: "2024-06-19T13:31:35.953Z",
    },
  },
  {
    id: 8548,
    data: {
      id: 8548,
      activity_type: "daily_quest",
      activity_id: "112",
      reward_type: "booster",
      reward_amount: 23,
      created_at: "2024-06-19T13:21:10.394Z",
    },
  },
  {
    id: 1493,
    data: {
      activity_id: "112",
      activity_type: "daily_quest",
      created_at: "2024-06-19T13:31:35.953Z",
      id: 1493,
      reward_amount: 2,
      reward_type: "streak_freeze",
    },
  },
];

export const groupByRewardType = (data: challengeRewards[]) => {
  return data?.reduce(
    (
      acc: { [key: string]: ChallengeRewardsItem[] },
      curr: challengeRewards
    ) => {
      const rewardType = curr.data.reward_type;
      if (!acc[rewardType]) {
        acc[rewardType] = [];
      }
      acc[rewardType].push(curr.data);
      return acc;
    },
    {} as { [key: string]: ChallengeRewardsItem[] }
  );
};
