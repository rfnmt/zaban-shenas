export interface RootOnboarding {
  id: number;
  title: string;
  slug: string;
  data: Data[];
}

export interface Data {
  content_type: string;
  id: number;
  title: string;
  slug?: string;
  type?: string;
  button_arrangement?: string;
  continue_button_label?: string;
  shuffle?: boolean;
  description?: string;
  header: string;
  choices?: Choice[];
  level?: Level[];
  image?: any;
}

export interface Level {
  id: number;
  title: string;
  description?: any;
  self_evaluation: number;
  image: string;
  course?: number;
}

export interface Choice {
  id: number;
  label: string;
  slug: string;
  icon: string;
}
