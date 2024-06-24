/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from "@tanstack/react-query";

import { getUserCurrentCourse } from "@/providers/Dexie/courses";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";

export const useCurrentCourseId = () => {
  return useMutation({
    mutationFn: () => {
      return getUserCurrentCourse()
        .then(function (id) {
          if (id) {
            queryClient.setQueryData(["user-current-course-id"], id);
            return id;
          }
          return new Error("redirect to select grade");
        })
        .catch(() => new Error("redirect to select grade"));
    },
  });
};
