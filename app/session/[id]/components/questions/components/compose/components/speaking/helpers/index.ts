import { comparator } from "@/app/session/[id]/helpers/comparator";
import { normalizeText } from "@/app/session/[id]/helpers/normalizeText";
import { triggerViewType } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { store } from "@/providers/Redux/store";

export function checkingUserSpeaking() {
  const allQuestion = store.getState()?.question?.allQuestion;
  const currentQuestionIndex = store.getState()?.question?.currentQuestionIndex;
  const answerUserWithMicrophone =
    store.getState()?.composeQuestions?.answerUserWithMicrophone;

  const { acceptable_answers } = allQuestion[currentQuestionIndex]?.data;

  for (let index = 0; index < acceptable_answers?.length; index++) {
    const acceptableAnswer = acceptable_answers[index];

    const normalizeAcceptableAnswer = normalizeText(
      String(acceptableAnswer.text)
    ).join(" ");

    const normalizeUserAnswer = normalizeText(answerUserWithMicrophone).join(
      " "
    );

    const answer = comparator(normalizeAcceptableAnswer, normalizeUserAnswer);

    if (answer?.accepted) {
      store.dispatch(triggerViewType("correct"));
      break;
    }

    const modifyCurrentQuestionData = { ...allQuestion[currentQuestionIndex] };

    if (modifyCurrentQuestionData?.wrongCounter > 1)
      store.dispatch(triggerViewType("incorrectMoveOn"));
    else store.dispatch(triggerViewType("speakingIncorrect"));
  }
}
