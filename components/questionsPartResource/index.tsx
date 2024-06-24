import React from "react";
import { Box } from "@mui/material";

import CommonMainVideoAndAudioPlayer from "./commonMainVideoAndAudioPlayer";
import MainAudioWithTranscript from "@/components/questionsPartResource/mainAudioWithTranscript";
import MainAudio from "./mainAudio";
import SlowAudio from "./slowAudio";
import SimpleProcessingText from "../textProcessing/simpleProcessingText";

import "./style.scss";

export enum viewType {
  SET_AS_MAIN_AUDIO_TRANSCRIPT = "SET_AS_MAIN_AUDIO_TRANSCRIPT",
  SET_AS_MAIN_AUDIO_COVER_IMAGE_TRANSCRIPT = "SET_AS_MAIN_AUDIO_COVER_IMAGE_TRANSCRIPT",
  SET_AS_MAIN_AUDIO_COVER = "SET_AS_MAIN_AUDIO_COVER",
  SET_AS_MAIN_AUDIO_SLOW_AUDIO = "SET_AS_MAIN_AUDIO_SLOW_AUDIO",
  SET_AS_MAIN_AUDIO = "SET_AS_MAIN_AUDIO",
  SET_AS_MAIN_AUDIO_SLOW_AUDIO_COVER_IMAGE_TRANSCRIPT = "SET_AS_MAIN_AUDIO_SLOW_AUDIO_COVER_IMAGE_TRANSCRIPT",
  SET_AS_MAIN_VIDEO_TRANSCRIPT = "SET_AS_MAIN_VIDEO_TRANSCRIPT",
  SET_AS_MAIN_VIDEO_COVER_IMAGE_TRANSCRIPT = "SET_AS_MAIN_VIDEO_COVER_IMAGE_TRANSCRIPT",
  SET_AS_MAIN_VIDEO_COVER_IMAGE = "SET_AS_MAIN_VIDEO_COVER_IMAGE",
  SET_AS_MAIN_VIDEO = "SET_AS_MAIN_VIDEO",
  SET_AS_COVER_IMAGE_TRANSCRIPT = "SET_AS_COVER_IMAGE_TRANSCRIPT",
  SET_AS_COVER_IMAGE = "SET_AS_COVER_IMAGE",
  SET_AS_TRANSCRIPT = "SET_AS_TRANSCRIPT",
}

type QuestionsPartResourceDataType = {
  question_type?: string;
  resource: Resource;
};

