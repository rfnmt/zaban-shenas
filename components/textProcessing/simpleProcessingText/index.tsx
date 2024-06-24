import React, { Key } from "react";
import { Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { characterStyles } from "../helpers/characterStyling";
import {
  setAnchorEl,
  setOpen,
  setTableData,
} from "@/providers/Redux/hintTable/hintTableSlice";
import { prepareSimpleTextProccessorContent } from "../helpers/prepareSimpleTextProccessorContent";
import { makeId, textIsFarsi } from "@/modules/helper";
import { RootReduxState } from "@/providers/Redux/store";
import { Damagedsentence, ProcessedTextData } from "../interfaces";

function SimpleProcessingText({ data }: { data: Damagedsentence }) {
  const theme = useTheme() as any;

  const sessionBelongVocabExamination = useSelector(
    (state: RootReduxState) => state.session.sessionBelongVocabExamination
  );

  const dispatch = useDispatch();

  const loadPopover = (findHint: Hint, elementID: string) => {
    dispatch(setTableData(findHint));
    dispatch(setAnchorEl(elementID));
    dispatch(setOpen(true));
  };

  const preparedContent = prepareSimpleTextProccessorContent(data);

  return (
    <div className="test-class">
      {preparedContent?.length > 0 &&
        preparedContent?.map(
          (paragraphs: ProcessedTextData, paragraphsKey: Key) => {
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
                    const specifictId = makeId();

                    return (
                      <Typography
                        variant="caption"
                        key={key}
                        onClick={() => {
                          if (element?.hint)
                            loadPopover(element?.hint, specifictId);
                        }}
                        id={specifictId}
                        style={{
                          fontFamily: textIsFarsi(element.string)
                            ? "IRansans"
                            : "Comme",
                          whiteSpace: "pre-wrap",
                          borderBottom:
                            !sessionBelongVocabExamination && element?.hint
                              ? `2px dotted ${theme.palette.gray["3"]}`
                              : ``,
                          minWidth: element.string.length
                            ? element.string.length * 10 + "px"
                            : "230px",
                          ...characterStyles(element?.style?.attributes),
                        }}
                        dangerouslySetInnerHTML={{
                          __html: element.visibility ? element.string : "",
                        }}
                        className={`slice ${
                          element?.hint ? "has-hint-table" : ""
                        } ${
                          element.visibility === false
                            ? "unvisible-slice"
                            : "visible-slice"
                        }`}
                      />
                    );
                  });
                })}
              </div>
            );
          }
        )}
    </div>
  );
}

export default SimpleProcessingText;
