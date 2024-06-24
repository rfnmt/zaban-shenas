import dayjs from "dayjs";

import {
  getLesson,
  pushFreshLessonWithTrueHasUpdate,
} from "@/providers/Dexie/lessons";
import { getPassedSession } from "@/providers/Dexie/sessions";
import { store } from "@/providers/Redux/store";

export async function updateLessonTable() {
  const today = dayjs().format("YYYY-MM-DD");

  const { userRecentLesson, sessionIdsBelongLesson } = store.getState().lesson;

  if (userRecentLesson) {
    const lesson = await getLesson(userRecentLesson);
    const passedSessionsCount = (await getPassedSession(sessionIdsBelongLesson))
      .length;

    if (!lesson || !lesson.finish_date || lesson.progress > 100) {
      const finishDate =
        (passedSessionsCount / sessionIdsBelongLesson.length) * 100 === 100
          ? today
          : null;

      return pushFreshLessonWithTrueHasUpdate([
        {
          progress: Math.round(
            (passedSessionsCount / sessionIdsBelongLesson.length) * 100
          ),
          finish_date: finishDate,
          lesson_id: userRecentLesson,
        },
      ]);
    }

    return;
  }

  return;
}
