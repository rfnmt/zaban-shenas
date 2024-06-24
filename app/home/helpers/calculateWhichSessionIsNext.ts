import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { CurrentCourseInterface } from "../index.interfaces";
import { store } from "@/providers/Redux/store";
import {
  updateDisableSessions,
  updatePassedSessionAnimate,
  updateTargetPassedSession,
  updateTargetUnlockedSession,
  updateUnlockedSessionAnimate,
} from "@/providers/Redux/home/homeSlice";

export function calculateWhichSessionIsNext(animte = false) {
  const cachedUserCurrentCourseId = queryClient.getQueryData<number>([
    "user-current-course-id",
  ]);

  const userCurrentCourseAllData =
    queryClient.getQueryData<CurrentCourseInterface>([
      "user-current-course-all-data",
      cachedUserCurrentCourseId,
    ]);

  const disableItems = [];

  const sessionIds = [];

  if (userCurrentCourseAllData?.courses.length)
    for (const course of userCurrentCourseAllData?.courses) {
      for (const lessons of course.data.lesson_ids) {
        sessionIds.push(
          ...(userCurrentCourseAllData?.lessons?.find(
            (lesson) => lesson.id === lessons
          )?.data?.session_ids ?? [])
        );
      }
    }

  const reverseSessionIds = sessionIds?.slice().reverse();

  if (reverseSessionIds) {
    for (let index = 0; index < reverseSessionIds.length; index++) {
      const sessionExistData = queryClient.getQueryData([
        "session-state",
        reverseSessionIds[Number(index) + 1],
      ]);

      if (
        sessionExistData !== undefined ||
        index === reverseSessionIds.length - 1
      ) {
        store.dispatch(
          updateTargetUnlockedSession(reverseSessionIds[Number(index)])
        );

        if (animte) {
          store.dispatch(
            updateTargetPassedSession(reverseSessionIds[Number(index) + 1])
          );

          store.dispatch(updatePassedSessionAnimate(true));
          store.dispatch(updateUnlockedSessionAnimate(true));
        }

        break;
      } else {
        disableItems.push(reverseSessionIds[Number(index)]);
      }
    }

    store.dispatch(updateDisableSessions(disableItems));
  }
}
