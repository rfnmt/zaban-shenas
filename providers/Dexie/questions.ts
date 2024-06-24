import { Sync } from "./index";
import {
  addHasUpdateFalseKey,
  addHasUpdateTrueKey,
  removeHasUpdateKey,
} from "./helpers";
import { IQuestions } from "./sync.interface";

export async function getAllQuestions() {
  return Sync["questions"].toArray();
}

export async function getSpecificQuestions(ids: number[]) {
  return Sync["questions"].bulkGet(ids);
}

export async function insertQuestions(data: IQuestions[]) {
  return Sync["questions"].bulkPut(addHasUpdateFalseKey(data));
}

export async function getOnlyHasUpdateQuestions() {
  const questions = await Sync["questions"]
    .where({ has_update: "true" })
    .toArray();

  return questions ? removeHasUpdateKey(questions) : [];
}

export async function pushFreshQuestions(data: IQuestions[]) {
  return Sync["questions"].bulkPut(addHasUpdateFalseKey(data));
}

export async function pushFreshQuestionsWithTrueHasUpdate(data: IQuestions[]) {
  return Sync["questions"].bulkPut(addHasUpdateTrueKey(data));
}
