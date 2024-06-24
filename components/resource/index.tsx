import React from "react";
import { Box } from "@mui/material";

import JustAudio from "./justAudio";
import DefaultResource from "./default/index";
import AudioWithTranscript from "./audioWithTranscript";
import { IQuestionData } from "@/app/session/[id]/components/questions/questions.interfaces";

import "./style.scss";

const view = {
  justAudio: JustAudio,
  audioWithTranscript: AudioWithTranscript,
  default: DefaultResource,
};

function ResourceCompose({ data }: { data: IQuestionData }) {
  const mediaType = data?.resource?.main_media
    ? data?.resource?.main_media.split(".").pop() === "mp3"
      ? "audio"
      : "video"
    : null;

  const hasCover = Boolean(data?.resource?.cover_image);
  const hasTranscript = Boolean(data?.resource?.transcript);

  function getViewType() {
    if (hasTranscript && !hasCover && mediaType === "audio") {
      return "audioWithTranscript";
    } else if (!hasTranscript && !hasCover && mediaType === "audio") {
      return "justAudio";
    } else {
      return "default";
    }
  }

  const CurrentView = view[getViewType()];

  return (
    <Box className="resource-wrapper">
      <CurrentView data={data} />
    </Box>
  );
}

export default ResourceCompose;
