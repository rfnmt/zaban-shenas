import React from "react";

import "./style.scss";

import { prepareSimpleTextProccessorContent } from "@/components/textProcessing/helpers/prepareSimpleTextProccessorContent";
import StoryVisibleItem from "./visibleElements";
import StoryInvisibleItem from "./invisibleElements";

function StoryArrangeQuestionDamagedSentence({ textData }) {
  const preparedContent = prepareSimpleTextProccessorContent(textData);

  return (
    <div className="question-arrange-wrapp-text">
      <div className="question-arrange-sentence">
        <div className="sentence">
          {preparedContent?.length > 0 &&
            preparedContent?.map((paragraphs: any, paragraphsKey) => {
              const direction = paragraphs?.lang === "en" ? "ltr" : "rtl";
              const textAlign = paragraphs?.lang === "en" ? "left" : "right";

              return (
                <div
                  key={paragraphsKey}
                  className="wrap-sentence"
                  style={{ direction: direction, textAlign: textAlign }}
                >
                  {paragraphs?.data?.map((parahraph: any) => {
                    return parahraph?.elements?.map((element: any, key) => {
                      return element?.visibility ? (
                        <StoryVisibleItem element={element} key={key} />
                      ) : (
                        <StoryInvisibleItem element={element} key={key} />
                      );
                    });
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default StoryArrangeQuestionDamagedSentence;
