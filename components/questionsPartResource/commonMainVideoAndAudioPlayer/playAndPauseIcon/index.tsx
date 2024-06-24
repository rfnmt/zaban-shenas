import React from "react";
import Icon from "@/components/icon";
import { Box } from "@mui/material";
import "./style.scss";

function PlayAndPauseIcon({ opacityIcon, togglePlayer, playing }) {
  return (
    <Box
      sx={{
        opacity: opacityIcon,
        background: (theme) => theme.palette.blackTransparent[1],
      }}
      className="toggle-player"
      onClick={togglePlayer}
    >
      <Icon size={16} className="" icon={playing ? "pause" : "play"} />
    </Box>
  );
}

export default PlayAndPauseIcon;
