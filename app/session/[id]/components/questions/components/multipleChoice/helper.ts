import { triggerViewType } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { RootReduxState, store } from "@/providers/Redux/store";
import { Choices } from "../../questions.interfaces";
import { updateAllQuestion } from "@/providers/Redux/lesson/questionSlice/questionSlice";

export function checkingUserSelectedItemWithAcceptableAnswer() {
  const multipleChoiceSelectedAnswer: number[] | [] =
    store.getState().multipleChoise.multipleChoiceSelectedAnswer;
  const { currentQuestionIndex, allQuestion } = store.getState()?.question;

  const multipleChoiceCorrectAnswer: Choices[] | [] =
    store.getState().multipleChoise.multipleChoiceCorrectAnswer;

  const findCorrectAnswer: number[] | [] = [];

  for (let index = 0; index < multipleChoiceCorrectAnswer?.length; index++) {
    const element = multipleChoiceCorrectAnswer[index];
    if (element?.correct_choice === true) {
      findCorrectAnswer.push(element?.id);
    }
  }

  const isEqual =
    multipleChoiceSelectedAnswer.length === findCorrectAnswer.length &&
    multipleChoiceSelectedAnswer.every((val) =>
      findCorrectAnswer.includes(val)
    );

  if (isEqual) {
    store.dispatch(triggerViewType("correct"));
  } else {
    if (allQuestion[currentQuestionIndex]?.wrongCounter > 1) {
      store.dispatch(triggerViewType("incorrectMoveOn"));
    } else {
      store.dispatch(triggerViewType("incorrect"));
    }
  }
}
