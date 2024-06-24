import { AcceptableAnswer } from "../sessions.interfaces";
import { normalizeText } from "./normalizeText";

type Params = {
  inputsLength: number;
  acceptableAnswers: AcceptableAnswer[];
  userAnswers: string;
};

export const calculateLevenshteinDistance = (a: string, b: string) => {
  const c = a.length + 1;
  const d = b.length + 1;
  const r = Array(c);
  for (let i = 0; i < c; ++i) r[i] = Array(d);
  for (let i = 0; i < c; ++i) r[i][0] = i;
  for (let j = 0; j < d; ++j) r[0][j] = j;
  for (let i = 1; i < c; ++i) {
    for (let j = 1; j < d; ++j) {
      const s = a[i - 1] === b[j - 1] ? 0 : 1;
      r[i][j] = Math.min(r[i - 1][j] + 1, r[i][j - 1] + 1, r[i - 1][j - 1] + s);
    }
  }
  return r[a.length][b.length];
};

export function levenshtein({
  acceptableAnswers,
  userAnswers,
  inputsLength,
}: Params) {
  for (let index = 0; index < acceptableAnswers.length; index++) {
    const normalizeUserAnswer = normalizeText(userAnswers).join(" ");
    const normalizeAcceptableAnswer = normalizeText(
      acceptableAnswers[index].text
    ).join(" ");

    const levenshteinCounter = calculateLevenshteinDistance(
      normalizeAcceptableAnswer,
      normalizeUserAnswer
    );

    const levenshteinPercentage = (levenshteinCounter / inputsLength) * 100;

    if (levenshteinCounter <= 4 && levenshteinPercentage <= 10)
      return { accepted: true };
  }

  return { accepted: false };
}
