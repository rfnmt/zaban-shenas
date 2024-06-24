import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

import { Level } from "../../onboarding.interfaces";
import { Data } from "../../onboarding.interfaces";
import Levels from "./components/levels";

import "./style.scss";

function Placement({ data }: { data: Data }) {
  const theme = useTheme() as any;

  return (
    <Box className="onboarding-placement-wrapper container">
      <Typography className="title" sx={{ color: theme.palette.gray["1"] }}>
        {data?.title}
      </Typography>
      <Typography
        className="description"
        sx={{ color: theme.palette.gray["2"] }}
      >
        {data?.description}
      </Typography>
      {data?.level?.map((item: Level) => (
        <Levels key={item.id} data={item} />
      ))}
    </Box>
  );
}

export default Placement;
