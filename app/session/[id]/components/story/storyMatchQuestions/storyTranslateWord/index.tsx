import React, { memo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { changeStorySelectedTranslation } from "../../helpers";
import { RootReduxState } from "@/providers/Redux/store";

function StoryTranslateWord({ item }) {
  const theme = useTheme() as any;
  const {
    storyCurrectItems,
    storySelectedTranslateWord,
    storyDisableItems,
    storyWrongItems,
  } = useSelector((state: RootReduxState) => state?.storyMatching);

  let color = theme.palette.gray[1];
  let borderColor = "transparent";
  let isDisable = false;

  if (storySelectedTranslateWord?.id === item?.id) {
    color = theme.palette.system.blue;
    borderColor = theme.palette.system.blue;
  }

  if (storyCurrectItems === item?.id) {
    color = theme.palette.success.main;
    borderColor = theme.palette.success.main;
  }

  if (storyWrongItems?.length && storyWrongItems[1] === item?.id) {
    color = theme.palette.error.main;
    borderColor = theme.palette.error.main;
  }

  isDisable = storyDisableItems.includes(item?.id);

  return (
    <Box
      sx={{
        borderColor: `${borderColor} !important`,
        boxShadow: "0 1px 1px rgba(0,0,0,.16)",
        backgroundColor: "background.main",
        // color: color,
        opacity: isDisable ? 0.2 : 1,
        pointerEvents: isDisable ? "none" : "auto",
        "& p": {
          color: color,
        },
      }}
      className="pairs-item translation-item"
      onClick={() => {
        changeStorySelectedTranslation(item);
      }}
    >
      <Typography>{item.translation}</Typography>
    </Box>
  );
}

export default memo(StoryTranslateWord);
