export interface ISessions {
  session_id: number | string;
  state: "passed" | "not_passed";
  gained_xp: number;
  accuracy: number;
  date: string;
}

export interface IQuestions {
  question_id: number | string;
  state: "skipped" | "incorrect" | "correct";
  // did: number;
  date: string;
}

export interface IExperiences {
  date: string;
  gained_xp: number;
  daily_goal_xp: number;
  frozen: boolean | string;
  did: number;
}

export interface ICourses {
  course_id: number;
  current_course: boolean;
  progress: number | null;
  finish_date: string | null;
}

export interface ILessons {
  progress: number;
  finish_date: string | null;
  lesson_id: number | string;
}

export interface ISyncSchema {
  version: number;
  sessions: ISessions[] | [];
  questions: IQuestions[] | [];
  experiences: IExperiences[] | [];
  courses: ICourses[] | [];
  lessons: ILessons[] | [];
}
