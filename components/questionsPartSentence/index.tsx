import React from "react";
import SentenceDialogue from "./sentenceDialogue";
import AudioWithText from "./audioWithText";

type SentenceComposeData = {
  sentence: Array<any>;
  ui_specs: string;
};

function QuestionsPartSentence({ sentence, ui_specs }: SentenceComposeData) {
  function typeOfSentenceComponents(
    sentenceParameter: Array<any>,
    ui_specs: string
  ) {
    if (sentenceParameter.length !== 0) {
      if (ui_specs === "dialogue") {
        return (
          <>
            <SentenceDialogue sentenceParameter={sentenceParameter} />
          </>
        );
      } else {
        return (
          <>
            {sentenceParameter.map((item: any, index: number) => {
              return <AudioWithText key={index} data={item} />;
            })}
          </>
        );
        // }
      }
    } else {
      return null;
    }
  }
  return <>{typeOfSentenceComponents(sentence, ui_specs)}</>;
}

export default QuestionsPartSentence;
