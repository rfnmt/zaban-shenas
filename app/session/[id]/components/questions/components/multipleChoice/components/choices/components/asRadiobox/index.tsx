import React, { Key } from "react";
import { useDispatch } from "react-redux";
import { Choices } from "@/app/session/[id]/components/questions/questions.interfaces";
import { triggerButtonEnable } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { updateMultipleChoiceSelectedAnswer } from "@/providers/Redux/lesson/questionSlice/multipleChoices/multipleChoicesSlice";
import TextImageAudio from "./textImageAudio";
import TextAudio from "./textAudio";
import OnlyAudio from "./onlyAudio";
import OnlyText from "./onlyText";

type Props = {
  choices: Choices[];
};

const view = {
  textImageAudio: TextImageAudio,
  textAudio: TextAudio,
  onlyAudio: OnlyAudio,
  onlyText: OnlyText,
};

function AsRadioBox({ choices }: Props) {
  const dispatch = useDispatch();

  function clicked(id: number) {
    dispatch(triggerButtonEnable(true));
    dispatch(updateMultipleChoiceSelectedAnswer([id]));
  }

  function typeOfChoiceComponent({ text, image, audio }) {
    if (
      (text !== null && image !== null && audio !== null) ||
      (audio === null && image !== null && text !== null)
    ) {
      return "textImageAudio";
    } else if (text !== null && image === null && audio !== null) {
      return "textAudio";
    } else if (text === null && image === null && audio !== null) {
      return "onlyAudio";
    } else if (text !== null && image === null && audio === null) {
      return "onlyText";
    }
  }

  return (
    <>
      {choices.length > 1 ? (
        choices?.map((choise: Choices, index: Key) => {
          const { text, image, audio } = choise;
          const CurrentView =
            view[typeOfChoiceComponent({ text, image, audio })];
          return <CurrentView click={clicked} choise={choise} key={index} />;
        })
      ) : (
        <></>
      )}
    </>
  );
}

export default AsRadioBox;
