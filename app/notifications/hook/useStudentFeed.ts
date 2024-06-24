import { useQuery } from "@tanstack/react-query";

import { getStudentFeed } from "../api";

export const useStudentFeed = () => {
  return useQuery({
    enabled: false,
    queryKey: ["student-feed"],
    queryFn: ({ signal }) => {
      return getStudentFeed({ signal }).then(function (response) {
        return response.data;
      });
    },
  });
};
