import React, { useLayoutEffect, useEffect } from "react";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";

import { RootReduxState } from "@/providers/Redux/store";
import usePrevious from "../hooks/usePrevious";
import { updateFillDamagedWordsWithWriting } from "@/providers/Redux/lesson/questionSlice/compose/composeSlice";

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean;
  element?: any;
  counter?: number;
  wordRefs: any;
}

function InvisibleItems(props: Props) {
  const theme = useTheme() as any;
  const dispatch = useDispatch();

  const { focus, autoFocus, element, wordRefs, onChange, ...rest } = props;

  const fillDamagedWordsWithWriting = useSelector(
    (state: RootReduxState) =>
      state.composeQuestions.fillDamagedWordsWithWriting
  );

  const currentInput = fillDamagedWordsWithWriting.findIndex((item) => {
    return item?.from === element.from;
  });

  const prevFocus = usePrevious(!!focus);

  useLayoutEffect(() => {
    if (wordRefs?.current[currentInput]) {
      if (focus === true && focus !== prevFocus) {
        wordRefs?.current[currentInput].focus();
        wordRefs?.current[currentInput].select();
      }
    }
  }, [focus, prevFocus]);

  const placeholder = " _ ".repeat(Number(element?.string?.length));

  function handleOnChange(e) {
    const damagedItems = fillDamagedWordsWithWriting;
    const damagedItem = { ...fillDamagedWordsWithWriting[currentInput] };

    if (damagedItems[currentInput])
      damagedItem.userAnswer = String(e.target.value);

    const modifyDamaged = fillDamagedWordsWithWriting.map((item, index) =>
      index === currentInput ? damagedItem : item
    );

    dispatch(updateFillDamagedWordsWithWriting(modifyDamaged));
    if (e) onChange(e);
  }

  return (
    <>
      <input
        autoCapitalize="none"
        style={{
          width: `calc(${Number(element?.string?.length)}px * 12)`,
          borderColor: `${theme.palette.border.main}`,
          backgroundColor: theme.palette.white.flexible,
          color: theme.palette.gray[1],
        }}
        className={`invisible-slice ${element?.align}`}
        placeholder={placeholder}
        maxLength={Number(element?.string?.length)}
        ref={(el) => {
          if (wordRefs?.current && currentInput > -1) {
            wordRefs.current[currentInput] = el;
          }
        }}
        value={fillDamagedWordsWithWriting?.[currentInput]?.userAnswer}
        onChange={handleOnChange}
        {...rest}
      />

      <div style={{ display: "none" }}>
        {fillDamagedWordsWithWriting?.[currentInput]?.userAnswer}
      </div>
    </>
  );
}

export default InvisibleItems;
