export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty?: Difficulty;
}

export interface ModuleData {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

// Used for listing modules in the MK view (lighter payload)
export interface ModuleSummary {
  id: string;
  title: string;
}

export interface MK {
  code: string;
  title: string;
  description?: string;
  modules: ModuleSummary[];
}

export interface ExamHistoryItem {
  mkCode: string;
  modulId: string;
  modulTitle: string;
  score: number;
  total: number;
  date: string; // ISO string format
}