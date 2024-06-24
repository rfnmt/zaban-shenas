import { store } from "@/providers/Redux/store";
import { goNextQuestionSlice } from "./goNextQuestionSlice";
import { updateAllQuestion } from "@/providers/Redux/lesson/questionSlice/questionSlice";

export function skipQuestion(
  type: "listening" | "speaking" | "vocabExamination"
) {
  const allQuestion = store.getState().question.allQuestion;
  const currentQuestionIndex = store.getState().question.currentQuestionIndex;

  const modifyAllQuestions = [];

  for (const index in Object.keys(allQuestion)) {
    if (type === "vocabExamination") {
      if (Number(index) === currentQuestionIndex) {
        const currentQuestion = { ...allQuestion[index] };

        currentQuestion.skipped = true;
        modifyAllQuestions.push(currentQuestion);
      } else {
        modifyAllQuestions.push(allQuestion[index]);
      }
    } else {
      if (
        Number(index) >= currentQuestionIndex &&
        allQuestion[index].data.limitation === type
      ) {
        const currentQuestion = { ...allQuestion[index] };

        currentQuestion.skipped = true;
        currentQuestion.gainedXp = 0;
        modifyAllQuestions.push(currentQuestion);
      } else {
        modifyAllQuestions.push(allQuestion[index]);
      }
    }
  }

  store.dispatch(updateAllQuestion(modifyAllQuestions));

  setTimeout(() => {
    goNextQuestionSlice();
  }, 100);
}
