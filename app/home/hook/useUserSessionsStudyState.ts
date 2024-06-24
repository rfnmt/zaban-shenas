import { useMutation } from "@tanstack/react-query";

import { getSpecificSession } from "@/providers/Dexie/sessions";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { store } from "@/providers/Redux/store";
import { updateProccessingSessionStates } from "@/providers/Redux/home/homeSlice";
import { CurrentCourseInterface } from "../index.interfaces";

export const useUserSessionsStudyState = () => {
  const cachedUserCurrentCourseId = queryClient.getQueryData<number>([
    "user-current-course-id",
  ]);

  const userCurrentCourseAllData =
    queryClient.getQueryData<CurrentCourseInterface>([
      "user-current-course-all-data",
      cachedUserCurrentCourseId,
    ]);

  const flatSessionIds: number[] = [];

  const findCurrentCourseData = userCurrentCourseAllData?.courses.find(
    (item) => item.id === cachedUserCurrentCourseId
  );

  if (findCurrentCourseData)
    for (const lessons of findCurrentCourseData.data.lesson_ids) {
      const findLesson = userCurrentCourseAllData?.lessons?.find(
        (lesson) => lesson.id === lessons
      );

      if (findLesson) flatSessionIds.push(...findLesson?.data.session_ids);
    }

  return useMutation({
    mutationFn: async () => {
      if (flatSessionIds?.length) {
        const sessions = await getSpecificSession(flatSessionIds);

        for (const session of sessions) {
          if (session) {
            queryClient.setQueryData(
              ["session-state", session.session_id],
              session
            );
          }
        }

        store.dispatch(updateProccessingSessionStates("done"));
      }

      // return;
    },
  });
};
