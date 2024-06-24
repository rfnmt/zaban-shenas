import { useMutation } from "@tanstack/react-query";

import { sendVocabExamintaion } from "../api";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";

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

export const mutateVocabExamination = () => {
  return useMutation({
    mutationFn: (data: RootData) => {
      return sendVocabExamintaion(data).then(function (response) {
        queryClient.setQueryData([`vocab-examination`], response.data);
        return response.data;
      });
    },
  });
};
