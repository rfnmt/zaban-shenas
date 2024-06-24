import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import { shuffleArray, textIsFarsi } from "@/modules/helper";
import LearningWord from "./learningWord";
import TranslateWord from "./translateWord";
import { IQuestionData, Pair } from "../../questions.interfaces";

import "./style.scss";

export type Props = {
  data: IQuestionData;
};

function Match({ data }: Props) {
  const [matchData, setMatchData] = useState() as any;

  function prepareContent(pairs: Pair[]) {
    let learning_word: any = pairs?.map((item, index) => {
      return {
        key: index,
        learning_word: item?.learning_word,
        tts: item?.tts,
        id: data.id,
      };
    });

    let translation: any = pairs.map((item, index) => {
      return {
        translation: item?.translation,
        key: index,
        id: data.id,
      };
    });

    learning_word = shuffleArray(learning_word);
    translation = shuffleArray(translation);

    const _data = [];
    for (let index = 0; index < pairs.length; index++) {
      _data.push({
        translation: translation[index],
        learning_word: learning_word[index],
      });
    }

    setMatchData(_data);
  }

  useEffect(() => {
    resetStates();
  }, [data]);

  function resetStates() {
    setMatchData(null);

    prepareContent(data?.pairs);
  }

  return (
    <Box className="match-wrapper">
      <div className="pairs-wrapper">
        <Typography
          sx={{ color: "gray.1" }}
          className={`question-prompt ${
            textIsFarsi(data?.prompt) ? "fa" : "en"
          }`}
        >
          {data?.prompt}
        </Typography>

        <div id={`${data?.id}-pairs`} className="pairs">
          {matchData?.map((item, index) => {
            return (
              <div key={index} className="pairs-item">
                <LearningWord item={item.learning_word} />
                <TranslateWord item={item.translation} />
              </div>
            );
          })}
        </div>
      </div>
    </Box>
  );
}

export default Match;
