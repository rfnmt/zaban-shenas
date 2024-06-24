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

function StoryVisibleItem({ element }: any) {
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
      onClick={() => {
        if (element?.hint) loadPopover(element?.hint, specifictId);
      }}
      sx={{
        fontFamily: textIsFarsi(element.string) ? "IRansans" : "Comme",
        borderBottom: element?.hint
          ? `2px dotted ${theme.palette.gray["3"]}`
          : "",
        ...characterStyles(element?.style?.attributes),
      }}
      className={`slice ${element?.hint ? "has-hint-table" : ""}`}
    >
      {element.string}
    </Box>
  );
}

export default StoryVisibleItem;
