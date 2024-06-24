import React, { Key } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material";

import {
  setAnchorEl,
  setOpen,
  setTableData,
} from "@/providers/Redux/hintTable/hintTableSlice";
import { makeId } from "@/modules/helper";
import { characterStyles } from "../helpers/characterStyling";
import { ProcessedTextData } from "../interfaces";

type Props = { rowData: ProcessedTextData };

export function RenderPersianContent({ rowData }: Props) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const loadPopover = (findHint: any, elementID: string) => {
    dispatch(setTableData(findHint));
    dispatch(setAnchorEl(elementID));
    dispatch(setOpen(true));
  };

  return (
    <div className="persian-slice">
      {rowData?.data?.map((item) => {
        const specifictId = makeId();

        return (
          <span
            key={specifictId}
            id={specifictId}
            onClick={(e) => {
              if (item?.hint) loadPopover(item?.hint, specifictId);
            }}
            style={{
              borderBottom: item?.hint
                ? `1px dashed ${theme.palette.gray["3"]}`
                : "",
              ...characterStyles(item?.style?.attributes),
            }}
            dangerouslySetInnerHTML={{ __html: item?.string || "" }}
            className={`farsi-verb slice ${item?.hint ? "has-hint-table" : ""}`}
          />
        );
      })}
    </div>
  );
}
