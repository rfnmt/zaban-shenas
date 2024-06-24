import { Box, useTheme } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

import {
  setAnchorEl,
  setOpen,
  setTableData,
} from "@/providers/Redux/hintTable/hintTableSlice";
import { characterStyles } from "@/components/textProcessing/helpers/characterStyling";
import { makeId, textIsFarsi } from "@/modules/helper";
import { Hint } from "@/app/session/[id]/sessions.interfaces";

export interface Props {
  element: {
    cell: number;
    cellText: string;
    haveUnvisibleChar: boolean;
    hint: null | Hint;
    styles: {
      textAlign: string;
      direction: string;
      color: string;
      fontSize: number;
      fontWeight: string;
      lineHeight: string;
    };
  };
}

function VisibleItem({ element }: Props) {
  console.log({ element });

  const theme = useTheme() as any;
  const dispatch = useDispatch();

  const loadPopover = (findHint: any, elementID: string) => {
    dispatch(setTableData(findHint));
    dispatch(setAnchorEl(elementID));
    dispatch(setOpen(true));
  };

  const specifictId = makeId();

  return (
    <Box
      id={specifictId}
      component="span"
      onClick={(event: any) => {
        if (element?.hint) loadPopover(element?.hint, specifictId);
      }}
      sx={{
        borderBottom: element?.hint
          ? `2px dotted ${theme.palette.gray["3"]}`
          : "",
        fontFamily: textIsFarsi(element.cellText) ? "IRansans" : "Comme",
        // width: `calc(${element.cellText.length} * 5px) !important`,
        ...characterStyles(element?.styling),
      }}
      className={`slice ${element?.hint ? "has-hint-table" : ""}`}
    >
      {element.text}
    </Box>
  );
}

export default VisibleItem;
