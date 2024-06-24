import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { DailyChallengeTypes } from "@/models/dailyChallenge.interface";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import {
  fakeChallengeRawardsData,
  groupByRewardType,
} from "./fakeChallengeRewards";
import Gem from "./components/getRewards/gem";
import Streak_freeze from "./components/getRewards/streak_freeze";
import Booster from "./components/getRewards/booster";
import { updateDailyQuestData } from "@/providers/Redux/claimRewards/claimRewardsSlice";
import { RootReduxState } from "@/providers/Redux/store";

function DailyQuest() {
  const router = useRouter();
  const dispatch = useDispatch();
  const challengeRewards = queryClient.getQueryData<DailyChallengeTypes>([
    "user-challenge",
  ])?.challenge_rewards;

  const [mountedPage, setMountedPage] = useState(false);

  const { dailyQuestData } = useSelector(
    (state: RootReduxState) => state.claimRewards
  );

  let fakeData = groupByRewardType(fakeChallengeRawardsData);

  useEffect(() => {
    if (mountedPage === false) {
      dispatch(updateDailyQuestData(fakeData));
      setMountedPage(true);
    } else if (mountedPage && Object.keys(dailyQuestData).length < 1) {
      router.push("/");
    }
    return () => {};
  }, [dailyQuestData]);

  useEffect(() => {
    router.prefetch("/");
    return () => {};
  }, [router]);

  const currentAnimation = useMemo(() => {
    if (Object.keys(dailyQuestData).length) {
      let firstDailyQuestReward = Object.values(dailyQuestData)[0];

      if (firstDailyQuestReward.length) {
        switch (firstDailyQuestReward?.[0]?.reward_type) {
          case "gem":
            return <Gem data={firstDailyQuestReward} />;

          case "streak_freeze":
            return <Streak_freeze data={firstDailyQuestReward} />;

          case "booster":
            return <Booster data={firstDailyQuestReward} />;

          default:
            return <></>;
        }
      }
    }
  }, [dailyQuestData, fakeData]);

  return currentAnimation;
}

export default DailyQuest;
