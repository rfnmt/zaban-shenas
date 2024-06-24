import Dexie from "dexie";

import {
  ICourses,
  IExperiences,
  ILessons,
  IQuestions,
  ISessions,
  ISyncSchema,
} from "./sync.interface";
import { getVersion, updateVersion } from "./version";
import { getOnlyHasUpdateCourses, pushFreshCourses } from "./courses";
import { getOnlyHasUpdateLessons, pushFreshLessons } from "./lessons";
import { getOnlyHasUpdateSessions, pushFreshSessions } from "./sessions";
import { getOnlyHasUpdateQuestions, pushFreshQuestions } from "./questions";
import {
  getOnlyHasUpdateExperiences,
  pushFreshExperiences,
} from "./experiences";
import { DATABASE_SYNC_TABLE_VERSION } from "@/env";

export class SyncClassedDexie extends Dexie {
  // 'sync' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case

  _version!: Dexie.Table<number>;
  sessions!: Dexie.Table<ISessions, number>;
  questions!: Dexie.Table<IQuestions, number>;
  courses!: Dexie.Table<ICourses, number>;
  lessons!: Dexie.Table<ILessons, number>;
  experiences!: Dexie.Table<IExperiences, number>;

  constructor() {
    super("sync");
    this.version(DATABASE_SYNC_TABLE_VERSION).stores({
      _version: "++",
      sessions: "session_id,has_update",
      questions: "question_id,has_update",
      courses: "course_id,has_update",
      lessons: "lesson_id,has_update",
      experiences: "[date+did],has_update",
    });
  }
}

export const Sync = new SyncClassedDexie();

export const prepaireSyncDatabaseForSyncApi = async () => {
  const version = (await getVersion()) || -1;
  const sessions = await getOnlyHasUpdateSessions();
  const questions = await getOnlyHasUpdateQuestions();
  const experiences = await getOnlyHasUpdateExperiences();
  const courses = await getOnlyHasUpdateCourses();
  const lessons = await getOnlyHasUpdateLessons();

  const tabels = {
    version,
    sessions,
    questions,
    experiences,
    courses,
    lessons,
  } as ISyncSchema;

  return tabels;
};

export const pushDataToSyncDatabase = (data: ISyncSchema) => {
  const { courses, experiences, lessons, questions, sessions, version } = data;

  if (version) updateVersion(version);
  if (courses?.length) pushFreshCourses(courses);
  if (lessons?.length) pushFreshLessons(lessons);
  if (experiences?.length) pushFreshExperiences(experiences);
  if (questions?.length) pushFreshQuestions(questions);
  if (sessions?.length) pushFreshSessions(sessions);
  return Promise.resolve();
};

export function closeSyncDatabase() {
  Sync._version.clear();
  Sync.courses.clear();
  Sync.lessons.clear();
  Sync.experiences.clear();
  Sync.questions.clear();
  Sync.sessions.clear();
  Sync.experiences.clear();
  return Promise.resolve();
}
