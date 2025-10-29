export type DifficultyLevel = 'student' | 'junior' | 'mid' | 'expert' | 'senior' | 'master' | 'legendary';

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  codeSnippet?: string;
  difficulty: DifficultyLevel;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  coinsEarned: number;
  level: DifficultyLevel;
   streak?: number; // ← ضيف السطر ده
}
