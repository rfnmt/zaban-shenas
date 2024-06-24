import React, { useMemo } from "react";

import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { CurrentCourseInterface } from "@/app/home/index.interfaces";
import Energy from "./energy";
import Streak from "./streak";
import Gem from "./gem";

import "./styles.scss";

function UserBoard() {
  const cachedUserCurrentCourseId = queryClient.getQueryData<number>([
    "user-current-course-id",
  ]);

  const cachedUserCurrentCourseAllData =
    queryClient.getQueryData<CurrentCourseInterface>([
      "user-current-course-all-data",
      cachedUserCurrentCourseId,
    ]);

  const isFreemuim = useMemo(() => {
    return (
      cachedUserCurrentCourseAllData?.courses.find(
        (item) => item.id === cachedUserCurrentCourseId
      )?.data?.access_type === "freemium" ?? false
    );
  }, [cachedUserCurrentCourseId]);

  return (
    <div className="home-user-board">
      {isFreemuim && <Energy />}
      <Streak />
      <Gem />
    </div>
  );
}

export default UserBoard;
