import { textIsFarsi } from "@/modules/helper";

export interface FilterdStyles {
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

export function prepareSimpleTextProccessorContent(data: any) {
  const content = data?.content;
  const display = data?.display;
  const styling = data?.styling;
  const hints = data?.hints;

  const sliceContentWithNewLine = [];

  const splitContentWithNewLine = content?.split(/[\r\n]+/);

  const iteratSplitNewLineContent: any = [];

  let prevNewLineCounter = 0;

  for (const paragraph of splitContentWithNewLine) {
    let paragraphLength = paragraph.length;
    const detectLang = textIsFarsi(paragraph) ? "fa" : "en" || "en";

    iteratSplitNewLineContent.push({
      sentence: paragraph,
      from: prevNewLineCounter,
      to: prevNewLineCounter + paragraphLength + 1,
      lang: detectLang,
    });

    prevNewLineCounter += paragraph.length + 1;
  }

  for (const iterator of iteratSplitNewLineContent) {
    const sentences: any[] = [];

    const el = [];
    let filterdStyles: FilterdStyles[];

    filterdStyles = styling.filter(
      (item: any) =>
        (item.from >= iterator.from && item.from <= iterator.to) ||
        (item.to >= iterator.from && item.to <= iterator.to) ||
        (item.from <= iterator.from && item.to >= iterator.to)
    );

    for (let index = 0; index < filterdStyles.length; index++) {
      const findHint = hints?.find(
        (hintItem: Hint) =>
          hintItem.from <= filterdStyles[index].from &&
          hintItem.to >= filterdStyles[index].to
      );

      const visibility = display?.find(
        (hintItem: Hint) =>
          hintItem.from <= filterdStyles[index].from &&
          hintItem.to >= filterdStyles[index].to
      );

      const from =
        filterdStyles[index]?.from < iterator?.from
          ? iterator?.from
          : filterdStyles[index]?.from;
      const to =
        iterator.to < filterdStyles[index]?.to
          ? iterator.to
          : filterdStyles[index].to;

      el.push({
        id: index,
        style: filterdStyles[index],
        hint: findHint || null,
        from: from,
        to: to,
        string: content.substring(from, to),
        visibility: !Boolean(visibility),
      });
    }

    sentences.push({ elements: el });

    sliceContentWithNewLine.push({
      data: sentences,
      lang: iterator.lang,
    });
  }

  return sliceContentWithNewLine;
}
