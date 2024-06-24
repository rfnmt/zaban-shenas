export interface ICourse {
  access_type: string;
  created_at: string;
  description: string;
  hardness: "easy" | "medium" | "hard" | "intense";
  id: number;
  lesson_ids: number[];
  purchasable: number;
  thumbnail: string;
  title: string;
  main_course: number;
  sub_courses: number[];
}

export interface ICourses {
  data: ICourse;
  id: number;
}
