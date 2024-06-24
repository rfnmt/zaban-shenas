import React from "react";
import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { characterStyles } from "@/components/textProcessing/helpers/characterStyling";
import { RootReduxState } from "@/providers/Redux/store";
import { textIsFarsi } from "@/modules/helper";

function StoryInvisibleItem({ element }: any) {
  const theme = useTheme() as any;

  const answerStoryfillDamagedSentenceWithChoices = useSelector(
    (state: RootReduxState) =>
      state?.story.answerStoryfillDamagedSentenceWithChoices
  );

  const findIndex = answerStoryfillDamagedSentenceWithChoices.findIndex(
    (item) => item.from === element.from && item.to === element.to
  );

  return (
    <Box
      component="span"
      className="slice blank"
      sx={{
        fontFamily: textIsFarsi(element.string) ? "IRansans" : "Comme",
        borderBottom: `1px solid ${theme.palette.border.main}`,
        minWidth: `calc(${element.string.length} * 7px) !important`,
        ...characterStyles(element?.style?.attributes),
      }}
    >
      {answerStoryfillDamagedSentenceWithChoices[findIndex]?.text ? (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {answerStoryfillDamagedSentenceWithChoices[findIndex]?.text}
        </motion.span>
      ) : (
        ""
      )}
    </Box>
  );
}

export default StoryInvisibleItem;
