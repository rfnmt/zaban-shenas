import React from "react";
import { Box, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";
import Icon from "@/components/icon";
import TipBottomSheet from "./tipBottomSheet";
import { updateVisibleTipBottomSheet } from "@/providers/Redux/general/generalSlice";

function WithBackAndMoreIcon() {
  const dispatch = useDispatch();
  const { allQuestion, currentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.question
  );

  const qustionHasTip = allQuestion[currentQuestionIndex]?.data?.related_tip;

  return qustionHasTip ? (
    <>
      <IconButton
        onClick={() => dispatch(updateVisibleTipBottomSheet(true))}
        sx={{ "& path": { fill: "#FCCF0F" } }}
      >
        <Icon icon="lump" size={32} />
      </IconButton>
      <TipBottomSheet />
    </>
  ) : (
    <Box />
  );
}

export default WithBackAndMoreIcon;
