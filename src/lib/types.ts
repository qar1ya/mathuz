export type ExamType = "DTM" | "Milliy Sertifikat" | "Maktab";

export type Difficulty = "Oson" | "O'rtacha" | "Qiyin";

export type Topic = string;

export interface Question {
  id: string;
  text: string;
  options: string[];
  answer: string;
  solution?: string;
  topic: Topic;
  difficulty: Difficulty;
  examType: ExamType[];
  diagramSvg?: string | null;
}

export interface Lesson {
  id: string;
  title: string;
  topic: Topic;
  duration: string;
  description: string;
  isPremium: boolean;
}

export interface User {
  id: string;
  name: string;
  streak: number;
  coins: number;
  examType: ExamType;
  examDate: string;
  totalAttempted: number;
  accuracy: number;
  isPremium: boolean;
  isTeacher: boolean;
}

export interface StudyTask {
  id: string;
  title: string;
  subject: string;
  duration: string;
  done: boolean;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface Classroom {
  id: string;
  name: string;
  description: string;
  teacher_id: string;
  code: string;
  created_at: string;
}

export interface ClassroomMember {
  id: string;
  classroom_id: string;
  user_id: string;
  role: "teacher" | "student";
  joined_at: string;
}

export interface Assignment {
  id: string;
  classroom_id: string;
  title: string;
  question_ids: string[];
  due_date: string | null;
  created_at: string;
}

export interface Submission {
  id: string;
  assignment_id: string;
  user_id: string;
  answers: Record<string, string>;
  score: number;
  submitted_at: string;
}