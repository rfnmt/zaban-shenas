import {
  updateCorrectAnswerCounter,
  updateCurrectItems,
  updateDisableItems,
  updateSelectedLearningWord,
  updateSelectedTranslate,
  updateWrongAnswerCounter,
  updateWrongItems,
} from "@/providers/Redux/lesson/questionSlice/matchQuestions/matchQuestionsSlice";
import { updateAllQuestion } from "@/providers/Redux/lesson/questionSlice/questionSlice";
import { triggerViewType } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { store } from "@/providers/Redux/store";

export function changeSelectedTranslation(params: any) {
  const { selectedTranslateWord, selectedLearningWord } =
    store.getState()?.matchQuestions;

  const { allQuestion, currentQuestionIndex } = store?.getState()?.question;

  if (Object.is(params, selectedTranslateWord)) {
    store.dispatch(updateSelectedTranslate(null));
  } else {
    if (allQuestion[currentQuestionIndex]?.id === params.id) {
      store.dispatch(updateSelectedTranslate(params));

      if (selectedLearningWord) {
        checkAnswers(selectedLearningWord, params);
      }
    }
  }
}

export function changeSelectedLearningWord(params: any) {
  const { selectedTranslateWord, selectedLearningWord } =
    store.getState()?.matchQuestions;

  const { allQuestion, currentQuestionIndex } = store?.getState()?.question;

  if (Object.is(selectedLearningWord, params)) {
    store.dispatch(updateSelectedLearningWord(null));
  } else {
    if (allQuestion[currentQuestionIndex]?.id === params.id) {
      store.dispatch(updateSelectedLearningWord(params));

      if (selectedTranslateWord) {
        checkAnswers(params, selectedTranslateWord);
      }

      const { tts } = params;

      const audio: any = document?.getElementById(
        tts?.split("/")[tts?.split("/").length - 1]
      );

      var videos: any = document.querySelectorAll("video");
      var audios: any = document.querySelectorAll("audio");

      for (const iterator of videos) {
        iterator.pause();
      }

      for (const iterator of audios) {
        iterator.currentTime = 0;
        iterator.pause();
      }

      if (audio) audio.play();
    }
  }
}

function checkAnswers(learning_word: any, translation: any) {
  const { currentQuestionIndex, allQuestion } = store.getState()?.question;
  const { wrongAnswersCount, correctAnswerCount } =
    store.getState().matchQuestions;

  if (learning_word.key === translation.key) {
    store.dispatch(updateCurrectItems(learning_word?.key));
    store.dispatch(updateCorrectAnswerCounter(correctAnswerCount + 1));

    setTimeout(() => {
      store.dispatch(updateDisableItems(learning_word?.key));
      store.dispatch(updateCurrectItems(null));
      store.dispatch(updateSelectedLearningWord(null));
      store.dispatch(updateSelectedTranslate(null));

      if (
        correctAnswerCount + 1 ===
        allQuestion[currentQuestionIndex]?.data?.pairs?.length
      ) {
        const modifyCurrentQuestionData = {
          ...allQuestion[currentQuestionIndex],
        };

        modifyCurrentQuestionData.passed = true;

        const modifyAllQuestions = allQuestion.map(
          (item: any, index: number | null) => {
            if (index === currentQuestionIndex)
              return modifyCurrentQuestionData;
            return item;
          }
        );

        store.dispatch(triggerViewType("correct"));
        store.dispatch(updateAllQuestion(modifyAllQuestions));
      }
    }, 200);
  } else {
    store.dispatch(updateWrongItems([learning_word.key, translation.key]));
    store.dispatch(updateWrongAnswerCounter(wrongAnswersCount + 1));

    const modifyCurrentQuestionData = {
      ...allQuestion[currentQuestionIndex],
    };

    modifyCurrentQuestionData.passed = false;
    modifyCurrentQuestionData.flawlessPassed = false;
    modifyCurrentQuestionData.wrongCounter =
      modifyCurrentQuestionData?.wrongCounter + 1;
    modifyCurrentQuestionData.gainedXp =
      modifyCurrentQuestionData?.gainedXp / 2;

    const modifyAllQuestions = allQuestion.map(
      (item: any, index: number | null) => {
        if (index === currentQuestionIndex) return modifyCurrentQuestionData;
        return item;
      }
    );

    store.dispatch(updateAllQuestion(modifyAllQuestions));

    if (wrongAnswersCount < 1) {
      store.dispatch(triggerViewType("incorrect"));
    } else {
      setTimeout(() => {
        store.dispatch(updateWrongItems([]));
        store.dispatch(updateSelectedLearningWord(null));
        store.dispatch(updateSelectedTranslate(null));
      }, 500);
    }
  }
}
