import React, { useEffect, useMemo } from "react";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Dotdotdot from "react-dotdotdot";

import HomeSessionCover from "../cover";
import { useDispatch, useSelector } from "react-redux";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { CurrentCourseInterface } from "@/app/home/index.interfaces";
import {
  openSheet,
  serCover,
  setSessionId,
} from "@/providers/Redux/home/freemuim/useEnergyBottomSheetSlice";
import { APP_MEDIA_DEFAULT_PATH, APP_NODE_ENV } from "@/env";
import { doIHaveThisProduct, textIsFarsi } from "@/modules/helper";
import { RootReduxState } from "@/providers/Redux/store";
import { updateLockedSessionSnackbar } from "@/providers/Redux/home/homeSlice";
import { updateUserCanSeeSession } from "@/providers/Redux/lesson/session/sessionSlice";

type Props = {
  id: number;
  title: string;
  description: string;
};

function AsButton({ id, title, description }: Props) {
  const router = useRouter();
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

  const coverPath = sessionData?.data?.thumbnail
    ? sessionData?.data?.thumbnail?.startsWith("https://academy")
      ? sessionData?.data?.thumbnail
      : APP_MEDIA_DEFAULT_PATH + sessionData?.data?.thumbnail
    : "";

  const disableSessions = useSelector(
    (state: RootReduxState) => state.home.disableSessions
  );

  const isDisable = disableSessions.find((item) => item === id);

  const courseAccessType = userCurrentCourse?.courses.find(
    (item) => item.id === cachedUserCurrentCourseId
  )?.data.access_type;

  useEffect(() => {
    // permission for user to see session page
    dispatch(updateUserCanSeeSession(true));

    router.prefetch(`/session/${id}`);
    return () => {};
  }, [router]);

  const cachedUserCurrentCourseAllData =
    queryClient.getQueryData<CurrentCourseInterface>([
      "user-current-course-all-data",
      cachedUserCurrentCourseId,
    ]);

  const _doIHaveThisProduct = useMemo(() => {
    const find = cachedUserCurrentCourseAllData?.courses.find(
      (item) => item.id === cachedUserCurrentCourseId
    );

    const _purchasable = find?.data.purchasable;

    if (_purchasable) return doIHaveThisProduct(_purchasable);
    return false;
  }, [cachedUserCurrentCourseAllData]);

  return (
    <Button
      className="action-area"
      onClick={() => {
        if (isDisable && APP_NODE_ENV === "production") {
          dispatch(updateLockedSessionSnackbar(true));
        } else {
          if (courseAccessType === "freemium" && !_doIHaveThisProduct) {
            dispatch(openSheet());
            dispatch(setSessionId(id));
            dispatch(serCover(coverPath));
          } else {
            router.push(`/session/${id}`);
          }
        }
      }}
      sx={{
        "&:hover": { backgroundColor: "transparent" },
        "&:focus": { backgroundColor: "transparent" },
      }}
    >
      <HomeSessionCover id={id} />

      <div className="typography">
        {/*Using "Dotdotdot" because Safari does not support white-space: nowrap with direction: RTL. */}
        <Dotdotdot clamp={2}>
          <Typography
            className={`title ${textIsFarsi(title) ? "fa" : "en"}`}
            sx={{ color: "gray.1" }}
          >
            {title}
          </Typography>
        </Dotdotdot>
        <Dotdotdot clamp={2}>
          <Typography
            className={`subtitle ${textIsFarsi(description) ? "fa" : "en"}`}
            sx={{ color: "gray.2" }}
          >
            {description}
          </Typography>
        </Dotdotdot>
      </div>
    </Button>
  );
}

export default React.memo(AsButton);
