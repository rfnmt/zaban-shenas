import { RootVocabExamination } from "@/models/vocabExamination";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { updateAllQuestion } from "@/providers/Redux/lesson/questionSlice/questionSlice";
import { store } from "@/providers/Redux/store";
import { SessionRoot } from "../sessions.interfaces";
import { questionOrder } from "@/modules/helper";

type sessionType = "question-bundle" | "vocab-examination";

export function PackagingQuestionsData(sessionType: sessionType) {
  if (sessionType === "vocab-examination") {
    const vocabExaminationData = queryClient.getQueryData<RootVocabExamination>(
      ["vocab-examination"]
    );

    if (vocabExaminationData?.new_vocab_set?.length) {
      const modifyVocabExamination = vocabExaminationData?.new_vocab_set?.map(
        (item) => {
          return {
            data: {
              ...item,
            },
            rank: item.rank,
            id: item.id,
            passed: false,
            skipped: false,
          };
        }
      );

      if (modifyVocabExamination)
        store.dispatch(updateAllQuestion(modifyVocabExamination));
    }
  } else {
    const pathname = window?.location?.pathname;

    const sessionData = queryClient.getQueryData<SessionRoot>([
      "session",
      Number(pathname.split("/")[2]),
    ]);

    if (sessionData?.questions) {
      const modifySessionData = sessionData?.questions?.map((item) => {
        return {
          ...item,
          flawlessPassed: true,
          passed: false,
          skipped: false,
          wrongCounter: 0,
          gainedXp: 1,
        };
      });

      const orderedQuestions = questionOrder(
        modifySessionData,
        sessionData?.sessions[0]?.data?.question_ids,
        "id"
      );

      store.dispatch(updateAllQuestion(orderedQuestions));
    }
  }
}
