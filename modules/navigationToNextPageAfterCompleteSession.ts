import dayjs from "dayjs";

import { IStudentData } from "@/models/studentData.interfaces";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { store } from "@/providers/Redux/store";
import { isDeepEqualTwoData } from "./helper";
import { DailyChallengeTypes } from "@/models/dailyChallenge.interface";
import { updateUserOnboardingCurrentPage } from "@/providers/Redux/onboarding/onboardingSlice";
import { RootOnboarding } from "@/app/onboarding/onboarding.interfaces";

export async function nextPageAfterCurrentPage(
  currentRoute: string
): Promise<string> {
  const today = dayjs().format("YYYY-MM-DD");

  const userNeedOnboarding = store.getState().user.needOnboarding;
  const nickname = store.getState().user.name;

  const studentData = queryClient.getQueryData<IStudentData>(["student-data"]);
  const cachedDailyChallengeData =
    queryClient.getQueryData<DailyChallengeTypes>(["user-challenge"]);

  const cachedOnboardingData = queryClient.getQueryData<RootOnboarding>([
    "onboarding",
  ]);

  const getCurrentPageOfOnboarding = Number(
    store.getState().onboarding.userOnboardingCurrentPage
  );

  const mostShowStreakPage = store.getState().streak.mostShowStreakPage;

  const userHasStreakToday = studentData?.attributes?.data?.some(
    (item) => item.name === "last_streak_date" && item.value === today
  );

  const ExistChallengsInLocalStorage = JSON.parse(
    localStorage.getItem("challenges") || ""
  );

  const shouldGoToStreak =
    currentRoute === "session-complete" &&
    mostShowStreakPage &&
    userHasStreakToday;

  const shouldGoToDailyChallenge =
    currentRoute === "session-complete" ||
    (currentRoute === "streak" &&
      !isDeepEqualTwoData(
        ExistChallengsInLocalStorage.daily_quests,
        cachedDailyChallengeData?.daily_quests
      ));

  const shouldGoToOnboarding = () => {
    if (cachedOnboardingData)
      if (userNeedOnboarding) {
        if (
          nickname &&
          getCurrentPageOfOnboarding + 1 === cachedOnboardingData?.data.length
        ) {
          return false;
        } else if (
          getCurrentPageOfOnboarding + 1 >=
          cachedOnboardingData?.data?.length
        ) {
          return false;
        }

        return true;
      }

    return false;
  };

  let nextRoute: string;
  if (shouldGoToStreak) {
    nextRoute = "/streak";
  } else if (shouldGoToDailyChallenge) {
    nextRoute = "/daily-challenge";
  } else if (shouldGoToOnboarding()) {
    store.dispatch(
      updateUserOnboardingCurrentPage(getCurrentPageOfOnboarding + 1)
    );

    nextRoute = "/onboarding";
  } else {
    nextRoute = "/";
  }

  return nextRoute;
}
