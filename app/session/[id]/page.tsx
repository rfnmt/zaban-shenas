"use client";

import React, { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { SessionRoot } from "./sessions.interfaces";
import { RootReduxState } from "@/providers/Redux/store";
import { PackagingQuestionsData } from "./helpers/packagingQuestionsData";
import StoryPage from "./components/story/page";
import Questions from "./components/questions";
import Tip from "./components/tip";

const views = {
  tip: Tip,
  story: StoryPage,
  question_bundle: Questions,
  vocab_examination: Questions,
  default: () => <div />,
};

function SessionPage() {
  const sessionID = Number(usePathname().split("/")[2]);
  const sessionData = queryClient.getQueryData<SessionRoot>([
    "session",
    sessionID,
  ]);

  const { sessionBelongVocabExamination } = useSelector(
    (state: RootReduxState) => state.session
  );

  const sessionType = useMemo(() => {
    if (sessionBelongVocabExamination) return "question_bundle";
    return sessionData?.sessions[0]?.data?.type || "default";
  }, []);

  useEffect(() => {
    if (sessionType === "question_bundle") {
      if (sessionBelongVocabExamination) {
        PackagingQuestionsData("vocab-examination");
      } else {
        PackagingQuestionsData("question-bundle");
      }
    }
  }, []);

  const CurrentView = views[sessionType];

  return (
    <Box
      className="session-main-content"
      sx={{
        backgroundColor:
          sessionType === "question_bundle"
            ? "question.background"
            : "transparent",
      }}
    >
      <CurrentView />
    </Box>
  );
}

export default SessionPage;
