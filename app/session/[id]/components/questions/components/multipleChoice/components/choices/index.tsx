import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { Choices, IQuestionData } from "../../../../questions.interfaces";
import { shuffleArray } from "@/modules/helper";
import AsCheckBox from "./components/asCheckbox";
import AsRadioBox from "./components/asRadiobox";
import { updateMultipleChoiceCorrectItems } from "@/providers/Redux/lesson/questionSlice/multipleChoices/multipleChoicesSlice";
import { RootReduxState } from "@/providers/Redux/store";

const view: any = {
  asCheckbox: AsCheckBox,
  asRadiobox: AsRadioBox,
};

export type Props = {
  mainData: IQuestionData;
};

function ChoicesMultipleChoice({ mainData }: Props) {
  const dispatch = useDispatch();

  const { allQuestion, currentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.question
  );

  const collectionOfCorrectItems = mainData?.choices?.filter(
    (trueItems: any) => trueItems.correct_choice === true
  );

  let type: string = "";
  if (
    (mainData.sentence.length >= 0 ||
      Object.keys(mainData.resource).length >= 0) &&
    collectionOfCorrectItems.length === 1
  ) {
    type = "asRadiobox";
  } else if (
    mainData.sentence.length === 0 &&
    Object.keys(mainData.resource).length === 0 &&
    collectionOfCorrectItems.length >= 1
  ) {
    type = "asCheckbox";
  }

  // const type =
  //   mainData.sentence.length > 0 || Object.keys(mainData.resource).length > 0
  //     ? "asRadiobox"
  //     : "asCheckbox";

  const CurrentView = view[type];

  const [choices, setChoices] = useState<Choices[] | []>([]);
  const [handleSpecialStyle, setHandleSpecialStyle] = useState(false);

  function prepareContent(_data: Array<any>, trueFalseData: Array<any>) {
    let loadShuffle: any = _data.map((item: any, index: number) => {
      return {
        id: index,
        ...item,
      };
    });

    let loadNotShuffle: any = trueFalseData.map((item: any, index: number) => {
      return {
        id: index,
        ...item,
      };
    });
    loadShuffle = shuffleArray(loadShuffle);
    setChoices(loadShuffle.concat(loadNotShuffle));
  }

  useEffect(() => {
    const removeTrueFalse = mainData?.choices?.filter(
      (item) =>
        (item?.text !== null && item?.image !== null && item?.audio !== null) ||
        (item?.text !== null && item?.image === null && item?.audio !== null) ||
        (item?.text === null && item?.image === null && item?.audio !== null) ||
        (item?.text !== null && item?.image !== null && item?.audio === null)
    );
    const holdTrueAndFalse = mainData?.choices?.filter(
      (item) =>
        item?.text !== null && item?.image === null && item?.audio === null
    );
    prepareContent(removeTrueFalse, holdTrueAndFalse);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainData?.choices]);

  useEffect(() => {
    if (
      choices.length &&
      allQuestion[currentQuestionIndex].id === mainData.id
    ) {
      const correctchoices = choices.filter((choise) => choise.correct_choice);
      const existingAudioImageText = choices
        .map(
          (item) =>
            (item.audio !== null &&
              item.image !== null &&
              item.text !== null) ||
            (item.audio === null && item.image !== null && item.text !== null)
        )
        .every((item) => item === true);
      setHandleSpecialStyle(existingAudioImageText);
      dispatch(updateMultipleChoiceCorrectItems(correctchoices));
    }
  }, [choices, currentQuestionIndex]);

  return (
    <Box
      className={`choice-wrapper ${handleSpecialStyle ? "specialStyle" : ""}`}
    >
      <CurrentView choices={choices} />
    </Box>
  );
}

export default ChoicesMultipleChoice;
