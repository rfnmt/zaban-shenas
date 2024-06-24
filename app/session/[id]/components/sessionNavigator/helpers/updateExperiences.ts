import dayjs from "dayjs";

import { store } from "@/providers/Redux/store";
import {
  getUserGaindXpByDate,
  pushFreshExperiencesWithHasUpdateKey,
} from "@/providers/Dexie/experiences";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { INotification } from "@/app/setting/notifications.interfaces";
import { InitialData } from "@/app/setting/initialData.interfaces";

export async function updateExperiences() {
  const today = dayjs().format("YYYY-MM-DD");

  const { id } = store.getState().user;

  const { gainedXp } = store.getState().session;
  const preStoredData = queryClient.getQueryData<INotification>([
    "setting-daily-goal",
  ]);

  const userInitialData = queryClient.getQueryData<InitialData>([
    "user-initial-data",
  ]);

  const dailyGoalXp = preStoredData?.settings?.data?.daily_goal_xp;
  const getUserDailyGoal = userInitialData?.daily_goals?.data.find(
    (item) => item.slug === dailyGoalXp
  );

  if (id) {
    const experiences = await getUserGaindXpByDate(today);

    const modifyExperience = {
      daily_goal_xp: getUserDailyGoal?.daily_goal_xp || 0,
      date: today,
      did: id,
      frozen: false,
      gained_xp: experiences?.gained_xp
        ? Math.round(experiences?.gained_xp + gainedXp)
        : Math.round(gainedXp),
    };

    return pushFreshExperiencesWithHasUpdateKey([modifyExperience]);
  }

  return;
}
