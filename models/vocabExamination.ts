import {
  Choice,
  DamagedSentence,
  Resource,
  Sentence,
} from "@/app/session/[id]/sessions.interfaces";

export interface RootVocabExamination {
  debug_info: Debuginfo;
  max_exam_stages: number;
  number_of_questions_for_each_stage: number;
  new_vocab_set: NewVocabSet[];
  vocab_examination: any[];
}
export interface NewVocabSet {
  rank: number;
  id: number;
  prompt: string;
  type: string;
  choices: Choice[];
  acceptable_answers?: Acceptableanswer[];
  resource: Resource;
  damaged_sentence?: DamagedSentence;
  sentence: Sentence[];
  related_tip?: number;
  ui_specs: string;
  limitation: string;
  pronunciations: any[];
  updated_at: string;
  explanation?: Text;
}
export interface Acceptableanswer {
  text: string;
}

export interface Debuginfo {
  min: number;
  max: number;
}
