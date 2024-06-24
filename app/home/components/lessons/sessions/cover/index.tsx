import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { RootReduxState } from "@/providers/Redux/store";
import { ISessions } from "@/providers/Dexie/sync.interface";
import { APP_MEDIA_DEFAULT_PATH } from "@/env";
import { CurrentCourseInterface } from "@/app/home/index.interfaces";

import Default from "./default";
import AlreadyPassedSession from "./alreadyPassedSession";
import LockSession from "./LockSession";
import WithPassedAnimtion from "./withPassedAnimation";
import WithUnlockAnimation from "./WithUnlockAnimation";
import ActiveSession from "./activeSession";

import "./styles.scss";

function HomeSessionCover({ id }: { id: number }) {
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

  const disableSessions = useSelector(
    (state: RootReduxState) => state.home.disableSessions
  );

  const coverPath = sessionData?.data?.thumbnail
    ? sessionData?.data?.thumbnail?.startsWith("https://academy")
      ? sessionData?.data?.thumbnail
      : APP_MEDIA_DEFAULT_PATH + sessionData?.data?.thumbnail
    : "";

  const isDisable = Boolean(disableSessions.find((item) => item === id));

  const unlockedSessionAnimate = useSelector(
    (state: RootReduxState) => state.home.unlockedSessionAnimate
  );

  const passedSessionAnimate = useSelector(
    (state: RootReduxState) => state.home.passedSessionAnimate
  );

  const targetPassedSession = useSelector(
    (state: RootReduxState) => state.home.targetPassedSession
  );

  const targetUnlockedSession = useSelector(
    (state: RootReduxState) => state.home.targetUnlockedSession
  );

  const stateSession =
    queryClient.getQueryData<ISessions>(["session-state", id])?.state ||
    "not_passed";

  const views = {
    withPassedAnimtion: <WithPassedAnimtion coverPath={coverPath} />,
    withUnlockAnimation: <WithUnlockAnimation coverPath={coverPath} />,
    activeSession: <ActiveSession coverPath={coverPath} />,
    lockSession: <LockSession coverPath={coverPath} />,
    alreadyPassedSession: <AlreadyPassedSession coverPath={coverPath} />,
    default: <Default coverPath={coverPath} />,
  };

  const state = useMemo(() => {
    if (passedSessionAnimate && id === targetPassedSession) {
      return "withPassedAnimtion";
    } else if (unlockedSessionAnimate && id === targetUnlockedSession) {
      return "withUnlockAnimation";
    } else if (!unlockedSessionAnimate && id === targetUnlockedSession) {
      return "activeSession";
    } else if (isDisable) {
      return "lockSession";
    } else if (stateSession === "passed") {
      return "alreadyPassedSession";
    } else {
      return "default";
    }
  }, [
    targetPassedSession,
    isDisable,
    stateSession,
    unlockedSessionAnimate,
    targetUnlockedSession,
    passedSessionAnimate,
  ]);

  return <div className="home-pages-session-items-cover">{views[state]}</div>;
}

export default HomeSessionCover;
