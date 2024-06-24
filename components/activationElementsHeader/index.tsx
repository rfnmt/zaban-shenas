import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useSelector } from "react-redux";
import "./style.scss";

type Props = {
  title: string;
  description: string;
  thumbnail?: null | string;
  darkThemeing?: string;
  lightThemeing?: string;
  customTheme?: string;
  specialGemClassName?: string;
};

function ActivationElementsHeader({
  title,
  description,
  thumbnail,
  darkThemeing,
  lightThemeing,
  customTheme,
  specialGemClassName,
}: Props) {
  const { mode } = useSelector((state: any) => state.general);
  return (
    <Box className={`activation-elements-header ${specialGemClassName}`}>
      <Box className="title-wrapper">
        <Typography
          className="title"
          sx={{
            color:
              mode === "light"
                ? `${lightThemeing ? lightThemeing : customTheme} !important`
                : `${darkThemeing ? darkThemeing : customTheme} !important`,
          }}
        >
          {title}
        </Typography>
        <Typography
          className="description"
          sx={{
            color:
              mode === "light"
                ? `${lightThemeing ? lightThemeing : customTheme} !important`
                : `${darkThemeing ? darkThemeing : customTheme} !important`,
          }}
        >
          {description}
        </Typography>
      </Box>
      {thumbnail &&
      thumbnail.split(".")[thumbnail.split(".").length - 1] !== "svg" ? (
        <Box className="pic">
          <Image width={88} height={88} src={thumbnail} alt="pic" />
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default ActivationElementsHeader;
