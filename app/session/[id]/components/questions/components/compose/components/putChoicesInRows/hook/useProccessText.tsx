import React from "react";
import { useDispatch } from "react-redux";

import {
  triggerButtonEnable,
  triggerViewType,
} from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { checkTextareaAnswer } from "../../onlyTextArea/helpers";
import SimpleProcessingText from "@/components/textProcessing/simpleProcessingText";

export function useProccessText(data) {
  const dispatch = useDispatch();
  const readyToRender = [];

  for (
    let index = 0;
    index < data?.damaged_sentence?.styling?.length;
    index++
  ) {
    readyToRender.push(
      <SimpleProcessingText
        key={index}
        index={index}
        data={data?.damaged_sentence}
      />
    );
  }

  function checking(e) {
    dispatch(triggerViewType("verifyNow"));

    const value = e.target.value;
    if (value === "") {
      dispatch(triggerButtonEnable(false));
    } else {
      dispatch(triggerButtonEnable(true));
      checkTextareaAnswer(value);
    }
  }

  return (
    <>
      <div
        id={`item-wrapper-${data.id}`}
        className="sentence"
        style={{
          display: "block",
          textAlign: readyToRender[0]?.props?.style?.textAlign,
          direction: readyToRender[0]?.props?.style?.direction,
        }}
      >
        {readyToRender.map((item) => item)}
      </div>
      <textarea onChange={checking}>write answer</textarea>
    </>
  );
}