function QuestionsPartResource({
  resource,
  question_type,
}: QuestionsPartResourceDataType) {
  const mediaType = resource?.main_media
    ? resource?.main_media.split(".").pop() === "mp3"
      ? "audio"
      : "video"
    : null;

  const hasCover = Boolean(resource?.cover_image);
  const hasSlow = Boolean(resource?.slow_audio);
  const hasTranscript = Boolean(resource?.transcript);

  function getViewType() {
    if (mediaType === "audio") {
      if (hasTranscript && !hasSlow && !hasCover) {
        return viewType.SET_AS_MAIN_AUDIO_TRANSCRIPT;
      } else if (hasTranscript && !hasSlow && hasCover) {
        return viewType.SET_AS_MAIN_AUDIO_COVER_IMAGE_TRANSCRIPT;
      } else if (!hasTranscript && !hasSlow && hasCover) {
        return viewType.SET_AS_MAIN_AUDIO_COVER;
      } else if (!hasTranscript && hasSlow && !hasCover) {
        return viewType.SET_AS_MAIN_AUDIO_SLOW_AUDIO;
      } else if (!hasTranscript && !hasSlow && !hasCover) {
        return viewType.SET_AS_MAIN_AUDIO;
      } else if (hasTranscript && hasSlow && hasCover) {
        return viewType.SET_AS_MAIN_AUDIO_SLOW_AUDIO_COVER_IMAGE_TRANSCRIPT;
      }
    } else if (mediaType === "video") {
      if (hasTranscript && !hasSlow && !hasCover) {
        return viewType.SET_AS_MAIN_VIDEO_TRANSCRIPT;
      } else if (!hasTranscript && !hasSlow && !hasCover) {
        return viewType.SET_AS_MAIN_VIDEO;
      } else if (hasTranscript && !hasSlow && hasCover) {
        return viewType.SET_AS_MAIN_VIDEO_COVER_IMAGE_TRANSCRIPT;
      } else if (!hasTranscript && !hasSlow && hasCover) {
        return viewType.SET_AS_MAIN_VIDEO_COVER_IMAGE;
      }
    } else if (mediaType === null) {
      if (hasTranscript && !hasSlow && !hasCover) {
        return viewType.SET_AS_TRANSCRIPT;
      } else if (hasTranscript && !hasSlow && hasCover) {
        return viewType.SET_AS_COVER_IMAGE_TRANSCRIPT;
      } else if (!hasTranscript && !hasSlow && hasCover) {
        return viewType.SET_AS_COVER_IMAGE;
      }
    }
  }

  function showSpecificChild() {
    switch (getViewType()) {
      case viewType.SET_AS_MAIN_AUDIO_TRANSCRIPT:
        return <MainAudioWithTranscript resource={resource} />;
      case viewType.SET_AS_MAIN_VIDEO_COVER_IMAGE_TRANSCRIPT:
        return (
          <Box>
            main (video) + cover_image + transcript
            <CommonMainVideoAndAudioPlayer videoData={resource} />
            <Box
              sx={{ color: "gray.1", backgroundColor: "primary.min" }}
              className="question-resource-text-wrapper"
            >
              <SimpleProcessingText data={resource?.transcript} />
            </Box>
          </Box>
        );
      case viewType.SET_AS_MAIN_VIDEO_COVER_IMAGE:
        return (
          <Box>
            main (video) + cover_image
            <CommonMainVideoAndAudioPlayer
              videoData={resource}
              specificVideoClass="specificVideoClass"
            />
          </Box>
        );
      case viewType.SET_AS_MAIN_VIDEO:
        return (
          <Box>
            main (video)
            <CommonMainVideoAndAudioPlayer
              videoData={resource}
              specificVideoClass="specificVideoClass"
            />
          </Box>
        );
      case viewType.SET_AS_MAIN_AUDIO_COVER:
        return (
          <Box>
            main (audio) + cover
            <CommonMainVideoAndAudioPlayer
              videoData={resource}
              specificVideoClass="specificVideoClass"
            />
          </Box>
        );
      case viewType.SET_AS_MAIN_VIDEO_TRANSCRIPT:
        return (
          <Box>
            main (video) + transcript
            <CommonMainVideoAndAudioPlayer videoData={resource} />
            <Box
              sx={{ color: "gray.1", backgroundColor: "primary.min" }}
              className="question-resource-text-wrapper"
            >
              <SimpleProcessingText data={resource?.transcript} />
            </Box>
          </Box>
        );
      case viewType.SET_AS_MAIN_AUDIO_COVER_IMAGE_TRANSCRIPT:
        return (
          <>
            main (audio) + cover_image + transcript
            <CommonMainVideoAndAudioPlayer videoData={resource} />
            <Box
              sx={{ color: "gray.1", backgroundColor: "primary.min" }}
              className="question-resource-text-wrapper"
            >
              <SimpleProcessingText data={resource?.transcript} />
            </Box>
          </>
        );
      case viewType.SET_AS_MAIN_AUDIO_SLOW_AUDIO_COVER_IMAGE_TRANSCRIPT:
        return (
          <>
            main (audio) + slow (audio) + cover_image + transcript
            <CommonMainVideoAndAudioPlayer videoData={resource} />
            <Box
              sx={{ color: "gray.1", backgroundColor: "primary.min" }}
              className="question-resource-text-wrapper"
            >
              <SimpleProcessingText data={resource?.transcript} />
            </Box>
          </>
        );

      case viewType.SET_AS_MAIN_AUDIO_SLOW_AUDIO:
        return (
          <>
            main (audio) + slow (audio)
            <Box className="mainAudio-slowAudio-wrapper">
              <SlowAudio resource={resource} />
              <MainAudio resource={resource} />
            </Box>
          </>
        );
      case viewType.SET_AS_MAIN_AUDIO:
        return (
          <>
            main (audio)
            <Box className="mainAudio-slowAudio-wrapper">
              <MainAudio resource={resource} />
            </Box>
          </>
        );
      case viewType.SET_AS_TRANSCRIPT:
        return (
          <Box>
            transcript
            <Box
              sx={{
                color: "gray.1",
                backgroundColor:
                  question_type === "compose" ? "" : "primary.min",
              }}
              className="question-resource-text-wrapper special-transcript"
            >
              <SimpleProcessingText data={resource?.transcript} />
            </Box>
          </Box>
        );
      case viewType.SET_AS_COVER_IMAGE_TRANSCRIPT:
        return (
          <>
            cover image + transcript
            <Box className="img-holder-with-transcript">
              <img src={resource?.cover_image} />
            </Box>
            <Box
              sx={{ color: "gray.1", backgroundColor: "primary.min" }}
              className="question-resource-text-wrapper"
            >
              <SimpleProcessingText data={resource?.transcript} />
            </Box>
          </>
        );
      case viewType.SET_AS_COVER_IMAGE:
        return (
          <Box className="only-img-holder">
            cover image
            <img src={resource?.cover_image} />
          </Box>
        );
      default:
        break;
    }
  }

  return (
    <Box className="main-question-resource-wrapper">{showSpecificChild()}</Box>
  );
}

export default QuestionsPartResource;
