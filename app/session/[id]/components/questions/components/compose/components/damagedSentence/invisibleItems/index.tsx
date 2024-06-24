import React, { useLayoutEffect } from "react";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";

import { RootReduxState } from "@/providers/Redux/store";
import usePrevious from "./questionInputs/hooks/usePrevious";

export interface SingleOTPInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean;
  element?: any;
  counter?: number;
  sentenceRefs: any;
}

export interface Element {
  id: number;
  style: Style;
  hint: null;
  from: number;
  to: number;
  string: string;
  visibility: boolean;
}

export interface Style {
  from: number;
  to: number;
  attributes: Attributes;
}

export interface Attributes {
  alignment: string;
  direction: string;
  text_color: string;
  font_size: number;
  font_weight: string;
  line_spacing: number;
  font_family: string;
}

function InvisibleItems(props: SingleOTPInputProps) {
  const theme = useTheme() as any;

  const { fillDamagedSentenceWithWriting } = useSelector(
    (state: RootReduxState) => state.composeQuestions
  );

  const { focus, autoFocus, element, sentenceRefs, ...rest } = props;

  const currentInput = fillDamagedSentenceWithWriting?.findIndex((item) => {
    return item?.to === element?.to;
  });

  const prevFocus = usePrevious(!!focus);

  useLayoutEffect(() => {
    if (sentenceRefs?.current[currentInput]) {
      if (focus === true && focus !== prevFocus) {
        sentenceRefs?.current[currentInput]?.focus();
        sentenceRefs?.current[currentInput]?.select();
      }
    }
  }, [focus, prevFocus]);

  return (
    <>
      <input
        autoCapitalize="none"
        style={{
          width: `calc(${Number(element?.string?.length)}px * 10)`,
          borderBottom: `1px solid ${theme.palette.border.main}`,
          backgroundColor: theme.palette.white.flexible,
          color: theme.palette.gray[1],
        }}
        maxLength={Number(element?.string?.length)}
        ref={(el) => {
          if (sentenceRefs?.current && currentInput !== -1) {
            sentenceRefs.current[currentInput] = el;
          }
        }}
        {...rest}
      />

      <div style={{ display: "none" }}>
        {sentenceRefs?.current[currentInput]?.value}{" "}
      </div>
    </>
  );
}

export default InvisibleItems;
