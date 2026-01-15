export interface Subtest {
  id: string;
  name: string;
  description?: string;
}

export interface QuizQuestion {
  question_number: number;
  question_text: string;
  options: string[];
}

export interface QuizSession {
  session_id: string;
  subtest_name: string;
  questions: QuizQuestion[];
  expires_at: string;
}

export interface QuizResult {
  id: string;
  session_id: string;
  subtest_id: string;
  subtest_name: string;
  score: number;
  percentage: number;
  total_questions: number;
  correct_answers: number;
  total_time_seconds: number;
  average_time_per_question: number;
  completed_at: string;
}

export interface QuizHistoryItem {
  session_id: string;
  subtest_name: string;
  score: number;
  percentage: number;
  completed_at: string;
}

export interface QuizHistoryData {
  results: QuizHistoryItem[];
  total_count: number;
  current_page: number;
  total_pages: number;
  limit: number;
}

export interface QuizHistoryResponse {
  success: boolean;
  data: QuizHistoryData;
}
