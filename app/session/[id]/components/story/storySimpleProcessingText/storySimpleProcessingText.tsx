import React, { Key } from "react";
import { Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { characterStyles } from "@/components/textProcessing/helpers/characterStyling";
import {
  setAnchorEl,
  setOpen,
  setTableData,
} from "@/providers/Redux/hintTable/hintTableSlice";
import { makeId, textIsFarsi } from "@/modules/helper";
import { prepareSimpleTextProccessorContent } from "@/components/textProcessing/helpers/prepareSimpleTextProccessorContent";

type StorySimpleProcessingTextDataType = {
  data: any;
  lineElementID?: number | undefined;
  parent?: string | undefined;
};

function StorySimpleProcessingText({
  data,
  lineElementID,
  parent,
}: StorySimpleProcessingTextDataType) {
  const theme = useTheme() as any;
  const dispatch = useDispatch();

  const loadPopover = (findHint: any, elementID: string) => {
    dispatch(setTableData(findHint));
    dispatch(setAnchorEl(elementID));
    dispatch(setOpen(true));
  };

  const preparedContent = prepareSimpleTextProccessorContent(data);

  return (
    <div className="story-processing-text-wrapper" style={{ display: "flex" }}>
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
                  const specifictId = makeId();

                  return (
                    <Typography
                      variant="caption"
                      sx={
                        lineElementID !== undefined
                          ? parent === "arrangeQuestion"
                            ? { visibility: "visible !important" }
                            : {
                                color:
                                  element.visibility === false &&
                                  parent === undefined
                                    ? "transparent !important "
                                    : theme.palette.gray["1"],
                                borderBottom:
                                  element.visibility === false &&
                                  parent === undefined
                                    ? `1px solid ${theme.palette.border.main}`
                                    : `none`,
                                visibility: "visible !important",
                              }
                          : {}
                      }
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
                        // visibility: element.visibility ? "visible" : "hidden",
                        whiteSpace: "pre-wrap",
                        borderBottom: element?.hint
                          ? `2px dotted ${theme.palette.gray["3"]}`
                          : ``,
                        minWidth: element.string.length * 10 + "px",
                        ...characterStyles(element?.style?.attributes),
                      }}
                      dangerouslySetInnerHTML={{ __html: element.string }}
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
        })}
    </div>
  );
}

export default StorySimpleProcessingText;
