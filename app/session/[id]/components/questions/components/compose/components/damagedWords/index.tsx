import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RenderPersianContent } from "@/components/textProcessing/characterByCharacterProcessing/renderPersianContent";
import { triggerButtonEnable } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { defaultTextProcessingContnet } from "@/components/textProcessing/helpers/defaultProcessText";
import { IQuestionData } from "@/app/session/[id]/components/questions/questions.interfaces";
import { RootReduxState } from "@/providers/Redux/store";
import { updateFillDamagedWordsWithWriting } from "@/providers/Redux/lesson/questionSlice/compose/composeSlice";
import { RenderEnglishContent } from "@/components/textProcessing/characterByCharacterProcessing/renderEnglishContent";
import {
  ProcessedTextData,
  SentenceEntity,
} from "@/components/textProcessing/interfaces";
import InvisibleItems from "./invisibleItems";

import "./styles.scss";

export default function DamagedWords({ data }: { data: IQuestionData }) {
  const dispatch = useDispatch();

  const getPreparedTextPoccessing: ProcessedTextData[] =
    defaultTextProcessingContnet(data?.damaged_sentence);

  const { allQuestion, currentQuestionIndex } = useSelector(
    (state: RootReduxState) => state?.question
  );

  const damagedWordItems = data?.damaged_sentence?.display;

  const content = data?.damaged_sentence?.content;

  const wordRefs = useRef(
    [...Array(data?.damaged_sentence?.display?.length)].map(() =>
      React.createRef()
    )
  );

  useEffect(() => {
    /**
     * The missing parts of the question are stored in Redux
     * so that they can be used to help correct the user's answer
     */

    if (data?.id === allQuestion[currentQuestionIndex]?.id) {
      const reduxDamagedItems = damagedWordItems?.map((item) => {
        return {
          userAnswer: "",
          to: item.to,
          from: item.from,
          content: content.substring(item?.from, item?.to),
        };
      });

      dispatch(updateFillDamagedWordsWithWriting(reduxDamagedItems));
    }
  }, [damagedWordItems, currentQuestionIndex]);

  const [activeInput, setActiveInput] = useState(0);

  function getIndexOfBlank(element: SentenceEntity) {
    const FI = damagedWordItems.findIndex((FDS) => {
      return FDS?.to === element?.to;
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
    if (wordRefs && wordRefs.current && wordRefs?.current[activeInput + 1])
      focusInput(activeInput + 1);
    // else setActiveInput(-1);
  }, [activeInput, focusInput]);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.currentTarget.value;

      if (!val) {
        e.preventDefault();
        return;
      }

      if (val?.length >= wordRefs?.current[activeInput]?.maxLength) {
        e.preventDefault();
        focusNextInput();
      }
    },
    [focusNextInput]
  );

  const onBlur = useCallback(() => {
    setActiveInput(-1);
  }, []);

  const focusPrevInput = useCallback(() => {
    if (wordRefs && wordRefs?.current && wordRefs?.current[activeInput - 1])
      focusInput(activeInput - 1);
  }, [activeInput, focusInput]);

  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Backspace":
        case "Delete": {
          if (wordRefs?.current?.[activeInput]?.value === "") {
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
    [focusPrevInput, focusNextInput, wordRefs, activeInput]
  );

  const handleOnKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const allInputsHasValue = wordRefs?.current?.every(
        (input) => input?.value !== ""
      );

      if (allInputsHasValue) {
        // setActiveInput(-1);
        dispatch(triggerButtonEnable(true));
      } else dispatch(triggerButtonEnable(false));

      if (e?.target?.value?.length == e?.target?.maxLength) {
        e?.target?.blur();
        e.preventDefault();
        focusNextInput();
      }
    },
    [focusPrevInput, focusNextInput, wordRefs, activeInput]
  );

  return (
    <div
      className="fill-damaged-words-with-writing"
      id={`review-section-${data?.id}`}
    >
      <div className="sentence" style={{ display: "block" }}>
        {getPreparedTextPoccessing.map((rows, key) => {
          const direction = rows?.lang === "en" ? "ltr" : "rtl";
          const textAlign = rows?.lang === "en" ? "left" : "right";

          return (
            <div
              key={key}
              className="wrap-sentence"
              style={{ direction: direction, textAlign: textAlign }}
            >
              {rows?.lang === "en" ? (
                rows?.data?.map((column, columnKey) => {
                  const indexOfBlank = getIndexOfBlank(column) || 0;

                  return column?.visibility ? (
                    <RenderEnglishContent key={columnKey} rowData={column} />
                  ) : (
                    <span key={columnKey} className="english-slice">
                      <InvisibleItems
                        element={column}
                        wordRefs={wordRefs}
                        onChange={handleOnChange}
                        onFocus={handleOnFocus(indexOfBlank)}
                        onBlur={onBlur}
                        onKeyUp={handleOnKeyUp}
                        focus={activeInput === indexOfBlank}
                        onKeyDown={handleOnKeyDown}
                      />
                    </span>
                  );
                })
              ) : (
                <RenderPersianContent key={key} rowData={rows} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
