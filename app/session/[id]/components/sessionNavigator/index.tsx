import React, { useEffect } from "react";
import { AppBar, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";

import { RootReduxState } from "@/providers/Redux/store";
import Loading from "./components/loading";
import VerifyNow from "./components/verifyNow";
import Incorrect from "./components/incorrect";
import Correct from "./components/correct";
import SpeakingPostponed from "./components/speakingPostponed";
import ListeningPostponed from "./components/listeningPostponed";
import ContinueAsTip from "./components/continueAsTip";
import IncorrectMoveOn from "./components/incorrectMoveOn";
import SpeakingIncorrect from "./components/speakingIncorrect";
import ContinueAsStory from "./components/continueAsStory";
import IHaveUnderstood from "./components/understood";
import { usePathname } from "next/navigation";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { SessionRoot } from "../../sessions.interfaces";

import SkipVocabExamination from "./components/skipVocabExamination";


import "./styles.scss";

const views = {
  loading: Loading,
  verifyNow: VerifyNow,
  continueAsTip: ContinueAsTip,
  continueAsStory: ContinueAsStory,
  correct: Correct,
  incorrect: Incorrect,
  incorrectMoveOn: IncorrectMoveOn,
  listeningPostponed: ListeningPostponed,
  speakingPostponed: SpeakingPostponed,
  speakingIncorrect: SpeakingIncorrect,
  ihaveunderstood: IHaveUnderstood,
  skipVocabExaminationQuestion: SkipVocabExamination,
};

function SessionNavigator() {
  const { viewType } = useSelector(
    (state: RootReduxState) => state.sessionNavigator
  );

  const sessionID = Number(usePathname().split("/")[2]);
  const sessionData = queryClient.getQueryData<SessionRoot>([
    "session",
    sessionID,
  ]);

  const type = sessionData ? sessionData?.sessions[0]?.data?.type : "default";

  const CurrentView = views[viewType];

  const visibleBackdrop = !Boolean(
    viewType === "loading" ||
      viewType === "continueAsTip" ||
      viewType === "verifyNow" ||
      viewType === "continueAsStory" ||
      viewType === "ihaveunderstood"
  );

  useEffect(() => {
    if (type === "question_bundle") {
      var videos: any = document.querySelectorAll("video");
      var audios: any = document.querySelectorAll("audio");

      for (const iterator of videos) {
        iterator.pause();
      }

      for (const iterator of audios) {
        iterator.currentTime = 0;
        iterator.pause();
      }
      return () => {};
    }
  }, [viewType]);

  return (
    <>
      {visibleBackdrop && <div className="backdrop-action-sheet" />}
      <Toolbar
        sx={{ height: "80px !important" }}
        className="before-session-navigator-space"
      />
      <AppBar
        tabIndex={1}
        component="div"
        className="session-action-sheet"
        sx={{ backgroundColor: "white.flexible" }}
      >
        <div className="container">
          <CurrentView />
        </div>
      </AppBar>
    </>
  );
}

export default SessionNavigator;
