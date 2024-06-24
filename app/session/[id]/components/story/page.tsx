"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import StoryItems from "./storyItems";
import { useDispatch, useSelector } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";
import {
  triggerStoryButtonEnable,
  triggerViewType,
} from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import {
  resetStoryPushingCorrectAnswer,
  updateStoryCatchExistedLine_elementFromArrangeQuestion,
  updateStoryCatchExistedLine_elementFromSelectPhrase,
  updateStoryCurrentQuestionIndex,
  updateStoryEnableAddingScoreFromMatchQuestions,
  updateStoryShowAllArrangeQuestionChoices,
  updateStoryShowAllSelectPhraseQuestionChoices,
  updateStoryNumberOfMatchQuestionsCorrectAnswers,
  updateWordsCorrectOrderStoryArrangQuestion,
  updateAnswerStoryfillDamagedSentenceWithChoices,
} from "@/providers/Redux/lesson/storySlice/storySlice";
import {
  updateAccuracy,
  updateGaindXp,
  updateSessionCompleted,
} from "@/providers/Redux/lesson/session/sessionSlice";
import { useSessionQuery } from "../../hook/useSessionQuery";
import { updateIndexdbTables } from "./helpers";
import {
  resetStoryDisableItems,
  updateStoryCurrectItems,
  updateStorySelectedLearningWord,
  updateStorySelectedTranslate,
  updateStoryWrongItems,
} from "@/providers/Redux/lesson/storySlice/storyMatchQuestions/storyMatchQuestionsSlice";

import "./styles.scss";
function StoryLayout() {
  const dispatch = useDispatch();
  const {
    storyCurrentQuestionIndex,
    storyPushCorrectQuestionAnswerIntoArray,
    storyCatchExistedLine_elementFromArrangeQuestion,
    storyCatchExistedLine_elementFromSelectPhrase,
  } = useSelector((state: RootReduxState) => state.story);
  const pathname = usePathname().split("/");
  const cachedSessionData = queryClient.getQueryData([
    "session",
    Number(pathname[2]),
  ]) as any;

  const [getAllStories, setGetAllStories] = useState([
    cachedSessionData?.stories[0]?.data?.content_body[0],
  ]);
  const typeOfCurrentElement =
    cachedSessionData?.stories[0]?.data?.content_body[
      storyCurrentQuestionIndex
    ];

  useEffect(() => {
    dispatch(triggerViewType("continueAsStory"));
    dispatch(resetStoryPushingCorrectAnswer());
    dispatch(updateStoryEnableAddingScoreFromMatchQuestions(true));
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log("reset All redux STATES");
    // when we logout from story ,story index must bacome ZERO
    // dispatch(updateStoryCurrentQuestionIndex(0));
    dispatch(updateStoryCatchExistedLine_elementFromArrangeQuestion({}));
    dispatch(updateStoryCatchExistedLine_elementFromSelectPhrase({}));
    // if we use triggerViewType("continueAsStory") then triggerViewType("continueAsTip") will not work
    // we must put triggerViewType("continueAsStory") in story page
    // dispatch(triggerViewType("continueAsStory"));
    dispatch(updateStoryShowAllSelectPhraseQuestionChoices(false));
    dispatch(updateAnswerStoryfillDamagedSentenceWithChoices([]));
    dispatch(updateStoryShowAllArrangeQuestionChoices(false));
    dispatch(updateStorySelectedLearningWord(null));
    dispatch(updateStorySelectedTranslate(null));
    dispatch(updateStoryCurrectItems(null));
    dispatch(updateStoryWrongItems(null));
    dispatch(updateStoryNumberOfMatchQuestionsCorrectAnswers(0));
    dispatch(resetStoryDisableItems());
    dispatch(updateWordsCorrectOrderStoryArrangQuestion(0));
    return () => {
      dispatch(updateStoryCurrentQuestionIndex(0));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedSessionData]);

  useEffect(() => {
    if (
      storyCurrentQuestionIndex ===
      cachedSessionData?.stories[0]?.data?.content_body.length
    ) {
      dispatch(triggerStoryButtonEnable(false));
      const filterAllStoryQuestions =
        cachedSessionData?.stories[0]?.data?.content_body?.filter(
          (item, index) => item.type !== "header" && item.type !== "line_item"
        );
      dispatch(updateGaindXp(filterAllStoryQuestions.length));
      const filteredCorrectAnswers =
        storyPushCorrectQuestionAnswerIntoArray.filter(
          (item) => item !== undefined
        );
      dispatch(
        updateAccuracy(
          (filteredCorrectAnswers.length / filterAllStoryQuestions.length) * 100
        )
      );
      dispatch(updateSessionCompleted(true));

      updateIndexdbTables();
    } else {
      if (storyCurrentQuestionIndex > 0) {
        if (
          Object.keys(
            storyCatchExistedLine_elementFromSelectPhrase.line_element
          ).length !== 0
        ) {
          // setGetAllStories((prev: any) => [
          //   ...prev
          //     .concat(
          //       cachedSessionData?.stories[0]?.data?.content_body[
          //         storyCurrentQuestionIndex
          //       ]
          //     )
          //     .with(
          //       storyCurrentQuestionIndex - 1,
          //       storyCatchExistedLine_elementFromSelectPhrase
          //     ),
          // ]);

          getAllStories.pop();
          getAllStories.push(storyCatchExistedLine_elementFromSelectPhrase);
          setGetAllStories(
            getAllStories.concat(
              cachedSessionData?.stories[0]?.data?.content_body[
                storyCurrentQuestionIndex
              ]
            )
          );
          dispatch(updateStoryCatchExistedLine_elementFromSelectPhrase({}));
        } else if (
          Object.keys(
            storyCatchExistedLine_elementFromArrangeQuestion.line_element
          ).length !== 0
        ) {
          // setGetAllStories((prev: any) => [
          //   ...prev
          //     .concat(
          //       cachedSessionData?.stories[0]?.data?.content_body[
          //         storyCurrentQuestionIndex
          //       ]
          //     )
          //     .with(
          //       storyCurrentQuestionIndex - 1,
          //       storyCatchExistedLine_elementFromArrangeQuestion
          //     ),
          // ]);

          getAllStories.pop();
          getAllStories.push(storyCatchExistedLine_elementFromArrangeQuestion);
          setGetAllStories(
            getAllStories.concat(
              cachedSessionData?.stories[0]?.data?.content_body[
                storyCurrentQuestionIndex
              ]
            )
          );
          dispatch(updateWordsCorrectOrderStoryArrangQuestion(0));
          dispatch(updateStoryCatchExistedLine_elementFromArrangeQuestion({}));
        } else {
          setGetAllStories((prev: any) => [
            ...prev.concat(
              cachedSessionData?.stories[0]?.data?.content_body[
                storyCurrentQuestionIndex
              ]
            ),
          ]);
        }
      }
    }
    if (typeOfCurrentElement?.type === "select_phrase_question") {
      if (
        typeOfCurrentElement.line_element === null ||
        typeOfCurrentElement.line_element.tts === null
      ) {
        dispatch(updateStoryShowAllSelectPhraseQuestionChoices(true));
      }
    } else {
      // console.log("every thing apart from select_phrase_question");
      dispatch(updateStoryShowAllSelectPhraseQuestionChoices(false));
    }
  }, [storyCurrentQuestionIndex]);

  return (
    <Box
      display="flex"
      bgcolor="background.main"
      className="main-story-wrapper container"
    >
      <StoryItems data={getAllStories} />
    </Box>
  );
}

export default StoryLayout;
