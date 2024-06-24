import { useQuery } from "@tanstack/react-query";

import { getAllCoursesData } from "../api";

export const useAllCourseQuery = () => {
  return useQuery({
    enabled: false,
    queryKey: ["courses-list"],
    queryFn: ({ signal }) => {
      return getAllCoursesData({ signal })
        .then(function (response) {
          return response.data.courses;
        })
        .catch(function (error) {
          throw new Error(error);
        });
    },
  });
};
