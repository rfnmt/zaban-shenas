import React, { Key } from "react";

import VisibleItem from "./visibleItem";
import InvisibleItem from "./invisibleItem";
import { prepareSimpleTextProccessorContent } from "@/components/textProcessing/helpers/prepareSimpleTextProccessorContent";
import { IQuestionData } from "../../../../../questions.interfaces";

export function DamageSentence({ data }: { data: IQuestionData }) {
  const preparedContent = prepareSimpleTextProccessorContent(
    data?.damaged_sentence
  );

  return (
    <div id={`review-section-${data?.id}`}>
      <div className="sentence">
        {preparedContent?.length > 0 &&
          preparedContent?.map((paragraphs: any, paragraphsKey: Key) => {
            const direction = paragraphs?.lang === "en" ? "ltr" : "rtl";
            const textAlign = paragraphs?.lang === "en" ? "left" : "right";

            return (
              <div
                key={paragraphsKey}
                className="wrap-sentence"
                style={{ direction: direction, textAlign: textAlign }}
              >
                {paragraphs?.data?.map((parahraph: any) => {
                  return parahraph?.elements?.map((element: any, key: Key) => {
                    return element?.visibility ? (
                      <VisibleItem element={element} key={key} />
                    ) : (
                      <InvisibleItem element={element} key={key} />
                    );
                  });
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
}
