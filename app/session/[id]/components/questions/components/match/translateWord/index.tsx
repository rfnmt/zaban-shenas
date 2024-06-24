import { Box, Typography, useTheme } from "@mui/material";
import React, { memo } from "react";
import { useSelector } from "react-redux";

import { RootReduxState } from "@/providers/Redux/store";
import { changeSelectedTranslation } from "../helpers";
import { textIsFarsi } from "@/modules/helper";

function TranslateWord({ item }) {
  const theme = useTheme() as any;

  const { selectedTranslateWord, currectItems, wrongItems } = useSelector(
    (state: RootReduxState) => state?.matchQuestions
  );

  const { allQuestion, currentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.question
  );

  const disableItems = useSelector(
    (state: RootReduxState) => state?.matchQuestions?.disableItems
  );

  let color = theme.palette.gray[1];
  let borderColor = "transparent";
  let isDisable = false;

  if (allQuestion[currentQuestionIndex]?.id === item.id) {
    if (selectedTranslateWord?.key === item?.key) {
      color = theme.palette.system.blue;
      borderColor = theme.palette.system.blue;
    }

    if (currectItems === item?.key) {
      color = theme.palette.success.main;
      borderColor = theme.palette.success.main;
    }

    if (wrongItems?.length && wrongItems[1] === item?.key) {
      color = theme.palette.error.main;
      borderColor = theme.palette.error.main;
    }

    isDisable = disableItems.includes(item?.key);
  }

  return (
    <Box
      sx={{
        borderColor: `${borderColor} !important`,
        boxShadow: "0 1px 1px rgba(0,0,0,.16)",
        backgroundColor: "background.main",
        color: color,
        opacity: isDisable ? 0.2 : 1,
        pointerEvents: isDisable ? "none" : "auto",
      }}
      className="translation-item"
      onClick={() => changeSelectedTranslation(item)}
    >
      <Typography
        className={`${textIsFarsi(item.translation) ? "rtl" : "ltr"}`}
      >
        {item.translation}
      </Typography>
    </Box>
  );
}

export default memo(TranslateWord);
