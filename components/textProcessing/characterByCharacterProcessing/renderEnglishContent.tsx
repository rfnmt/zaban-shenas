import React from "react";
import { useDispatch } from "react-redux";
import { Box, useTheme } from "@mui/material";

import {
  setAnchorEl,
  setOpen,
  setTableData,
} from "@/providers/Redux/hintTable/hintTableSlice";
import { makeId } from "@/modules/helper";
import { characterStyles } from "../helpers/characterStyling";
import { SentenceEntity } from "../interfaces";

type Props = { rowData: SentenceEntity };

export function RenderEnglishContent({ rowData }: Props) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const loadPopover = (findHint: any, elementID: string) => {
    dispatch(setTableData(findHint));
    dispatch(setAnchorEl(elementID));
    dispatch(setOpen(true));
  };

  return (
    <span className="english-slice">
      {rowData?.data?.map((item) => {
        const specifictId = makeId();

        return (
          <Box
            component="span"
            key={specifictId}
            id={specifictId}
            onClick={() => {
              if (item?.hint) loadPopover(item?.hint, specifictId);
            }}
            sx={{
              borderBottom: item?.hint
                ? `1px dashed ${theme.palette.gray["3"]}`
                : "",
              borderColor: `${theme.palette.border.main} !important`,
              background: item?.align ? theme.palette.white.flexible : "",
              ...characterStyles(item?.style?.attributes),
            }}
            dangerouslySetInnerHTML={{ __html: item?.string }}
            className={`english-verb slice ${
              item?.hint ? "has-hint-table" : ""
            } ${item?.align}`}
          />
        );
      })}
    </span>
  );
}
