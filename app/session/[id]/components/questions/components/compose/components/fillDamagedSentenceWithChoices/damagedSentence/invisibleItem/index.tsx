import { Box, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import { characterStyles } from "@/components/textProcessing/helpers/characterStyling";
import { RootReduxState } from "@/providers/Redux/store";
import { arrangeDroppedChoice, removeSpecificCell } from "../../helpers";
import { textIsFarsi } from "@/modules/helper";

function InvisibleItem({ element }) {
  const theme = useTheme() as any;

  const answerfillDamagedSentenceWithChoices = useSelector(
    (state: RootReduxState) =>
      state?.composeQuestions.answerfillDamagedSentenceWithChoices
  );

  const findIndex = answerfillDamagedSentenceWithChoices.findIndex(
    (item) => item.from === element.from && item.to === element.to
  );

  return (
    <Box
      component="span"
      className="slice blank"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragLeave={(e) => {}}
      onDrop={(e) => {
        arrangeDroppedChoice(
          JSON.parse(e.dataTransfer.getData("choice")),
          findIndex
        );
      }}
      onClick={() => {
        removeSpecificCell(findIndex);
      }}
      sx={{
        fontFamily: textIsFarsi(element.string) ? "IRansans" : "Comme",
        height: "50px",
        display: "inline-block",
        borderBottom: (theme) => `1px solid ${theme.palette.border.main}`,
        minWidth: `calc(${element.string.length + 3} * 7px) !important`,
        ...characterStyles(element?.style?.attributes),
        "& span": {
          border: `1px solid ${theme.palette.border.main}`,
        },
      }}
    >
      {answerfillDamagedSentenceWithChoices[findIndex]?.text ? (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {answerfillDamagedSentenceWithChoices[findIndex]?.text}
        </motion.span>
      ) : (
        ""
      )}
    </Box>
  );
}

export default InvisibleItem;
