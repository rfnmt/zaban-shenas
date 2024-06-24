import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Item from "./item";
import { shuffleArray } from "@/modules/helper";

import "./style.scss";
import { IQuestionData } from "../../../../../questions.interfaces";

function ComposeChoice({ mainData }: { mainData: IQuestionData }) {
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
    prepareContent(mainData?.choices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainData?.choices]);

  return (
    <Box className="choice-wrapper">
      {shuffledData?.map((item) => (
        <Item key={item.id} item={item} questionId={mainData.id} />
      ))}
    </Box>
  );
}

export default ComposeChoice;
