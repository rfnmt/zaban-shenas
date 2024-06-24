import { usePathname } from "next/navigation";

import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";

export function useNextSessionID() {
  const currentSessionID = Number(usePathname().split("/")[2]);

  const cachedUserCurrentCourseId = queryClient.getQueryData([
    "user-current-course-id",
  ]);

  const userCurrentCourse = queryClient.getQueryData([
    `user-current-course-all-data`,
    cachedUserCurrentCourseId,
  ]) as any;

  let currentLesson = null;

  for (let _index = 0; _index < userCurrentCourse?.lessons.length; _index++) {
    for (
      let index = 0;
      index < userCurrentCourse?.lessons[_index]?.data?.session_ids.length;
      index++
    ) {
      if (
        userCurrentCourse?.lessons[_index]?.data?.session_ids[index] ===
        currentSessionID
      )
        currentLesson = userCurrentCourse?.lessons[_index];
    }
  }

  const findIndex = currentLesson?.data?.session_ids?.findIndex((sessions) => {
    return sessions === currentSessionID;
  });

  const nextSessionID =
    Number(currentLesson?.data?.session_ids[findIndex + 1]) || false;

  return { nextSessionID };
}
