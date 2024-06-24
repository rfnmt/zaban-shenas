import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import { Checkbox, FormControlLabel, FormGroup, useTheme } from "@mui/material";
import { RootReduxState } from "@/providers/Redux/store";
import { Choices } from "@/app/session/[id]/components/questions/questions.interfaces";

import "./style.scss";

type Props = {
  item: Choices;
  clicked: (id: number) => void;
};

function CheckboxItem({ item, clicked }: Props) {
  const theme = useTheme() as any;
  const { multipleChoiceSelectedAnswer, multipleChoiceCorrectAnswer } =
    useSelector((state: RootReduxState) => state.multipleChoise);
  const { viewType } = useSelector(
    (state: RootReduxState) => state.sessionNavigator
  );
  const [playig, setPlayig] = useState(false);
  const player = useRef<HTMLAudioElement | null>(null);

  function togglePlayer() {
    var audios = document.querySelectorAll("audio");

    for (const iterator of audios) {
      iterator.currentTime = 0;
      iterator.pause();
    }

    const { current } = player;

    if (playig) {
      current.pause();
      setPlayig(false);
    } else {
      current.play();
      setPlayig(true);
    }
  }
  let choiseBorder = `2px solid ${theme.palette.border.main}`;
  let textColor = theme.palette.gray["1"];
  const isSelected = multipleChoiceSelectedAnswer.find((choiseId) => {
    return choiseId === item.id;
  });

  const isCorrect = multipleChoiceCorrectAnswer.find((choise) => {
    return choise.id === item.id;
  });

  if (viewType === "correct" || viewType === "incorrect") {
    if (isCorrect?.id && isSelected > -1) {
      choiseBorder = `2px solid ${theme.palette.success.main} !important`;
      textColor = ` ${theme.palette.success.main} !important`;
    } else if (!isCorrect && isSelected > -1) {
      choiseBorder = `2px solid ${theme.palette.error.main} !important`;
      textColor = ` ${theme.palette.error.main} !important`;
    }
  } else if (isSelected > -1) {
    choiseBorder = `2px solid ${theme.palette.system.blue} !important`;
    textColor = `${theme.palette.system.blue} !important`;
  }

  return (
    <>
      <audio
        ref={player}
        src={item?.audio}
        onPause={() => setPlayig(false)}
        onEnded={() => setPlayig(false)}
      />
      <FormGroup className="multiple-questions-checkbox-selection">
        <FormControlLabel
          sx={{
            "& span": {
              "&:last-of-type": {
                border: choiseBorder,
                color: textColor,
                backgroundColor: theme.palette.white.flexible,
              },
            },
          }}
          control={
            <Checkbox
              checked={Boolean(isSelected)}
              onChange={() => {
                clicked(item?.id);
                togglePlayer();
              }}
            />
          }
          label={item.text}
        />
      </FormGroup>
    </>
  );
}

export default CheckboxItem;
