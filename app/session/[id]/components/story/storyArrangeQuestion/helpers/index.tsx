import { triggerStoryButtonEnable } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { store } from "@/providers/Redux/store";
import { updateAnswerStoryfillDamagedSentenceWithChoices } from "@/providers/Redux/lesson/storySlice/storySlice";

export function clickedArrangeQuestionChoicesAction(data) {
  const { answerStoryfillDamagedSentenceWithChoices } = store.getState()?.story;

  const filterInvisibleNotFilled: [] = [];

  const findFirstEmptyCell =
    answerStoryfillDamagedSentenceWithChoices.findIndex(
      (item) => item["id"] === undefined
    );

  answerStoryfillDamagedSentenceWithChoices.map((item, i) => {
    if (i === findFirstEmptyCell)
      filterInvisibleNotFilled.push({ ...item, ...data });
    else filterInvisibleNotFilled.push(item);
  });

  store.dispatch(
    updateAnswerStoryfillDamagedSentenceWithChoices(filterInvisibleNotFilled)
  );

  const enableSessionNavigator = filterInvisibleNotFilled.every(
    (item) => item.text !== undefined
  );

  store.dispatch(triggerStoryButtonEnable(enableSessionNavigator));
}
