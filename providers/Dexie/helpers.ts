import { insertCourses } from "./courses";
import { insertExperiences } from "./experiences";
import { insertLessons } from "./lessons";
import { insertQuestions } from "./questions";
import { insertSessions } from "./sessions";
import { ISyncSchema } from "./sync.interface";
import { updateVersion } from "./version";

export function addHasUpdateFalseKey(data: any) {
  if (data) {
    for (let index = 0; index < data.length; index++) {
      data[index].has_update = "false";
    }
  }

  return data;
}

export function addHasUpdateTrueKey(data: any) {
  if (data) {
    for (let index = 0; index < data.length; index++) {
      data[index].has_update = "true";
    }
  }

  return data;
}

export function removeHasUpdateKey(data: any) {
  for (let index = 0; index < data.length; index++) {
    delete data[index].has_update;
  }
  return data;
}

export async function removeAllHasUpdateTrue(data: ISyncSchema) {
  // dont update version because data is invalid

  const { sessions, questions, experiences, courses, lessons } = data;
  if (sessions) insertSessions(sessions);
  if (questions) insertQuestions(questions);
  if (experiences) insertExperiences(experiences);
  if (courses) insertCourses(courses);
  if (lessons) insertLessons(lessons);

  return Promise.resolve();
}
