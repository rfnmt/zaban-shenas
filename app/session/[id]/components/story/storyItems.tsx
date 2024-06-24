"use client";
import React from "react";
import { Box } from "@mui/material";
import StoryHeader from "./storyHeader";
import StoryLineItem from "./storyLineItem";
import StorySelectPhraseQuestion from "./storySelectPhraseQuestion";
import StoryMultipleChoiceQuestion from "./storyMultipleChoiceQuestion";
import StoryMatchQuestions from "./storyMatchQuestions";
import StoryArrangeQuestion from "./storyArrangeQuestion";
import { useSelector } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";
import AutoScroll from "@brianmcallister/react-auto-scroll";
function StoryItems({ data }: any) {
  function showSpecificStoryType(item: any, index: number) {
    switch (item?.type) {
      case "header":
        // return <h3>header</h3>;
        return <StoryHeader story_header_data={item} index={index} />;
      case "multiple_choice_question":
        // return <h3>multiple_choice_question</h3>;
        return (
          <StoryMultipleChoiceQuestion
            story_multiple_choice_question_data={item}
            index={index}
          />
        );
      case "line_item":
        // return <h3>line_item</h3>;
        return <StoryLineItem story_line_item_data={item} index={index} />;
      case "select_phrase_question":
        // return <h3>select_phrase</h3>;
        return (
          <StorySelectPhraseQuestion
            story_select_phrase_question={item}
            index={index}
          />
        );
      case "arrange_question":
        // return <h3>arrange_question</h3>;
        return (
          <StoryArrangeQuestion arrange_question_data={item} index={index} />
        );
      case "match_question":
        // return <h3>match_question</h3>;
        return <StoryMatchQuestions data={item} />;
    }
  }
  const { storyPushCorrectQuestionAnswerIntoArray } = useSelector(
    (state: RootReduxState) => state.story
  );
  // console.log(storyPushCorrectQuestionAnswerIntoArray);

  return (
    <Box className="wrap-story-components" id="story-contents">
      <AutoScroll
        showOption={false}
        scrollBehavior="smooth"
        className="autoScroll"
      >
        {data?.map((item: any, index: number) => {
          return <Box key={index}>{showSpecificStoryType(item, index)}</Box>;
        })}
      </AutoScroll>
    </Box>
  );
}

export default StoryItems;
