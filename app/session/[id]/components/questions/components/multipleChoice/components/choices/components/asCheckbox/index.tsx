import React, { Key, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Choices } from "@/app/session/[id]/components/questions/questions.interfaces";
import { RootReduxState } from "@/providers/Redux/store";
import { updateMultipleChoiceSelectedAnswer } from "@/providers/Redux/lesson/questionSlice/multipleChoices/multipleChoicesSlice";
import CheckboxItem from "./checkboxItem";
import { triggerButtonEnable } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";

type Props = {
  choises: Choices[];
};

function AsCheckBox({ choises }: Props) {
  const dispatch = useDispatch();
  const { multipleChoiceSelectedAnswer } = useSelector(
    (state: RootReduxState) => state.multipleChoise
  );

  const cloneMultipleChoiceSelectedAnswer = multipleChoiceSelectedAnswer;

  function clicked(id: number) {
    const findItem: number | undefined = cloneMultipleChoiceSelectedAnswer.find(
      (item) => item === id
    );

    if (findItem > -1) {
      const prevData = cloneMultipleChoiceSelectedAnswer.filter(
        (item) => item !== id
      );

      dispatch(updateMultipleChoiceSelectedAnswer(prevData));
    } else {
      dispatch(
        updateMultipleChoiceSelectedAnswer([
          ...cloneMultipleChoiceSelectedAnswer,
          id,
        ])
      );
    }
  }

  useEffect(() => {
    if (multipleChoiceSelectedAnswer.length) {
      dispatch(triggerButtonEnable(true));
    } else {
      dispatch(triggerButtonEnable(false));
    }
    return () => {};
  }, [multipleChoiceSelectedAnswer]);

  return (
    <>
      {choises?.map((item: Choices, index: Key) => {
        return <CheckboxItem key={index} item={item} clicked={clicked} />;
      })}
    </>
  );
}

export default AsCheckBox;
