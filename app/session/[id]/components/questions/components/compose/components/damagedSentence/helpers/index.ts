import { levenshtein } from "@/app/session/[id]/helpers/levenshteinDistance";
import { triggerViewType } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { store } from "@/providers/Redux/store";
import { DamagedItems } from "../../../../../types";

export function checkUserAnswesInDamagedWords() {
  const allQuestion = store.getState()?.question?.allQuestion;
  const fillDamagedSentenceWithWriting =
    store.getState()?.composeQuestions?.fillDamagedSentenceWithWriting;
  const currentQuestionIndex = store.getState()?.question?.currentQuestionIndex;

  const { acceptable_answers } = allQuestion[currentQuestionIndex]?.data;

  const allInputsLength = fillDamagedSentenceWithWriting
    .map((item: DamagedItems) => item.content)
    .join("").length;

  const getContenx = document.getElementById(
    `review-section-${allQuestion[currentQuestionIndex]?.id}`
  )?.textContent;

  if (getContenx) {
    const answer = levenshtein({
      acceptableAnswers: acceptable_answers,
      userAnswers: getContenx,
      inputsLength: allInputsLength,
    });

    if (answer?.accepted) {
      store.dispatch(triggerViewType("correct"));
    } else {
      if (allQuestion[currentQuestionIndex]?.wrongCounter > 1) {
        store.dispatch(triggerViewType("incorrectMoveOn"));
      } else {
        store.dispatch(triggerViewType("incorrect"));
      }
    }
  }
}
