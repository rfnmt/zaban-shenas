import { levenshtein } from "@/app/session/[id]/helpers/levenshteinDistance";
import { triggerViewType } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { store } from "@/providers/Redux/store";

export function checkTextareaWithChoiceAnswer() {
  const textareaWithChoiceAnswer =
    store.getState().composeQuestions.textareaWithChoiceAnswer;

  const { selectable, freeText } = textareaWithChoiceAnswer;

  const { allQuestion, currentQuestionIndex } = store.getState()?.question;

  const { acceptable_answers } = allQuestion[currentQuestionIndex]?.data;

  const userAnswer = levenshtein({
    acceptableAnswers: acceptable_answers,
    userAnswers: selectable + " " + freeText,
    inputsLength: freeText.length,
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
