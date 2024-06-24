export interface CurrentCourseInterface {
  courses: Course[];
  lessons: Lesson[];
  sessions: Session[];
}

export interface Course {
  id: number;
  data: CourseData;
}

export interface CourseData {
  id: number;
  access_type: string;
  created_at: Date;
  updated_at: Date;
  description: string;
  hardness: string;
  lesson_ids: number[];
  purchasable: number | null;
  thumbnail: string;
  defaults: Defaults;
  title: string;
  progress_label: ProgressLabel | null;
  main_course: number | null;
  sub_courses: number[];
}

export interface Defaults {
  story_thumbnail: null;
  tip_thumbnail: null;
  question_bundle_thumbnail: null;
}

export interface ProgressLabel {
  id: number;
  label: string;
  progress: number;
  arrival_date: Date;
}

export interface Lesson {
  id: number;
  data: LessonData;
}

export interface LessonData {
  id: number;
  updated_at: Date;
  thumbnail: string;
  session_ids: number[];
  opener_exam?: number;
  is_free: boolean | null;
  description: string;
}

export interface Session {
  id: number;
  data: SessionData;
}

export interface SessionData {
  id: number;
  title: string;
  description: string;
  thumbnail: null | string;
  type: "question_bundle" | "tip" | "story";
  updated_at: Date;
  question_ids?: number[];
  tip_id?: number;
  story_id?: number;
}
