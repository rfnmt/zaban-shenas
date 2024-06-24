import { store } from "@/providers/Redux/store";
import { calculateLevenshteinDistance } from "./levenshteinDistance";
import { DamagedItems } from "../components/questions/types";
import { normalizeText } from "./normalizeText";

const minPercent = 0.5;

type GradeParams = {
  gradeType: "levenshtein" | "comparator";
  checkOrder?: boolean;
};

export function grade({ gradeType, checkOrder = false }: GradeParams) {
  const allQuestion = store.getState()?.question?.allQuestion;
  const currentQuestionIndex = store.getState()?.question?.currentQuestionIndex;

  const { acceptable_answers } = allQuestion[currentQuestionIndex]?.data;

  const { fillDamagedSentenceWithWriting, answerUserWithMicrophone } =
    store?.getState()?.composeQuestions;

  switch (gradeType) {
    case "comparator":
      if (minPercent < 0 || minPercent > 1) {
        throw new Error("minPercent must be between 0.0 and 1.0");
      }

      let commonWords: number = 0;
      let similarity: number;

      if (checkOrder) {
        // loop through the words in str1 and check if they match the words in str2 at the same position
        for (let i = 0; i < answerUserWithMicrophone.length; i++) {
          if (
            i < acceptable_answers.length &&
            answerUserWithMicrophone[i] === acceptable_answers[i]
          ) {
            commonWords++;
          }
        }
        // calculate the similarity ratio between the two strings
        similarity =
          (commonWords * 2) /
          (answerUserWithMicrophone.length + acceptable_answers.length);
      } else {
        // loop through the words in str1 and check if they exist in str2, regardless of the position
        for (let word of answerUserWithMicrophone) {
          let index = acceptable_answers.indexOf(word);
          if (index !== -1) {
            commonWords++;
            acceptable_answers.replace(word, "");
          }
        }
        // calculate the similarity ratio between the two strings
        similarity =
          (commonWords * 2) /
          (answerUserWithMicrophone.length +
            acceptable_answers.length +
            commonWords);
      }

      return { accepted: Boolean(similarity >= minPercent) };

    // 1 - map acceptable_answers items
    // 2 - items remove punchation
    // 3 - check items with
    // first: levenshtein / all input length * 100 < 10%
    // second: maximum charachter levenshtein 4
    case "levenshtein":
      const allInputsLength = fillDamagedSentenceWithWriting
        .map((item: DamagedItems) => item.content)
        .join("").length;

      for (let index = 0; index < acceptable_answers?.length; index++) {
        const normalizeAcceptableAnswer = normalizeText(
          String(acceptable_answers[index].text)
        ).join(" ");

        let levenshteinCounter = 0;

        for (let i = 0; i < fillDamagedSentenceWithWriting.length; i++) {
          const currentDamaged = fillDamagedSentenceWithWriting[i];

          const acceptableAnswer = normalizeAcceptableAnswer.substring(
            currentDamaged.from,
            currentDamaged.to
          );

          levenshteinCounter += calculateLevenshteinDistance(
            acceptableAnswer,
            currentDamaged.userAnswer
          );
        }

        if (
          levenshteinCounter <= 4 &&
          (levenshteinCounter / allInputsLength) * 100 < 10
        ) {
          return { accepted: true };
        } else {
          return { accepted: false };
        }
      }

    default:
      return { accepted: false };
  }
}
