import React, { useEffect, useState } from "react";
import { shuffleArray } from "@/modules/helper";
import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TextImageAudio from "./textImageAudio";

function ComposeChoice({ data }) {
  const [shuffledData, setShuffledData] = useState() as any;

  function prepareContent(_data: Data) {
    let loadShuffle = _data.map((item, index) => {
      return {
        id: index,
        ...item,
      };
    });
    loadShuffle = shuffleArray(loadShuffle);
    setShuffledData(loadShuffle);
  }

  useEffect(() => {
    prepareContent(data?.choices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.choices]);

  return (
    <Box className="choice-wrapper">
      {shuffledData?.map((item) => (
        <TextImageAudio key={item.id} item={item} />
      ))}
    </Box>
  );
}

export default ComposeChoice;
