import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setAnchorEl,
  setOpen,
  setTableData,
} from "@/providers/Redux/hintTable/hintTableSlice";
import { characterStyles } from "@/components/textProcessing/helpers/characterStyling";
import { textIsFarsi } from "@/modules/helper";
import { RootReduxState } from "@/providers/Redux/store";

export interface Props {
  element: Element;
}

export interface Element {
  id: number;
  style: Style;
  hint: null;
  from: number;
  to: number;
  string: string;
  visibility: boolean;
}

export interface Style {
  from: number;
  to: number;
  attributes: Attributes;
}

export interface Attributes {
  alignment: string;
  direction: string;
  text_color: string;
  font_size: number;
  font_weight: string;
  line_spacing: number;
  font_family: string;
}

function VisibleItem({ element }: Props) {
  const theme = useTheme() as any;
  const dispatch = useDispatch();

  const loadPopover = (
    findHint: any,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    dispatch(setTableData(findHint));
    dispatch(setAnchorEl(event.target));
    dispatch(setOpen(true));
  };

  const sessionBelongVocabExamination = useSelector(
    (state: RootReduxState) => state.session.sessionBelongVocabExamination
  );

  return (
    <Box
      component="span"
      onClick={(event: any) => {
        if (element?.hint) loadPopover(element?.hint, event);
      }}
      sx={{
        borderBottom:
          !sessionBelongVocabExamination && element?.hint
            ? `2px dotted ${theme.palette.gray["3"]}`
            : "",
        width: `calc(${element.string.length} * 5px) !important`,
        fontFamily: textIsFarsi(element.string) ? "IRansans" : "Comme",
        ...characterStyles(element?.style?.attributes),
      }}
      className={`slice ${element?.hint ? "has-hint-table" : ""}`}
    >
      {element.string}
    </Box>
  );
}

export default VisibleItem;
