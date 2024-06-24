import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ComposeChoice from "./choices";
import { updateDamageSentenceWithChoiceAnswer } from "@/providers/Redux/lesson/questionSlice/compose/composeSlice";
import { DamageSentence } from "./damagedSentence";
import { RootReduxState } from "@/providers/Redux/store";
import { IQuestionData } from "../../../../questions.interfaces";

import "./styles.scss";

function FillDamagedSentenceWithChoices({ data }: { data: IQuestionData }) {
  const dispatch = useDispatch();
  const { currentQuestionIndex, allQuestion } = useSelector(
    (state: RootReduxState) => state.question
  );

  const { viewType } = useSelector(
    (state: RootReduxState) => state.sessionNavigator
  );

  useEffect(() => {
    if (
      allQuestion[currentQuestionIndex].id === data.id &&
      viewType === "verifyNow"
    ) {
      dispatch(
        updateDamageSentenceWithChoiceAnswer(data?.damaged_sentence?.display)
      );
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex, viewType]);

  return (
    <div className="fill-damaged-sentence-with-choices">
      <DamageSentence data={data} />
      <ComposeChoice mainData={data} />
    </div>
  );
}

export default FillDamagedSentenceWithChoices;
