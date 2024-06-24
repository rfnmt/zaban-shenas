import React, { useMemo } from "react";
import { LinearProgress, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
import { motion, useScroll } from "framer-motion";

import { RootReduxState } from "@/providers/Redux/store";
import { usePathname } from "next/navigation";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { RootVocabExamination } from "@/models/vocabExamination";

import "./styles.scss";

function Progress() {
  const pathname = usePathname().split("/")[2];

  const { allQuestion, currentQuestionIndex } = useSelector(
    (state: RootReduxState) => state?.question
  );

  const sessionID = Number(usePathname().split("/")[2]);

  const cachedSessionData = queryClient.getQueryData(["session", sessionID]);
  const cachedVocabExamination = queryClient.getQueryData<RootVocabExamination>(
    ["vocab-examination"]
  );

  const isVocabExamination = useMemo(() => {
    if (pathname === "vocab-examination") return true;
    return false;
  }, [pathname]);

  const type = isVocabExamination
    ? "question_bundle"
    : cachedSessionData?.sessions[0]?.data?.type;

  const { scrollYProgress } = useScroll();

  const { storyCurrentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.story
  );

  const progressValue = useMemo(() => {
    if (isVocabExamination) {
      return (
        (currentQuestionIndex /
          (cachedVocabExamination?.number_of_questions_for_each_stage *
            cachedVocabExamination?.max_exam_stages)) *
        100
      );
    } else {
      let questionPassedCount = 0;
      for (let index = 0; index < allQuestion?.length; index++) {
        const item = allQuestion[index];
        if (item?.passed || item?.skipped) questionPassedCount++;
      }

      return (questionPassedCount * 100) / allQuestion?.length;
    }
  }, [allQuestion, isVocabExamination, currentQuestionIndex]);

  return (
    <>
      <div className="session-progressbar">
        {type === "question_bundle" ? (
          <LinearProgress
            sx={{ backgroundColor: "border.main" }}
            className=""
            variant="determinate"
            value={progressValue}
          />
        ) : type === "story" ? (
          <LinearProgress
            sx={{ backgroundColor: "border.main" }}
            className=""
            variant="determinate"
            value={
              ((storyCurrentQuestionIndex + 1) * 100) /
              cachedSessionData?.stories[0]?.data?.content_body.length
            }
          />
        ) : (
          <motion.div
            className=" use-scroll"
            style={{ scaleX: scrollYProgress }}
          />
        )}
      </div>
      <Toolbar sx={{ height: "8px" }} className="after-progressbar-space" />
    </>
  );
}

export default Progress;
