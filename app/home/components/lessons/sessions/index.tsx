import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import React from "react";

import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { CurrentCourseInterface } from "@/models/currentCourse.interfaces";
import Icon from "@/components/icon";
import {
  handleOpentReportSpecialContentBottomSheet,
  updateGetElementIdForReportScreenShot,
  updateGetSpecialIdForReport,
} from "@/providers/Redux/general/generalSlice";
import { RootReduxState } from "@/providers/Redux/store";
import AsButton from "./asButton";

import "./styles.scss";

type Props = { id: number; lessonId: number };

function Sessions({ id }: Props) {
  const dispatch = useDispatch();

  const cachedUserCurrentCourseId = queryClient.getQueryData<number>([
    "user-current-course-id",
  ]);

  const userCurrentCourse = queryClient.getQueryData<CurrentCourseInterface>([
    `user-current-course-all-data`,
    cachedUserCurrentCourseId,
  ]);

  const sessionData = userCurrentCourse?.sessions?.find((lesson) => {
    return lesson.id === id;
  });

  function handleSessionReport() {
    dispatch(handleOpentReportSpecialContentBottomSheet(true));
    dispatch(
      updateGetElementIdForReportScreenShot(`main-pages-screenshot-${id}`)
    );
    dispatch(updateGetSpecialIdForReport(id));
  }

  const disableSessions = useSelector(
    (state: RootReduxState) => state.home.disableSessions
  );

  const isDisable = disableSessions.find((item) => item === id);

  return (
    <Box
      id={`main-pages-screenshot-${id}`}
      className={`home-session-item ${isDisable ? "disable-session" : ""}`}
    >
      <div id={`session-${id}`}>
        <AsButton
          id={id}
          title={sessionData?.data?.title || ""}
          description={sessionData?.data?.description || ""}
        />
      </div>
      <Button onClick={handleSessionReport} className="session-report-button">
        <Icon width={24} height={24} icon="flag" />
      </Button>
    </Box>
  );
}

export default React.memo(Sessions);
