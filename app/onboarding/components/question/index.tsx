import React from "react";
import { Box, Typography } from "@mui/material";
import "./style.scss";
import { useTheme } from "@emotion/react";
import SingleColumn from "../singleColumn";

function Question({ data }) {
  const theme = useTheme() as any;

  return (
    <Box className="onboarding-question-part container">
      <Typography className="title" sx={{ color: theme.palette.gray["1"] }}>
        {data?.title}
      </Typography>
      {data.button_arrangement === "single_column" ? (
        <SingleColumn
          choices={data?.choices}
          typeOfChoice={data?.type}
          mainSlug={data?.slug}
        />
      ) : (
        <>multi_column</>
      )}
    </Box>
  );
}

export default Question;
