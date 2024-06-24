import React from "react";
import { useSelector } from "react-redux";
import { Box, useTheme } from "@mui/material";

import { RootReduxState } from "@/providers/Redux/store";
import Icon from "@/components/icon";

type Props = {
  data: {
    tts: string;
    id: number;
  };
};

function OnlyTTS({ data }: Props) {
  const theme = useTheme() as any;
  const { selectedLearningWord, currectItems, wrongItems } = useSelector(
    (state: RootReduxState) => state?.matchQuestions
  );

  let iconColor = theme.palette.gray[1];

  if (selectedLearningWord?.key === data?.key) {
    iconColor = theme.palette.system.blue;
  }

  if (currectItems === data?.key) {
    iconColor = theme.palette.success.main;
  }

  if (wrongItems?.length && wrongItems[0] === data?.key) {
    iconColor = theme.palette.error.main;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& .equalizer path ": { fill: iconColor },
        "& .tts-play-icon path ": { fill: iconColor },
      }}
    >
      <audio
        src={data?.tts}
        id={data?.tts?.split("/")[data?.tts?.split("/").length - 1]}
      />

      <Icon
        icon="record-voice"
        className="tts-play-icon"
        width={24}
        height={24}
      />
      <Icon
        icon="equalizer"
        style={{ maxWidth: "100px", width: "auto" }}
        height={24}
        className="equalizer"
      />
    </Box>
  );
}

export default OnlyTTS;
