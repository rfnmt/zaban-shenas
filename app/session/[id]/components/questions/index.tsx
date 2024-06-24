"use client";

import React, { Key, useEffect, useMemo, useRef } from "react";
import { Box, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Virtual } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";

import {
  updateCurrentQuestionIndex,
  updateGoToSlide,
  updateQuestionView,
} from "@/providers/Redux/lesson/questionSlice/questionSlice";
import { resetMultipleChoice } from "@/providers/Redux/lesson/questionSlice/multipleChoices/multipleChoicesSlice";
import { RootReduxState } from "@/providers/Redux/store";
import { resetComposeQuestion } from "@/providers/Redux/lesson/questionSlice/compose/composeSlice";
import {
  triggerButtonEnable,
  triggerViewType,
} from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { resetMatchQuestions } from "@/providers/Redux/lesson/questionSlice/matchQuestions/matchQuestionsSlice";
import { IQuestionData, RootQuestionData } from "./questions.interfaces";
import { APP_NODE_ENV } from "@/env";
import Match from "./components/match";
import MultipleChoice from "./components/multipleChoice";
import Compose from "./components/compose";

import "swiper/css";

import "./styles.scss";

function Questions() {
  const swiperRef = useRef() as any;
  const theme = useTheme() as any;
  const dispatch = useDispatch();

  const allQuestion = useSelector(
    (state: RootReduxState) => state.question.allQuestion
  );

  const goToSlide = useSelector(
    (state: RootReduxState) => state.question.goToSlide
  );

  const currentQuestionIndex = useSelector(
    (state: RootReduxState) => state.question.currentQuestionIndex
  );

  function showSpecificChild(item: IQuestionData, index: number) {
    switch (item?.type) {
      case "match":
        if (index === swiperRef?.current?.swiper?.realIndex)
          dispatch(updateQuestionView("match"));
        return <Match data={item} />;
      case "compose":
        if (index === swiperRef?.current?.swiper?.realIndex)
          dispatch(updateQuestionView("compose"));
        return <Compose data={item} />;
      case "multiple_choice":
        if (index === swiperRef?.current?.swiper?.realIndex)
          dispatch(updateQuestionView("multiple_choice"));
        return <MultipleChoice data={item} />;
      default:
        return <></>;
    }
  }

  useEffect(() => {
    if (goToSlide !== false) {
      swiperRef?.current?.swiper.slideTo(goToSlide);
      dispatch(updateGoToSlide(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goToSlide]);

  function doActionAfterChangeSwiperIndex() {
    const visibleSlide = document.querySelector(".swiper-slide-visible");

    visibleSlide?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    dispatch(resetMatchQuestions());
    dispatch(resetMultipleChoice());
    dispatch(resetComposeQuestion());
    dispatch(triggerViewType("verifyNow"));
    dispatch(triggerButtonEnable(false));
    dispatch(updateCurrentQuestionIndex(swiperRef?.current?.swiper?.realIndex));
  }

  const slideHasLimitation = useMemo(() => {
    if (allQuestion[currentQuestionIndex]?.data?.limitation !== "none") {
      return true;
    }
    return false;
  }, [currentQuestionIndex, allQuestion]);

  return (
    <>
      <Box
        id="only-question-screenshot"
        className={`question-contents ${
          slideHasLimitation ? "slide-has-limitation" : ""
        }`}
        sx={{
          background: theme.palette.question.background,
          "& .swiper-pagination": {
            background: theme.palette.border.main,
          },
        }}
      >
        <div className="container questions-area">
          <Swiper
            virtual={true}
            ref={swiperRef}
            className="question-items"
            modules={[Virtual, Keyboard]}
            onInit={doActionAfterChangeSwiperIndex}
            onRealIndexChange={doActionAfterChangeSwiperIndex}
            allowTouchMove={APP_NODE_ENV === "production" ? false : true}
            keyboard={{ enabled: APP_NODE_ENV === "production" ? false : true }}
          >
            {allQuestion?.map((item: RootQuestionData, index: Key) => {
              return (
                <SwiperSlide key={index} id={`slide-${item.id}`}>
                  {showSpecificChild(item?.data, Number(index))}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </Box>
    </>
  );
}

export default Questions;
