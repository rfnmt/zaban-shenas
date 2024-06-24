import React, { useState, useRef } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { RootReduxState } from "@/providers/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { clickedArrangeQuestionChoicesAction } from "../../helpers";
import {
  updateStoryPushCorrectAnswerIntoArray,
  updateWordsCorrectOrderStoryArrangQuestion,
} from "@/providers/Redux/lesson/storySlice/storySlice";

function ChoicesOfArrangeQuestion({
  item,
  setUserAnsweredTheQuestion,
  userAnsweredTheQuestion,
  setCollectAllTrueIDs,
  collectAllTrueIDs,
}) {
  const dispatch = useDispatch();
  const theme = useTheme() as any;
  const answerStoryfillDamagedSentenceWithChoices = useSelector(
    (state: RootReduxState) =>
      state?.story?.answerStoryfillDamagedSentenceWithChoices
  );
  const wordsCorrectOrderStoryArrangQuestion = useSelector(
    (state: RootReduxState) =>
      state?.story?.wordsCorrectOrderStoryArrangQuestion
  );
  const isSelected = answerStoryfillDamagedSentenceWithChoices?.find(
    (_item) => {
      return _item?.text ? (_item?.text === item?.text ? true : false) : false;
    }
  );

  const player = useRef<HTMLAudioElement | undefined | null>();

  const [playing, setPlaying] = useState(false);
  const [addErrorBorderAndColor, setAddErrorBorderAndColor] = useState(false);

  function togglePlayer(id) {
    var audios = document.querySelectorAll("audio");

    for (const iterator of audios) {
      iterator.currentTime = 0;
      iterator.pause();
    }

    if (playing === true) {
      setPlaying(false);
      player?.current?.pause();
    } else {
      setPlaying(true);
      player?.current?.play();
    }

    if (!isSelected && id === wordsCorrectOrderStoryArrangQuestion) {
      if (
        wordsCorrectOrderStoryArrangQuestion ===
        answerStoryfillDamagedSentenceWithChoices.length
      ) {
        return;
      } else {
        setCollectAllTrueIDs((prev) => [
          ...prev,
          wordsCorrectOrderStoryArrangQuestion,
        ]);
      }
      dispatch(
        updateWordsCorrectOrderStoryArrangQuestion(
          wordsCorrectOrderStoryArrangQuestion + 1
        )
      );
      clickedArrangeQuestionChoicesAction(item);
      if (
        userAnsweredTheQuestion === true &&
        wordsCorrectOrderStoryArrangQuestion + 1 ===
          answerStoryfillDamagedSentenceWithChoices.length
      ) {
        dispatch(updateStoryPushCorrectAnswerIntoArray(1));
      }
    } else {
      setUserAnsweredTheQuestion(false);
      setAddErrorBorderAndColor(true);
      setTimeout(() => {
        setAddErrorBorderAndColor(false);
      }, 600);
    }
  }

  return (
    <Box
      className="choice-arrange-question-item"
      onClick={() => {
        collectAllTrueIDs.includes(item.id) ? null : togglePlayer(item.id);
      }}
      sx={{
        backgroundColor: isSelected ? "border.main" : "white.flexible",
        width: item.text.length * 10 + "px",
        border: addErrorBorderAndColor
          ? `1px solid ${theme.palette.error.main}`
          : `1px solid ${theme.palette.border.main}`,
        color: addErrorBorderAndColor
          ? `${theme.palette.error.main} !important`
          : `${theme.palette.gray["1"]} !important`,
        cursor: collectAllTrueIDs.includes(item.id) ? "default" : "pointer",
      }}
    >
      <audio
        ref={player}
        src={item?.tts}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      {isSelected ? (
        ""
      ) : (
        <div
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("choice", JSON.stringify(item));
            setTimeout(() => {
              e.target.style.visibility = "hidden";
            }, 0);
          }}
          onDragEnd={(e) => {
            e.target.style.visibility = "visible";
          }}
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>{item?.text}</Typography>
        </div>
      )}
    </Box>
  );
}

export default ChoicesOfArrangeQuestion;
