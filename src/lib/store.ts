import { SAMPLE_QUESTIONS, SAMPLE_LESSONS } from "./sample-data";
import type { Question, Lesson } from "./types";

const QS_KEY = "mathuz_questions";
const LS_KEY = "mathuz_lessons";

export function getAllQuestions(): Question[] {
  if (typeof window === "undefined") return SAMPLE_QUESTIONS;
  const raw = localStorage.getItem(QS_KEY);
  const custom: Question[] = raw ? JSON.parse(raw) : [];
  return [...SAMPLE_QUESTIONS, ...custom];
}

export function getCustomQuestions(): Question[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(QS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveQuestion(q: Question): void {
  if (typeof window === "undefined") return;
  const raw = localStorage.getItem(QS_KEY);
  const custom: Question[] = raw ? JSON.parse(raw) : [];
  const idx = custom.findIndex((x) => x.id === q.id);
  if (idx >= 0) custom[idx] = q;
  else custom.push(q);
  localStorage.setItem(QS_KEY, JSON.stringify(custom));
}

export function deleteQuestion(id: string): void {
  if (typeof window === "undefined") return;
  const raw = localStorage.getItem(QS_KEY);
  const custom: Question[] = raw ? JSON.parse(raw) : [];
  localStorage.setItem(QS_KEY, JSON.stringify(custom.filter((q) => q.id !== id)));
}

export function getAllLessons(): Lesson[] {
  if (typeof window === "undefined") return SAMPLE_LESSONS;
  const raw = localStorage.getItem(LS_KEY);
  const custom: Lesson[] = raw ? JSON.parse(raw) : [];
  return [...SAMPLE_LESSONS, ...custom];
}

export function saveLesson(l: Lesson): void {
  if (typeof window === "undefined") return;
  const raw = localStorage.getItem(LS_KEY);
  const custom: Lesson[] = raw ? JSON.parse(raw) : [];
  const idx = custom.findIndex((x) => x.id === l.id);
  if (idx >= 0) custom[idx] = l;
  else custom.push(l);
  localStorage.setItem(LS_KEY, JSON.stringify(custom));
}

export function deleteLesson(id: string): void {
  if (typeof window === "undefined") return;
  const raw = localStorage.getItem(LS_KEY);
  const custom: Lesson[] = raw ? JSON.parse(raw) : [];
  localStorage.setItem(LS_KEY, JSON.stringify(custom.filter((l) => l.id !== id)));
}