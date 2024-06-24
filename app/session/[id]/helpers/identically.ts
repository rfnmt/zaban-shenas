type Params = {
  acceptableAnswers: AcceptableAnswer[];
  userAnswers: string;
};

import { AcceptableAnswer } from "../sessions.interfaces";
import { normalizeText } from "./normalizeText";

export function identically({ userAnswers, acceptableAnswers }: Params) {
  const normalizeUserAnswer = normalizeText(String(userAnswers)).join(" ");

  for (let index = 0; index < acceptableAnswers.length; index++) {
    const normalizeAccepableAnswer = normalizeText(
      acceptableAnswers[index]?.text
    ).join(" ");

    if (normalizeAccepableAnswer === normalizeUserAnswer) {
      return { accepted: true };
    }
  }

  return { accepted: false };
}
