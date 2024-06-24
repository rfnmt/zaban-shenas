import React, { Key, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@mui/material";

import { prepareSimpleTextProccessorContent } from "@/components/textProcessing/helpers/prepareSimpleTextProccessorContent";
import { triggerButtonEnable } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { IQuestionData } from "../../../../questions.interfaces";
import { RootReduxState } from "@/providers/Redux/store";
import { updateFillDamagedSentenceWithWriting } from "@/providers/Redux/lesson/questionSlice/compose/composeSlice";
import { DamagedItems } from "../../../../types";
import InvisibleItems from "./invisibleItems";
import VisibleItem from "./visibleItem";

import "./style.scss";

function DamagedSentence({ data }: { data: IQuestionData }) {
  const dispatch = useDispatch();
  const theme = useTheme() as any;

  const preparedContent = prepareSimpleTextProccessorContent(
    data?.damaged_sentence
  );

  const { allQuestion, currentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.question
  );

  const { fillDamagedSentenceWithWriting } = useSelector(
    (state: RootReduxState) => state.composeQuestions
  );

  const { viewType } = useSelector(
    (state: RootReduxState) => state.sessionNavigator
  );

  useEffect(() => {
    /**
     * The missing parts of the question are stored in Redux
     * so that they can be used to help correct the user's answer
     */

    if (data?.id === allQuestion[currentQuestionIndex]?.id) {
      const content = data?.damaged_sentence?.content;

      const damagedItems: DamagedItems[] = [];

      data?.damaged_sentence?.display?.map((item) => {
        damagedItems.push({
          userAnswer: "",
          to: item.to,
          from: item.from,
          content: content.substring(item.from, item.to),
        });
      });

      dispatch(updateFillDamagedSentenceWithWriting(damagedItems));
    }
    return () => {
      dispatch(updateFillDamagedSentenceWithWriting([]));
    };
  }, [currentQuestionIndex]);

  const sentenceRefs = useRef(
    [...Array(fillDamagedSentenceWithWriting.length)].map(() =>
      React.createRef()
    )
  );

  const [activeInput, setActiveInput] = useState(0);

  function getIndexOfBlank(element) {
    const FI = fillDamagedSentenceWithWriting.findIndex((FDS) => {
      return FDS.to === element.to;
    });

    if (FI !== -1) {
      return FI;
    }
  }

  const focusInput = useCallback(
    (inputIndex: number) => {
      setActiveInput(inputIndex);
    },
    [length]
  );

  const handleOnFocus = useCallback(
    (index: number) => () => {
      focusInput(index);
    },
    [focusInput]
  );

  const focusNextInput = useCallback(() => {
    if (sentenceRefs.current[activeInput + 1]) focusInput(activeInput + 1);
  }, [activeInput, focusInput]);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.currentTarget.value;

      if (!val) {
        e.preventDefault();
        return;
      }

      if (val.length >= sentenceRefs.current[activeInput]?.maxLength) {
        e.preventDefault();
        if (sentenceRefs.current[activeInput + 1]) {
          focusNextInput();
        } else onBlur();
      }
    },
    [focusNextInput]
  );

  const onBlur = useCallback(() => {
    setActiveInput(-1);
  }, []);

  const focusPrevInput = useCallback(() => {
    if (sentenceRefs.current[activeInput - 1]) focusInput(activeInput - 1);
  }, [activeInput, focusInput]);

  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Backspace":
        case "Delete": {
          if (sentenceRefs?.current?.[activeInput]?.value === "") {
            focusPrevInput();
          }
          break;
        }

        case "ArrowLeft": {
          e.preventDefault();
          focusPrevInput();
          break;
        }

        case "ArrowRight": {
          e.preventDefault();
          focusNextInput();
          break;
        }

        default:
          break;
      }
    },
    [focusPrevInput, focusNextInput, sentenceRefs, activeInput]
  );

  const handleOnKeyUp = useCallback(() => {
    const allInputsHasValue = sentenceRefs.current.every(
      (input) => input?.value !== ""
    );
    if (allInputsHasValue) {
      dispatch(triggerButtonEnable(true));
    } else dispatch(triggerButtonEnable(false));
  }, [focusPrevInput, focusNextInput, sentenceRefs, activeInput]);

  return (
    <div
      className="fill-damaged-sentence-with-writing"
      id={`review-section-${data?.id}`}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.white.flexible,
          border: `1px solid ${theme.palette.border.main}`,
          padding: "16px 16px 6px 16px",
          borderRadius: "20px",
        }}
      >
        {preparedContent?.length > 0 &&
          preparedContent?.map((paragraphs: any, paragraphsKey: Key) => {
            const direction = paragraphs?.lang === "en" ? "ltr" : "rtl";
            const textAlign = paragraphs?.lang === "en" ? "left" : "right";

            return (
              <Box
                key={paragraphsKey}
                className="wrap-sentence"
                style={{ direction: direction, textAlign: textAlign }}
              >
                {paragraphs?.data?.map((paragraph: any) => {
                  return paragraph?.elements?.map((element: any, key: Key) => {
                    const indexOfBlank = getIndexOfBlank(element);

                    return element?.visibility ? (
                      <VisibleItem key={key} element={element} />
                    ) : indexOfBlank !== undefined && indexOfBlank > -1 ? (
                      <InvisibleItems
                        key={key}
                        element={element}
                        sentenceRefs={sentenceRefs}
                        onChange={handleOnChange}
                        onFocus={handleOnFocus(indexOfBlank)}
                        onBlur={onBlur}
                        onKeyUp={handleOnKeyUp}
                        focus={activeInput === indexOfBlank}
                        onKeyDown={handleOnKeyDown}
                      />
                    ) : (
                      ""
                    );
                  });
                })}
              </Box>
            );
          })}
      </Box>
    </div>
  );
}

export default DamagedSentence;
