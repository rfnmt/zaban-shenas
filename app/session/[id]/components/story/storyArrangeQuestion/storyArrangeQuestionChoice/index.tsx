import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { storyOtherPartsMotion, shuffleArray } from "@/modules/helper";
import ChoicesOfArrangeQuestion from "./choicesOfArrangeQuestion";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { RootReduxState } from "@/providers/Redux/store";
import "./style.scss";

type Data = {
  getChoices: Array<any>;
};

function StoryArrangeQuestionChoice({ getChoices }: Data) {
  const dispatch = useDispatch();
  const [shuffledData, setShuffledData] = useState() as any;
  // if we use userAnsweredTheQuestion code in ChoicesOfArrangeQuestion component
  // with every render it becomes true
  const [userAnsweredTheQuestion, setUserAnsweredTheQuestion] = useState(true);
  const [collectAllTrueIDs, setCollectAllTrueIDs] = useState<Array<number>>([]);
  const answerStoryfillDamagedSentenceWithChoices = useSelector(
    (state: RootReduxState) =>
      state?.story?.answerStoryfillDamagedSentenceWithChoices
  );
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
    prepareContent(getChoices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getChoices]);
  return (
    <motion.div {...storyOtherPartsMotion}>
      <Box
        className="choice-arrange-question-wrapper"
        sx={{ position: "relative" }}
      >
        {collectAllTrueIDs.length ===
        answerStoryfillDamagedSentenceWithChoices.length ? (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: "0",
              left: "0",
              zIndex: 100,
            }}
          />
        ) : (
          <></>
        )}

        {shuffledData?.map((item) => (
          <ChoicesOfArrangeQuestion
            key={item.id}
            item={item}
            setUserAnsweredTheQuestion={setUserAnsweredTheQuestion}
            userAnsweredTheQuestion={userAnsweredTheQuestion}
            setCollectAllTrueIDs={setCollectAllTrueIDs}
            collectAllTrueIDs={collectAllTrueIDs}
          />
        ))}
      </Box>
    </motion.div>
  );
}

export default StoryArrangeQuestionChoice;
