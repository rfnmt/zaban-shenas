import { Sync } from "./index";
import {
  addHasUpdateFalseKey,
  addHasUpdateTrueKey,
  removeHasUpdateKey,
} from "./helpers";
import { ICourses } from "./sync.interface";
import { queryClient } from "../ReactQuery/reactQueryWrapper";
import { updateProccessingSessionStates } from "../Redux/home/homeSlice";
import { store } from "../Redux/store";

export async function getAllCourses() {
  return Sync["courses"].toArray();
}

export async function getSpecificCourse(ids: number[]) {
  return Sync["courses"].bulkGet(ids);
}

export async function getCourse(ids: number) {
  return Sync["courses"].get({ course_id: ids });
}

export async function insertCourses(data: ICourses[]) {
  return Sync["courses"].bulkPut(addHasUpdateFalseKey(data));
}

export async function getOnlyHasUpdateCourses() {
  const courses = await Sync["courses"].where({ has_update: "true" }).toArray();

  return courses ? removeHasUpdateKey(courses) : [];
}

export async function pushFreshCourses(data: ICourses[]) {
  return Sync["courses"].bulkPut(addHasUpdateFalseKey(data));
}

export async function pushFreshCourseWithTrueHasUpdate(data: ICourses[]) {
  return Sync["courses"].bulkPut(addHasUpdateTrueKey(data));
}

export async function getUserCurrentCourse() {
  const courses = await Sync["courses"].toArray();
  const currentCourses = courses?.find(
    (course: ICourses) => course?.current_course === true
  )?.course_id;

  // if (currentCourses)
  return currentCourses || null;
  // else throw new Error("can not find current course!");
}

export async function changeUserCurrentCourse(id: number) {
  const existCourse = await getCourse(id);
  const allCourses = await getAllCourses();

  const modifyAllCourse = allCourses.map((item) => {
    if (item.current_course == true && item.course_id != id) {
      return {
        ...item,
        current_course: false,
        has_update: "true",
      };
    } else if (item.current_course == false && item.course_id == id) {
      return {
        ...item,
        current_course: true,
        has_update: "true",
      };
    } else {
      return { ...item };
    }
  });

  if (!existCourse) {
    modifyAllCourse.push({
      current_course: true,
      progress: 0,
      finish_date: null,
      course_id: id,
      has_update: "true",
    });
  }

  return Sync["courses"].bulkPut(modifyAllCourse).then(function () {
    queryClient.setQueryData(["user-current-course-id"], id);
    store.dispatch(updateProccessingSessionStates("waiting"));
  });
}

export async function getCourseProgress(id: number) {
  const courses = await Sync["courses"].toArray();
  const course = courses.find((item) => item.course_id === id);
  return course?.progress || 0;
}
