import { store } from "@/providers/Redux/store";
import {
  updateStoryCurrectItems,
  updateStoryDisableItems,
  updateStorySelectedLearningWord,
  updateStorySelectedTranslate,
  updateStoryWrongItems,
} from "@/providers/Redux/lesson/storySlice/storyMatchQuestions/storyMatchQuestionsSlice";
import {
  updateStoryEnableAddingScoreFromMatchQuestions,
  updateStoryNumberOfMatchQuestionsCorrectAnswers,
} from "@/providers/Redux/lesson/storySlice/storySlice";
import { updateSessionTable } from "../../sessionNavigator/helpers/updateSessionTable";
import { updateLessonTable } from "../../sessionNavigator/helpers/updateLessonTable";
import { updateCourseTable } from "../../sessionNavigator/helpers/updateCourseTable";
import { updateExperiences } from "../../sessionNavigator/helpers/updateExperiences";

export function changeStorySelectedTranslation(getTranslationParam: any) {
  const { storySelectedTranslateWord, storySelectedLearningWord } =
    store.getState()?.storyMatching;

  if (Object.is(getTranslationParam, storySelectedTranslateWord)) {
    store.dispatch(updateStorySelectedTranslate(null));
  } else {
    store.dispatch(updateStorySelectedTranslate(getTranslationParam));

    if (storySelectedLearningWord) {
      checkAnswers(storySelectedLearningWord, getTranslationParam);
    }
  }
}

export function changeStorySelectedLearningWord(getLearningParams: any) {
  const { storySelectedTranslateWord, storySelectedLearningWord } =
    store.getState()?.storyMatching;

  if (Object.is(storySelectedLearningWord, getLearningParams)) {
    store.dispatch(updateStorySelectedLearningWord(null));
  } else {
    store.dispatch(updateStorySelectedLearningWord(getLearningParams));

    if (storySelectedTranslateWord) {
      checkAnswers(getLearningParams, storySelectedTranslateWord);
    }

    const { tts } = getLearningParams;

    if (tts) {
      const audio: any = document.getElementById(
        tts.split("/")[tts.split("/").length - 1]
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
  const { storyNumberOfMatchQuestionsCorrectAnswers } = store.getState()?.story;

  if (learning_word.id === translation.id) {
    store.dispatch(updateStoryCurrectItems(learning_word?.id));
    store.dispatch(
      updateStoryNumberOfMatchQuestionsCorrectAnswers(
        storyNumberOfMatchQuestionsCorrectAnswers + 1
      )
    );

    setTimeout(() => {
      store.dispatch(updateStoryDisableItems(learning_word?.id));
      store.dispatch(updateStoryCurrectItems(null));
      store.dispatch(updateStorySelectedLearningWord(null));
      store.dispatch(updateStorySelectedTranslate(null));
    }, 200);
  } else {
    store.dispatch(updateStoryWrongItems([learning_word.id, translation.id]));
    store.dispatch(updateStoryEnableAddingScoreFromMatchQuestions(false));
    setTimeout(() => {
      store.dispatch(updateStoryWrongItems([]));
      store.dispatch(updateStorySelectedLearningWord(null));
      store.dispatch(updateStorySelectedTranslate(null));
    }, 500);
  }
}

export async function updateIndexdbTables() {
  await updateSessionTable();
  await updateLessonTable();
  await updateCourseTable();
  await updateExperiences();
}
