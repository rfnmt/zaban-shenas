import { store } from "@/providers/Redux/store";
import {
  updateAllQuestion,
  updateGoToSlide,
} from "@/providers/Redux/lesson/questionSlice/questionSlice";
import {
  updateAccuracy,
  updateGaindXp,
  updateLatestSessionIDUserStudy,
  updateSessionCompleted,
} from "@/providers/Redux/lesson/session/sessionSlice";
import {
  triggerButtonEnable,
  triggerViewType,
} from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { resetComposeQuestion } from "@/providers/Redux/lesson/questionSlice/compose/composeSlice";
import { resetMatchQuestions } from "@/providers/Redux/lesson/questionSlice/matchQuestions/matchQuestionsSlice";
import { resetMultipleChoice } from "@/providers/Redux/lesson/questionSlice/multipleChoices/multipleChoicesSlice";
import { updateQuestionTable } from "./updateQestionTable";
import { updateSessionTable } from "./updateSessionTable";
import { updateLessonTable } from "./updateLessonTable";
import { updateCourseTable } from "./updateCourseTable";
import { updateExperiences } from "./updateExperiences";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { RootVocabExamination } from "@/models/vocabExamination";
import { sendVocabExamintaion } from "@/app/onboarding/components/placement/api";
import {
  resetLoading,
  updateLoadingStates,
} from "@/providers/Redux/loading/loadingSlice";
import { goToFirstSessionBelongCourseID } from "@/app/onboarding/helpers";

export async function goNextQuestionSlice() {
  const sessionID = Number(window.location.pathname.split("/")[2]);

  const { allQuestion, currentQuestionIndex } = store.getState()?.question;
  const { sessionBelongVocabExamination } = store.getState()?.session;

  const nextQuestionIndex = allQuestion.findIndex(
    (item, index: number) =>
      index > currentQuestionIndex &&
      item.skipped === false &&
      item.passed === false
  );

  const nextQuestionNotPassedIndex = allQuestion.findIndex(
    (item) =>
      item.skipped === false && item.passed === false && item?.wrongCounter < 3
  );

  store.dispatch(triggerButtonEnable(false));
  store.dispatch(triggerViewType("verifyNow"));
  store.dispatch(resetComposeQuestion());
  store.dispatch(resetMatchQuestions());
  store.dispatch(resetMultipleChoice());

  if (nextQuestionIndex > -1)
    store.dispatch(updateGoToSlide(nextQuestionIndex));
  else if (nextQuestionNotPassedIndex > -1 && !sessionBelongVocabExamination) {
    store.dispatch(updateGoToSlide(nextQuestionNotPassedIndex));
  } else {
    if (sessionBelongVocabExamination) {
      const goVocabExaminationId =
        store.getState()?.onboarding?.goVocabExaminationId;

      const currentQuestionIndex =
        store.getState()?.question.currentQuestionIndex;

      const vocabExaminationStages = [];

      for (let index = 0; index < allQuestion.length; index++) {
        if (
          allQuestion[index].skipped === true ||
          allQuestion[index].passed === false
        ) {
          vocabExaminationStages.push({
            id: allQuestion[index].id,
            rank: allQuestion[index].data?.rank,
            answer: false,
          });
        } else {
          vocabExaminationStages.push({
            id: allQuestion[index].id,
            rank: allQuestion[index].data?.rank,
            answer: true,
          });
        }
      }

      const cachedVocabExamination =
        queryClient.getQueryData<RootVocabExamination>(["vocab-examination"]);

      const prepareData = [];

      if (cachedVocabExamination?.vocab_examination.length)
        prepareData.push(...cachedVocabExamination?.vocab_examination);

      prepareData.push({
        questions: [...vocabExaminationStages],
      });

      if (goVocabExaminationId) {
        store.dispatch(
          updateLoadingStates({
            config: {
              lottieWidth: 200,
              lottieHeight: 200,
              visible: true,
              lottieType: "loading.json",
              subtitle: "لطفا شکیبا باشید...",
              title: "درحال بررسی جواب های شما..",
            },
          })
        );
        sendVocabExamintaion({
          vocab_estimate_self_evaluation: goVocabExaminationId,
          vocab_examination_stages: prepareData,
        }).then(async function (response) {
          queryClient.setQueryData(["vocab-examination"], response.data);

          if (response?.data?.recommended_course) {
            store.dispatch(
              updateLoadingStates({
                config: {
                  visible: true,
                  lottieType: "waiting.json",
                  subtitle: "لطفا شکیبا باشید...",
                  titleBeforeLottie: "درحال آماده‌سازی اولین درس برای شما..",
                },
              })
            );

            goToFirstSessionBelongCourseID(response?.data?.recommended_course);

            let gainedXp = 10;
            let accuracy = 0;

            for (const question of allQuestion) {
              if (question.passed === true) {
                accuracy++;
              }
            }

            store.dispatch(updateGaindXp(gainedXp));
            store.dispatch(
              updateAccuracy((accuracy / allQuestion?.length) * 100)
            );

            if (allQuestion.length) {
              await updateQuestionTable(allQuestion);
              await updateExperiences();

              store.dispatch(updateSessionCompleted(true));
            }
          } else {
            store.dispatch(resetLoading());
            const modifyAllQuestion = [...allQuestion];

            response?.data?.new_vocab_set?.map((item) => {
              modifyAllQuestion.push({
                data: {
                  ...item,
                },
                rank: item.rank,
                id: item.id,
                passed: false,
                skipped: false,
              });
            });

            store.dispatch(updateAllQuestion(modifyAllQuestion));
            store.dispatch(updateGoToSlide(currentQuestionIndex + 1));
          }
        });
      }
    } else {
      let gainedXp = 0;
      let accuracy = 0;

      for (const question of allQuestion) {
        if (question.skipped === false) {
          if (question.flawlessPassed) accuracy++;
          gainedXp += question?.gainedXp;
        }
      }

      store.dispatch(updateLatestSessionIDUserStudy(sessionID));
      store.dispatch(updateGaindXp(gainedXp));
      store.dispatch(updateAccuracy((accuracy / allQuestion?.length) * 100));

      if (allQuestion.length) {
        await updateQuestionTable(allQuestion);
        await updateSessionTable();
        await updateLessonTable();
        await updateCourseTable();
        await updateExperiences();

        store.dispatch(updateSessionCompleted(true));
      }
    }
  }
}
