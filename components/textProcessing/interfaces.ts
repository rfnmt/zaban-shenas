export interface Damagedsentence {
  hints: Hint[];
  styling: Styling[];
  display: Display[];
  content: string;
  type: string;
}

export interface Display {
  from: number;
  to: number;
  visibility: boolean;
}

export interface Styling {
  from: number;
  to: number;
  attributes: Attributes;
}

export type SpliteContentLines = {
  from: number;
  lang: "en" | "fa";
  sentence?: string;
  to: number;
};

export interface ProcessedTextData {
  data: SentenceEntity[];
  lang: string;
}

export interface SentenceEntity {
  from: number;
  to: number;
  string?: string | null;
  visibility?: boolean | null;
  data?: DataBelongVsisibleSlice[] | null;
  style?: Style | null;
  hint?: Hint | null;
  hasSameParent?: boolean;
  align?: null | string;
}

export interface DataBelongVsisibleSlice {
  style: Style;
  hint?: Hint | null;
  from: number;
  to: number;
  string: string;
  hasSameParent?: boolean;
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

export interface Table {
  headers?: (string | null)[] | null;
  rows?: (RowsEntityEntity[] | null)[] | null;
}
export interface RowsEntityEntity {
  hint: string;
  colspan: number;
}

export interface Style {
  from: number;
  to: number;
  attributes: Attributes;
}

export interface Hint {
  table: Table;
  from: number;
  to: number;
  pronunciation?: Pronunciation;
}

export interface Pronunciation {
  id: number;
  audio: string;
  word: string;
}

export interface Row {
  hint: string;
  colspan: number;
}

export interface GenerateDataByStyling {
  display: Display[];
  styling: Styling[];
  hints: Hint[];
  content: string;
  line: SpliteContentLines;
}
