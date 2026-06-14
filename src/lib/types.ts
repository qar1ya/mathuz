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