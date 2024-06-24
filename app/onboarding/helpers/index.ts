import { getUserCurrentCourseAllData } from "@/components/spalashScreen/api";
import {
  CurrentCourseInterface,
  Lesson,
} from "@/models/currentCourse.interfaces";
import { changeUserCurrentCourse } from "@/providers/Dexie/courses";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";

export async function goToFirstSessionBelongCourseID(courseId: number) {
  return changeUserCurrentCourse(courseId).then(function () {
    return getUserCurrentCourseAllData(courseId).then(function (courseData) {
      const currentCourseAlldata: CurrentCourseInterface = courseData?.data;

      queryClient.setQueryData(
        ["user-current-course-all-data", courseId],
        currentCourseAlldata
      );

      const firstLessonBelongCurrentCourse: number =
        currentCourseAlldata?.courses[0]?.data?.lesson_ids[0];

      const findLesson: Lesson | undefined =
        currentCourseAlldata?.lessons?.find(
          (item) => item.id === firstLessonBelongCurrentCourse
        );

      if (findLesson) {
        const firstSessionId = findLesson?.data.session_ids[0];
        return firstSessionId;
      }
    });
  });
}
