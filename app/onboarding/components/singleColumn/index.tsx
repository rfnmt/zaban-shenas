import React from "react";
import { Box } from "@mui/material";
import "./style.scss";
import SingleChoice from "../singleChoice";

function SingleColumn({ choices, typeOfChoice, mainSlug }) {
  return (
    <Box>
      {typeOfChoice === "single_choice" ? (
        <SingleChoice choices={choices} mainSlug={mainSlug} />
      ) : (
        <>multiple_choice</>
      )}
    </Box>
  );
}

export default SingleColumn;
