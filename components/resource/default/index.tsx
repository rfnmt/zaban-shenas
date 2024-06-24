import React, { useEffect, useRef, useState, useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
// import ProccessText from "@/app/session/[id]/components/tip/components/proccessText";
import Icon from "@/components/icon";
import { RootReduxState } from "@/providers/Redux/store";
import SimpleProcessingText from "@/components/textProcessing/simpleProcessingText";
import { IQuestionData } from "@/app/session/[id]/components/questions/questions.interfaces";
import ImageProvider from "@/components/imageProvider";
import "./style.scss";

function DefaultResource({ data }: { data: IQuestionData }) {
  const theme = useTheme() as any;
  const player = useRef<HTMLVideoElement | undefined | null>();
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setplaying] = useState(false);
  const [opacityIcon, setOpacityIcon] = useState(1);
  const hasTranscript = Boolean(data?.resource?.transcript);
  const hasMainMedia = data?.resource?.main_media;

  const { allQuestion, currentQuestionIndex, goToSlide } = useSelector(
    (state: RootReduxState) => state.question
  );

  const { visibleTipBottomSheet } = useSelector(
    (state: RootReduxState) => state.general
  );

  const currentQuestion = allQuestion[currentQuestionIndex];

  function togglePlayer() {
    var videos = document.querySelectorAll("video");
    var audios = document.querySelectorAll("audio");

    if (currentQuestion?.data?.id === data?.id) {
      for (const iterator of videos) {
        // iterator.currentTime = 0;
        iterator.pause();
      }

      for (const iterator of audios) {
        iterator.currentTime = 0;
        iterator.pause();
      }

      if (playing === true) {
        player.current?.pause();
      } else {
        player.current?.play();
      }
    } else {
      player.current?.pause();
    }
  }

  const onTimeUpdate = (e) => {
    const { currentTime, duration } = e?.target;
    setCurrentTime((currentTime * 100) / duration);
  };

  const mediaUrl = useMemo(() => {
    if (!data?.resource?.main_media) return null;
    return data?.resource?.main_media?.startsWith("https://academy")
      ? data?.resource?.main_media
      : "https://academy-strapi.staging.zabanshenas.com/" +
          data?.resource?.main_media;
  }, [data]);

  if (!data?.resource?.cover_image) mediaUrl + "#t=0.1";

  const mediaCover = useMemo(() => {
    if (!data?.resource?.cover_image) return null;
    return data?.resource?.cover_image?.startsWith("https://academy")
      ? data?.resource?.cover_image
      : "https://academy-strapi.staging.zabanshenas.com" +
          data?.resource?.cover_image;
  }, [data]);

  const [mainMediaIsloaded, setMainMediaIsloaded] = useState(
    !Boolean(hasMainMedia)
  );

  const { viewType } = useSelector(
    (state: RootReduxState) => state.sessionNavigator
  );

  useEffect(() => {
    if (goToSlide === false) {
      if (mainMediaIsloaded && visibleTipBottomSheet === false) {
        if (viewType === "verifyNow" || viewType === "ihaveunderstood") {
          togglePlayer();
        } else if (viewType === "skipVocabExaminationQuestion") {
          player.current?.pause();
        }
      } else if (visibleTipBottomSheet === true) {
        player.current?.pause();
      }
    }

    return () => {
      if (player && player.current) {
        setplaying(false);
        player.current.currentTime = 0;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainMediaIsloaded, goToSlide, visibleTipBottomSheet, viewType]);

  return (
    <Box
      id={String(data?.id)}
      className={`resource-default-view ${!mainMediaIsloaded ? "pulse" : ""}`}
    >
      <div
        onClick={togglePlayer}
        style={{ position: "relative", display: "flex" }}
      >
        {data?.resource?.main_media ? (
          <>
            <Box
              className="toggle-player"
              sx={{
                opacity: opacityIcon,
                background: theme.palette.blackTransparent[1],
              }}
            >
              <Icon size={16} className="" icon={playing ? "pause" : "play"} />
            </Box>

            <video
              ref={player}
              onLoadedMetadata={() => setMainMediaIsloaded(true)}
              onEnded={() => {
                setCurrentTime(0);
                setplaying(false);
                setOpacityIcon(1);
              }}
              onPlay={() => {
                setTimeout(() => {
                  setOpacityIcon(0);
                }, 200);
                setplaying(true);
              }}
              onPause={() => {
                setplaying(false);
                setOpacityIcon(1);
              }}
              src={mediaUrl}
              playsInline
              className="media-element"
              onTimeUpdate={onTimeUpdate}
              style={{
                backgroundImage: `url(${mediaCover})`,
                borderRadius: hasTranscript ? "10px 10px 0px 0px" : "10px",
              }}
            />

            <Box
              className="range"
              sx={{
                borderRadius: hasTranscript
                  ? "0px !important"
                  : "0 0 10px 10px  !important",
              }}
            >
              <input
                type="range"
                min="0"
                step="0.25"
                value={currentTime || 0}
                onChange={(e) => {
                  const value = e?.target.value;
                  if (player && player.current && value) {
                    player.current.currentTime =
                      (value * player?.current?.duration) / 100;
                  }

                  if (!playing) togglePlayer();
                }}
              />
            </Box>
          </>
        ) : mediaCover ? (
          <div
            className={`cover ${
              hasTranscript ? "has-transcript" : ""
            } img-fluid`}
            style={{ position: "relative" }}
          >
            <ImageProvider
              className="img-fluid"
              src={mediaCover}
              style={{
                borderRadius: hasTranscript
                  ? "10px 10px 0 0 !important"
                  : "10px Important",
                background: theme.palette.white.flexible,
              }}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      {hasTranscript && (
        <Typography
          className="transcript"
          sx={{
            marginTop: data?.resource?.main_media || mediaCover ? "-10px" : 0,
            backgroundColor:
              data?.resource?.main_media || mediaCover
                ? "primary.min"
                : "transparent",
            borderRadius: !Boolean(mediaCover || mediaUrl)
              ? "10px !important"
              : "0 0 10px 10px !important",
            ".unvisible-slice ": {
              lineHeight: "50px",
              display: "inline-block",
              borderBottom: (theme) => `1px solid ${theme.palette.border.main}`,
            },

            ".wrap-sentence": {
              lineHeight: "unset !important",
            },
          }}
        >
          <SimpleProcessingText data={data?.resource?.transcript} />
        </Typography>
      )}
    </Box>
  );
}

export default DefaultResource;
