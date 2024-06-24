import { levenshtein } from "@/app/session/[id]/helpers/levenshteinDistance";
import { triggerViewType } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { store } from "@/providers/Redux/store";

export function checkTextareaAnswer() {
  const textareaAnswer = store.getState().composeQuestions.textareaAnswer;
  const { currentQuestionIndex, allQuestion } = store.getState().question;

  const { acceptable_answers } = allQuestion[currentQuestionIndex]?.data;

  const allInputsLength = textareaAnswer.length;

  if (textareaAnswer) {
    const answer = levenshtein({
      acceptableAnswers: acceptable_answers,
      userAnswers: textareaAnswer,
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
