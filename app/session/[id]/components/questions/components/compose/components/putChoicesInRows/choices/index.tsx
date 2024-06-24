import React, { useEffect, useState } from "react";
import { shuffleArray } from "@/modules/helper";
import { Box } from "@mui/material";

import Item from "./item";

function ComposeMakeSentenceWithChoice({ choices }: { choices: choices }) {
  const [shuffledData, setShuffledData] = useState() as any;

  function prepareContent(_data) {
    let loadShuffle = _data?.map((item, index) => {
      return {
        id: index,
        ...item,
      };
    });

    loadShuffle = shuffleArray(loadShuffle);
    setShuffledData(loadShuffle);
  }

  useEffect(() => {
    prepareContent(choices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choices]);

  return (
    <Box className="choice-wrapper">
      {shuffledData?.map((choice) => (
        <Item key={choice.id} choice={choice} />
      ))}
    </Box>
  );
}

export default ComposeMakeSentenceWithChoice;
