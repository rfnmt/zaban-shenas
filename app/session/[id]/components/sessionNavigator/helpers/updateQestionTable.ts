import dayjs from "dayjs";

import {
  getSpecificQuestions,
  pushFreshQuestionsWithTrueHasUpdate,
} from "@/providers/Dexie/questions";
import { RootQuestionData } from "../../questions/questions.interfaces";
import { IQuestions } from "@/providers/Dexie/sync.interface";

export async function updateQuestionTable(questions: RootQuestionData[]) {
  const today = dayjs().format("YYYY-MM-DD");

  const encapsulationIds: number[] = questions?.map((item) => Number(item.id));

  const specificQuestion = await getSpecificQuestions(encapsulationIds);

  const modifyQuestions: IQuestions[] = [];

  for (const question of questions) {
    const existQesttionRecord = specificQuestion.find(
      (item) => item?.question_id === question.id
    );

    if (existQesttionRecord?.state !== "correct" || !existQesttionRecord) {
      const state = question.skipped
        ? "skipped"
        : question.passed
        ? "correct"
        : "incorrect";

      modifyQuestions.push({
        state,
        date: today,
        question_id: question.id,
      });
    }
  }

  if (modifyQuestions)
    return pushFreshQuestionsWithTrueHasUpdate(modifyQuestions);
}
