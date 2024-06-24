import { identically } from "@/app/session/[id]/helpers/identically";
import { triggerViewType } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { store } from "@/providers/Redux/store";

export function checkMakeSentenceWithChoiceAnswer() {
  const { allQuestion, currentQuestionIndex } = store.getState()?.question;

  const { acceptable_answers } = allQuestion[currentQuestionIndex]?.data;

  const textContent = document.querySelector(
    `#review-section-${allQuestion[currentQuestionIndex]?.id}`
  )?.textContent;

  if (textContent) {
    const userAnswer = identically({
      userAnswers: textContent,
      acceptableAnswers: acceptable_answers,
    });

    if (userAnswer.accepted) store.dispatch(triggerViewType("correct"));
    else {
      if (allQuestion[currentQuestionIndex]?.wrongCounter > 1) {
        store.dispatch(triggerViewType("incorrectMoveOn"));
      } else {
        store.dispatch(triggerViewType("incorrect"));
      }
    }
  }
}
