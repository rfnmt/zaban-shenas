import { AppBar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootReduxState } from "@/providers/Redux/store";
import Icon from "@/components/icon";
import { triggerViewType } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";

import "./style.scss";

function Limitations() {
  const { allQuestion, currentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.question
  );

  const dispatch = useDispatch();

  if (allQuestion[currentQuestionIndex]?.data?.limitation === "speaking")
    return (
      <Button
        onClick={() => dispatch(triggerViewType("speakingPostponed"))}
        sx={{
          backgroundColor: "primary.min",
          "&:hover": {
            backgroundColor: "primary.min",
          },
        }}
        className="question-limitations"
      >
        <Icon icon="record-voice-off" width="24" height="24" />
        <Typography sx={{ color: "primary.main" }}>
          نمی‌تونم صحبت کنم
        </Typography>
      </Button>
    );
  else if (allQuestion[currentQuestionIndex]?.data?.limitation === "listening")
    return (
      <Button
        onClick={() => dispatch(triggerViewType("listeningPostponed"))}
        sx={{
          backgroundColor: "primary.min",
          "&:hover": {
            backgroundColor: "primary.min",
          },
        }}
        className="question-limitations"
      >
        <Icon icon="hearing-disabled" width="24" height="24" />
        <Typography sx={{ color: "primary.main" }}>نمی‌تونم گوش کنم</Typography>
      </Button>
    );
  else return <div style={{ display: "none" }} />;
}

export default Limitations;
