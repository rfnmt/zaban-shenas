"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

import Icon from "@/components/icon";

function AuthHeader(): JSX.Element {
  const theme = useTheme() as any;

  return (
    <Box
      bgcolor="white.flexible"
      className="signup-header"
      sx={{ borderBottom: `1px solid ${theme?.palette?.border?.main}` }}
    >
      <div className="container">
        <Icon size={40} icon="zabanshenas" />
        <div className="typography">
          <Typography
            className="title"
            sx={{ color: (theme) => theme.palette.primary.main }}
          >
            Zabanshenas
          </Typography>

          <Typography
            className="subtitle"
            sx={{ color: theme.palette.gray[1] }}
          >
            ACADEMY
          </Typography>
        </div>
      </div>
    </Box>
  );
}

export default AuthHeader;
