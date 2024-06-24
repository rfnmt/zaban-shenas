export interface RootQuestionData {
  id: number;
  data: IQuestionData;
  rank?: number;
  passed: boolean;
  skipped: boolean;
  flawlessPassed?: boolean;
  wrongCounter?: number;
  gainedXp?: number;
}

export interface IQuestionData {
  id: number;
  prompt: string;
  pairs: Pair[];
  type: string;
  rank?: number;
  related_tip?: any;
  ui_specs?: any;
  meaning?: any;
  limitation: string;
  character?: any;
  updated_at: string;
  explanation?: any;
  choices: Choices[];
  acceptable_answers: Acceptableanswer[];
  resource: Resource;
  damaged_sentence: Damagedsentence;
  sentence: Sentence[];
  pronunciations: any[];
}

export interface Choices {
  id: number;
  text: string;
  audio: string;
  image?: string;
  correct_choice?: boolean | undefined | null;
}

interface Sentence {
  text: Transcript;
  audio?: any;
}

interface Damagedsentence {
  hints: Hint[];
  styling: Styling[];
  display: Display[];
  content: string;
  type: string;
}

export interface Hint {
  table: Table;
  from: number;
  to: number;
  pronunciation: Pronunciation;
}

export interface Pronunciation {
  id: number;
  audio: string;
  word: string;
}

export interface Table {
  headers: any[];
  rows: Array<Row[]>;
}

export interface Row {
  hint: string;
  colspan: number;
}

interface Display {
  from: number;
  to: number;
  visibility: boolean;
}

interface Resource {
  transcript: Transcript;
  main_media?: any;
  slow_audio?: any;
  cover_image: string;
}

interface Transcript {
  hints: any[];
  styling: Styling[];
  display: any[];
  content: string;
  type: string;
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

interface Acceptableanswer {
  text: string;
}

export interface Pair {
  learning_word: string;
  translation: string;
  tts: string;
}
