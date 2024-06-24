import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import Icon from "@/components/icon";
import { RootReduxState } from "@/providers/Redux/store";
import { checkingUserSpeaking } from "./helpers";
import {
  toggleListenMicrophone,
  updateAnswerUserWithMicrophone,
} from "@/providers/Redux/lesson/questionSlice/compose/composeSlice";
import { triggerViewType } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { skipQuestion } from "@/app/session/[id]/components/sessionNavigator/helpers/skippQuestion";

import "./styles.scss";

function Speaking() {
  const dispatch = useDispatch();
  const theme = useTheme();

  const listeningToMicrophone = useSelector(
    (state: RootReduxState) => state.composeQuestions.listeningToMicrophone
  );

  const currentQuestionIndex = useSelector(
    (state: RootReduxState) => state.question.currentQuestionIndex
  );

  const {
    transcript,
    isMicrophoneAvailable,
    finalTranscript,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    dispatch(updateAnswerUserWithMicrophone(transcript));
    return () => {};
  }, [transcript]);

  useEffect(() => {
    if (finalTranscript) {
      checkingUserSpeaking();
      dispatch(toggleListenMicrophone(false));
    }

    return () => {};
  }, [finalTranscript]);

  useEffect(() => {
    if (!isMicrophoneAvailable) {
      skipQuestion("speaking");
    }
    return () => {};
  }, [isMicrophoneAvailable]);

  useEffect(() => {
    if (listeningToMicrophone) {
      dispatch(triggerViewType("loading"));
      SpeechRecognition.startListening({
        language: "En",
        continuous: false,
        interimResults: true,
      });
    } else {
      // dispatch(triggerViewType("verifyNow"));
      SpeechRecognition.stopListening();
    }
    return () => {};
  }, [listeningToMicrophone]);

  useEffect(() => {
    resetTranscript();

    return () => {};
  }, [currentQuestionIndex]);

  return (
    <div className={"speaking-question"}>
      {!isMicrophoneAvailable ? (
        <Typography sx={{ color: "gray.1" }}>
          دیوایس شما از میکرفن پشتیبانی نمیکند. این سوال نادیده گرفته میشود
        </Typography>
      ) : (
        <>
          <Button
            className="toggle-speaking-button"
            variant="contained"
            sx={{
              backgroundColor: "primary.main",
              boxShadow: `0 1px 1px ${theme.palette.border.main}`,
            }}
            endIcon={
              !listeningToMicrophone ? (
                <Icon icon="start-record-voice" width="24" height="24" />
              ) : (
                ""
              )
            }
            onClick={() => {
              if (listeningToMicrophone) dispatch(triggerViewType("verifyNow"));

              dispatch(toggleListenMicrophone(!listeningToMicrophone));
            }}
          >
            {listeningToMicrophone ? (
              <Icon
                height={24}
                icon="equalizer"
                className="equalizer"
                style={{ width: "auto" }}
              />
            ) : (
              <>
                <Typography className="start-to-speak">شروع صحبت</Typography>
                <Icon height={24} color="#fff" icon="record-voice" />
              </>
            )}
          </Button>
        </>
      )}

      <Typography className="user-answer-transcript" sx={{ color: "gray.1" }}>
        {transcript}
      </Typography>
    </div>
  );
}

export default Speaking;
