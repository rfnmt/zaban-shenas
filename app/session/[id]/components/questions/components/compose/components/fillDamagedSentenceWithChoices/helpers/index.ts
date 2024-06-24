import { identically } from "@/app/session/[id]/helpers/identically";
import { updateAnswerFillDamagedSentenceWithChoices } from "@/providers/Redux/lesson/questionSlice/compose/composeSlice";
import {
  triggerButtonEnable,
  triggerViewType,
} from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { store } from "@/providers/Redux/store";

export function clickedChoicesAction(data) {
  const { answerfillDamagedSentenceWithChoices } =
    store.getState()?.composeQuestions;

  const filterInvisibleNotFilled: [] = [];

  const findFirstEmptyCell = answerfillDamagedSentenceWithChoices.findIndex(
    (item) => item["id"] === undefined
  );

  answerfillDamagedSentenceWithChoices.map((item, i) => {
    if (i === findFirstEmptyCell)
      filterInvisibleNotFilled.push({ ...item, ...data });
    else filterInvisibleNotFilled.push(item);
  });

  store.dispatch(
    updateAnswerFillDamagedSentenceWithChoices(filterInvisibleNotFilled)
  );

  const enableSessionNavigator = filterInvisibleNotFilled.every(
    (item) => item.text !== undefined
  );

  store.dispatch(triggerButtonEnable(enableSessionNavigator));
}

export function arrangeDroppedChoice(data, index) {
  const { answerfillDamagedSentenceWithChoices } =
    store.getState()?.composeQuestions;

  const filterInvisibleNotFilled: [] = [];

  answerfillDamagedSentenceWithChoices.map((item, i) => {
    if (i === index) filterInvisibleNotFilled.push({ ...item, ...data });
    else filterInvisibleNotFilled.push(item);
  });

  store.dispatch(
    updateAnswerFillDamagedSentenceWithChoices(filterInvisibleNotFilled)
  );

  const enableSessionNavigator = filterInvisibleNotFilled.every(
    (item) => item.text !== undefined
  );

  store.dispatch(triggerButtonEnable(enableSessionNavigator));
}

export function removeSpecificCell(index) {
  store.dispatch(triggerViewType("verifyNow"));
  store.dispatch(triggerButtonEnable(false));

  const { answerfillDamagedSentenceWithChoices } =
    store.getState()?.composeQuestions;

  const filterInvisibleNotFilled: [] = [];

  answerfillDamagedSentenceWithChoices.map((item, i) => {
    if (i === index)
      filterInvisibleNotFilled.push({
        from: answerfillDamagedSentenceWithChoices[i].from,
        to: answerfillDamagedSentenceWithChoices[i].to,
      });
    else filterInvisibleNotFilled.push(item);
  });

  store.dispatch(
    updateAnswerFillDamagedSentenceWithChoices(filterInvisibleNotFilled)
  );
}

export function checkDamageSentenceWithChoiceAnswer() {
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
