import { useQuery } from "@tanstack/react-query";

import { getUserCurrentCourseAllData } from "../api";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { generateLog } from "@/modules/helper";

export const useCurrentCourseData = () => {
  const userCurrentCourse = queryClient.getQueryData([
    "user-current-course-id",
  ]);

  return useQuery({
    enabled: false,
    queryKey: ["user-current-course-all-data", userCurrentCourse],
    queryFn: () => {
      generateLog(
        `start get user current course data`,
        `user current course id: ${String(userCurrentCourse)}`
      );

      return getUserCurrentCourseAllData(Number(userCurrentCourse))
        .then(function (response) {
          generateLog(
            `success get user current course data`,
            `user current course data: ${JSON.stringify(response.data)}`
          );

          if (Object.keys(response.data).length === 0) {
            generateLog(
              `current course data is empty`,
              `error: ${JSON.stringify(response.data)}`
            );

            // throw new Error("redirect to select-grade");
          }

          return queryClient.setQueryData(
            ["user-current-course-all-data", userCurrentCourse],
            response.data
          );
        })
        .catch(function (error) {
          generateLog(
            `get current course data fiald`,
            `error: ${JSON.stringify(error)}`
          );

          throw new Error("get current course data fiald");
        })
        .finally(() => {
          // store.dispatch(updateProccessingSessionStates("waiting"))
        });
    },
    // queryFn: () => new Error("something is wrong (purpose for debugging)"),
  });
};
