import { Sync } from "./index";
import {
  addHasUpdateFalseKey,
  addHasUpdateTrueKey,
  removeHasUpdateKey,
} from "./helpers";
import { ILessons } from "./sync.interface";

export async function getAllLessons() {
  return Sync["lessons"].toArray();
}

export function getLesson(id: number) {
  return Sync["lessons"].get({ lesson_id: id });
}

export async function insertLessons(data: ILessons[]) {
  return Sync["lessons"].bulkPut(addHasUpdateFalseKey(data));
}

export async function getOnlyHasUpdateLessons() {
  const lessons = await Sync["lessons"].where({ has_update: "true" }).toArray();
  return lessons ? removeHasUpdateKey(lessons) : [];
}

export async function pushFreshLessons(data: ILessons[]) {
  return Sync["lessons"].bulkPut(addHasUpdateFalseKey(data));
}

export async function getLessonStudyPercent(id: number) {
  const lessons = await Sync["lessons"].toArray();
  const lesson = lessons.find((item: ILessons) => item.lesson_id === id);
  return lesson?.progress || 0;
}

export async function pushFreshLessonWithTrueHasUpdate(data: ILessons[]) {
  return Sync["lessons"].bulkPut(addHasUpdateTrueKey(data));
}
