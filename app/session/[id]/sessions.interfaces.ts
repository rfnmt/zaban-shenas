import { RootQuestionData } from "./components/questions/questions.interfaces";

export interface SessionRoot {
  sessions: Session[];
  questions?: RootQuestionData[];
  tips?: RootTipData[];
}

export interface Session {
  id: number;
  data: Data;
}

export interface Data {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  type: "question_bundle" | "story" | "tip";
  updated_at: string;
  question_ids: number[];
}

export interface Question {
  id: number;
  data: Data2;
}

export interface Data2 {
  id: number;
  prompt: string;
  type: string;
  choices: Choice[];
  acceptable_answers: AcceptableAnswer[];
  resource: Resource;
  damaged_sentence?: DamagedSentence;
  sentence: Sentence[];
  related_tip: any;
  ui_specs: string;
  limitation: string;
  pronunciations: Pronunciation2[];
  updated_at: string;
  explanation?: Explanation;
}

export interface Choice {
  text: string;
  audio?: string;
  image?: string;
}

export interface AcceptableAnswer {
  text: string;
}

export interface Resource {
  transcript?: Transcript;
  main_media?: string;
  slow_audio?: string;
  cover_image?: string;
}

export interface Transcript {
  hints: any[];
  styling: Styling[];
  display: Display[];
  content: string;
  type: string;
}

export interface Styling {
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

export interface Display {
  from: number;
  to: number;
  visibility: boolean;
}

export interface DamagedSentence {
  hints: any[];
  styling: Styling2[];
  display: Display2[];
  content: string;
  type: string;
}

export interface Styling2 {
  from: number;
  to: number;
  attributes: Attributes2;
}

export interface Attributes2 {
  alignment: string;
  direction: string;
  text_color: string;
  font_size: number;
  font_weight: string;
  line_spacing: number;
  font_family: string;
}

export interface Display2 {
  from: number;
  to: number;
  visibility: boolean;
}

export interface Sentence {
  text: Text;
  audio?: string;
}

export interface Text {
  hints: Hint[];
  styling: Styling3[];
  display: any[];
  content: string;
  type: string;
}

export interface Hint {
  table: Table;
  from: number;
  to: number;
  pronunciation: Pronunciation;
}

export interface Table {
  headers: any[];
  rows: Row[][];
}

export interface Row {
  hint: string;
  colspan: number;
}

export interface Pronunciation {
  id: number;
  audio: string;
  word: string;
}

export interface Styling3 {
  from: number;
  to: number;
  attributes: Attributes3;
}

export interface Attributes3 {
  alignment: string;
  direction: string;
  text_color: string;
  font_size: number;
  font_weight: string;
  line_spacing: number;
  font_family: string;
}

export interface Pronunciation2 {
  id: number;
  audio: string;
  word: string;
}

export interface Explanation {
  hints: any[];
  styling: Styling4[];
  display: any[];
  content: string;
  type: string;
}

export interface Styling4 {
  from: number;
  to: number;
  attributes: Attributes4;
}

export interface Attributes4 {
  alignment: string;
  direction: string;
  text_color: string;
  font_size: number;
  font_weight: string;
  line_spacing: number;
  font_family: string;
}
