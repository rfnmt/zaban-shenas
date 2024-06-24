interface RootTipData {
  id: number;
  data: data;
}

interface data {
  title: string;
  updated_at: string;
  content_body: Contentbody[];
}

interface Contentbody {
  image?: string;
  title?: string;
  description?: string;
  type:
    | "header"
    | "space"
    | "text"
    | "table"
    | "seperator"
    | "media"
    | "example"
    | "dialogue";
  length?: number;
  background?: Background;
  hints?: (Hint | Hints2)[];
  styling?: Styling[];
  display?: Display[];
  content?: string;
  cells?: Cell[][];
  hasShadedHeader?: boolean;
  media?: string;
  cover?: string;
  text?: Text;
  audio?: string;
  dialogue_line?: Dialogueline[];
}

interface Dialogueline {
  character?: any;
  audio?: string;
  text: Text2;
}

interface Text2 {
  hints: (Hint2 | Hints2)[];
  styling: Styling[];
  display: Display[];
  content: string;
}

interface Hint2 {
  table: Table3;
  from: number;
  to: number;
}

interface Table3 {
  headers: string[];
  rows: Row3[][];
}

interface Row3 {
  hint: string;
  colspan: string;
}

interface Text {
  hints: Hints2[];
  styling: Styling[];
  display: Display[];
  content: string;
  type: string;
}

interface Cell {
  hints: any[];
  styling: Styling[];
  display: Display[];
  content: string;
  type: string;
}

interface Display {
  from: number;
  to: number;
  visibility: boolean;
}

interface Styling {
  from: number;
  to: number;
  attributes: Attributes;
}

interface Attributes {
  alignment: string;
  direction: string;
  text_color: string;
  font_size: number;
  font_weight: string;
  line_spacing: number;
  font_family: string;
}

interface Hints2 {
  table: Table2;
  from: number;
  to: number;
}

interface Table2 {
  headers: string[];
  rows: Row2[][];
}

interface Row2 {
  hint: string;
  colspan: number | string;
}

interface Hint {
  table: Table;
  from: number;
  to: number;
}

interface Table {
  headers: any[];
  rows: Row[][];
}

interface Row {
  hint: string;
  colspan: number;
}

interface Background {
  color?: string;
}
