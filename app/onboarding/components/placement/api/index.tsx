import axios from "axios";

import { POST_VOCAB_EXAMINATION } from "@/modules/constant";

type RootData = {
  vocab_estimate_self_evaluation: number;
  vocab_examination_stages?: Vocabexaminationstage[];
};

type Vocabexaminationstage = {
  questions: Question[];
  evaluation?: number;
};

type Question = {
  id: number;
  rank: number;
  answer: boolean;
};

export function sendVocabExamintaion(data: RootData) {
  const url = POST_VOCAB_EXAMINATION;
  return axios.post(url, data);
}
