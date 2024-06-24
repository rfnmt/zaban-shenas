import { textIsFarsi } from "@/modules/helper";
import {
  Damagedsentence,
  DataBelongVsisibleSlice,
  ProcessedTextData,
  SentenceEntity,
  SpliteContentLines,
  GenerateDataByStyling,
} from "../interfaces";

function separateContentIntoLines(content: string): SpliteContentLines[] {
  const splitContentWithNewLine = content?.split(/[\r\n]+/);
  const iteratSpliteNewLineContent: SpliteContentLines[] = [];

  let prevNewLineCounter = 0;

  splitContentWithNewLine?.map((item: string) => {
    let counterNewLine = item.length;
    const detectLang = textIsFarsi(item) ? "fa" : "en" || "en";

    iteratSpliteNewLineContent.push({
      sentence: item,
      from: prevNewLineCounter,
      to: prevNewLineCounter + counterNewLine + 1,
      lang: detectLang,
    });

    prevNewLineCounter += item?.length + 1;
  });

  return iteratSpliteNewLineContent;
}

function alignment(data, as = "", hasDisplay = "") {
  let align = null;

  const startWith = new RegExp(/^[A-Za-z]/);
  const endWith = new RegExp(/[A-Za-z]$/);

  let isFull = false;

  let isLeft =
    (data?.prev &&
      endWith?.test(data?.prev) &&
      startWith?.test(data?.current)) ||
    false;

  let isRight =
    (data?.next &&
      startWith?.test(data?.next) &&
      endWith?.test(data?.current)) ||
    false;

  let isCenter =
    (startWith?.test(data?.current) &&
      endWith?.test(data?.current) &&
      isLeft &&
      isRight) ||
    false;

  if (as === "unvisible item") {
    if (!isLeft && !isRight)
      isFull = startWith?.test(data?.current) && endWith?.test(data?.current);
  }

  if (isFull) align = "full-border";
  else if (isRight && !isLeft && !isCenter) align = "left-border";
  else if (isLeft && !isRight && !isCenter) align = "right-border";
  else if (isCenter && (isLeft || isRight)) align = "center-border";

  return align;
}

function generateDataByStyling({
  styling,
  hints,
  content,
  line,
}: GenerateDataByStyling) {
  const slice: SentenceEntity[] = [];

  const filterdStyles =
    styling?.filter(
      (item: Styling) =>
        (item.from >= line.from && item.from <= line.to) ||
        (item.to >= line.from && item.to <= line.to) ||
        (item.from <= line.from && item.to >= line.to)
    ) || null;

  if (filterdStyles?.length) {
    for (let index = 0; index < filterdStyles?.length; index++) {
      const findHint =
        hints?.find(
          (hintItem) =>
            hintItem.from <= filterdStyles[index].from &&
            hintItem.to >= filterdStyles[index].to
        ) || null;

      const from = Math.max(filterdStyles[index].from, line?.from);
      const to = Math.min(filterdStyles[index].to, line?.to);

      if (content.substring(from, to).length) {
        let align = alignment(
          {
            prev: filterdStyles?.[index - 1]?.to
              ? content.substring(
                  filterdStyles?.[index - 1]?.from,
                  filterdStyles?.[index - 1]?.to
                )
              : null,
            current: content.substring(from, to),
            next:
              filterdStyles?.[index + 1]?.from && filterdStyles?.[index + 1]?.to
                ? content.substring(
                    filterdStyles?.[index + 1]?.from,
                    filterdStyles?.[index + 1]?.to
                  )
                : null,
          },
          "filterdStyle"
        );

        slice.push({
          style: filterdStyles[index],
          hint: findHint,
          from: from,
          to: to,
          string: content.substring(from, to),
          align,
        });
      }
    }

    return slice;
  }
}

export function defaultTextProcessingContnet(data: Damagedsentence) {
  const content = data?.content;
  const display = data?.display;
  const styling = data?.styling;
  const hints = data?.hints;

  const processedTextData: ProcessedTextData[] = [];
  const contentLines = separateContentIntoLines(content);

  for (const line of contentLines) {
    let sentences: SentenceEntity[] = [];

    if (line.lang === "en") {
      const filterDisplay: Display[] = display?.filter(
        (item: Display) => item.from >= line.from && item.to <= line.to
      );

      const sliceContent: number[] = [];

      if (filterDisplay?.length) {
        filterDisplay.forEach((item) => {
          sliceContent.push(item.from);
          sliceContent.push(item.to);
        });
      }

      if (sliceContent[0] !== line?.from) sliceContent.unshift(line?.from);

      const slice: SentenceEntity[] = [];

      for (let index = 0; index < sliceContent.length; index++) {
        const sliceFrom = sliceContent[index];
        const sliceTo = sliceContent[index + 1] || line?.to;

        const sliceVisibility: Display | undefined = display?.find(
          (item: Display) => item?.from >= sliceFrom && item?.to <= sliceTo
        );

        if (Boolean(sliceVisibility)) {
          if (content.substring(sliceFrom, sliceTo).length) {
            const align = alignment(
              {
                prev: sliceContent?.[index - 1]
                  ? content.substring(sliceContent?.[index - 1], sliceFrom)
                  : content.substring(sliceFrom, 0),
                current: content.substring(sliceFrom, sliceTo),
                next: sliceContent?.[index + 1]
                  ? content?.substring(
                      sliceTo,
                      sliceContent?.[index + 2] || line?.to
                    )
                  : null,
              },
              "unvisible item"
            );

            slice.push({
              from: sliceFrom,
              to: sliceTo,
              string: content.substring(sliceFrom, sliceTo),
              visibility: false,
              align,
            });
          }
        } else {
          const sliceData: DataBelongVsisibleSlice[] = generateDataByStyling({
            display,
            styling,
            hints,
            content,
            line: {
              from: sliceFrom,
              to: sliceTo,
              lang: line?.lang,
              sentence: line?.sentence,
            },
          });

          if (sliceData?.length)
            slice.push({
              data: sliceData,
              from: sliceFrom,
              to: sliceTo,
              visibility: true,
              string: content?.substring(sliceFrom, sliceTo),
            });
        }
      }

      sentences = slice;
    } else {
      const sliceData = generateDataByStyling({
        display,
        styling,
        hints,
        content,
        line,
      });

      if (sliceData) sentences = sliceData;
    }

    processedTextData.push({
      data: sentences,
      lang: line.lang,
    });
  }

  return processedTextData;
}
