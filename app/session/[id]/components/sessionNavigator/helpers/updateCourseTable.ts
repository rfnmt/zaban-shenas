import dayjs from "dayjs";

import { CurrentCourseInterface } from "@/models/currentCourse.interfaces";
import {
  getCourse,
  pushFreshCourseWithTrueHasUpdate,
} from "@/providers/Dexie/courses";
import { getLesson } from "@/providers/Dexie/lessons";
import { getSession } from "@/providers/Dexie/sessions";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";

export async function updateCourseTable() {
  const today = dayjs().format("YYYY-MM-DD");

  const cachedUserCurrentCourseId = queryClient.getQueryData<number>([
    "user-current-course-id",
  ]);

  if (cachedUserCurrentCourseId) {
    const course = await getCourse(cachedUserCurrentCourseId);

    const userCurrentCourse = queryClient.getQueryData<CurrentCourseInterface>([
      `user-current-course-all-data`,
      cachedUserCurrentCourseId,
    ]);

    const lessonIds = userCurrentCourse?.courses?.[0].data.lesson_ids;
    const reversedLessonIds = lessonIds?.slice().reverse();

    if (reversedLessonIds) {
      for (const lessonId of reversedLessonIds) {
        const sessionIds = userCurrentCourse?.lessons?.find(
          (lesson) => lesson.id === lessonId
        )?.data.session_ids;

        const reversedSessionIds = sessionIds?.slice()?.reverse();

        if (reversedSessionIds) {
          for (const sessionId of reversedSessionIds) {
            const getData = await getSession(sessionId);

            if (getData && getData.state === "passed") {
              const getlessonData = await getLesson(lessonId);

              const findLastLessonIndex =
                userCurrentCourse?.courses?.[0].data.lesson_ids.findIndex(
                  (id) => id === lessonId
                );

              const lastLessonProgress = getlessonData?.progress;
              const lessonLength = lessonIds?.length;

              const courseProgress =
                (lastLessonProgress || 0) / (lessonLength || 0) +
                ((findLastLessonIndex || 0) / (lessonLength || 0)) * 100;

              const finishDate = courseProgress === 100 ? today : null;

              if (course?.course_id) {
                return pushFreshCourseWithTrueHasUpdate([
                  {
                    course_id: course?.course_id,
                    current_course: course?.current_course,
                    finish_date: finishDate,
                    progress: courseProgress ? Math.round(courseProgress) : 0,
                  },
                ]);
              }
            }
          }
        }
      }
    }
  }

  return;
}
