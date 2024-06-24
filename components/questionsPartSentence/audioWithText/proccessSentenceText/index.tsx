import React, { Key } from "react";

import VisibleItem from "./visibleItem";
import InvisibleItem from "./invisibleItem";

function ProccesSentenceText({ data }) {
  return (
    <div className="sentence">
      {data?.length > 0 &&
        data?.map((paragraphs: any, paragraphsKey: Key) => {
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
  );
}

export default ProccesSentenceText;
