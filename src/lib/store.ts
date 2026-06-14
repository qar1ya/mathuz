import { supabase } from "./supabase";
import { SAMPLE_QUESTIONS, SAMPLE_LESSONS } from "./sample-data";
import type { Question, Lesson } from "./types";

export async function getAllQuestions(): Promise<Question[]> {
  const { data, error } = await supabase.from("questions").select("*");
  if (error || !data || data.length === 0) return SAMPLE_QUESTIONS;
  return data.map((q) => ({
    id: q.id,
    text: q.text,
    options: q.options,
    answer: q.answer,
    solution: q.solution,
    topic: q.topic,
    difficulty: q.difficulty,
    examType: q.exam_type,
    diagramSvg: q.diagram_svg ?? null,
  }));
}

export async function saveQuestion(q: Question): Promise<void> {
  await supabase.from("questions").upsert({
    id: q.id,
    text: q.text,
    options: q.options,
    answer: q.answer,
    solution: q.solution ?? null,
    topic: q.topic,
    difficulty: q.difficulty,
    exam_type: q.examType,
    diagram_svg: q.diagramSvg ?? null,
  });
}

export async function deleteQuestion(id: string): Promise<void> {
  await supabase.from("questions").delete().eq("id", id);
}

export async function getAllLessons(): Promise<Lesson[]> {
  const { data, error } = await supabase.from("lessons").select("*");
  if (error || !data || data.length === 0) return SAMPLE_LESSONS;
  return data.map((l) => ({
    id: l.id,
    title: l.title,
    topic: l.topic,
    duration: l.duration,
    description: l.description,
    isPremium: l.is_premium,
  }));
}

export async function saveLesson(l: Lesson): Promise<void> {
  await supabase.from("lessons").upsert({
    id: l.id,
    title: l.title,
    topic: l.topic,
    duration: l.duration,
    description: l.description,
    is_premium: l.isPremium,
  });
}

export async function deleteLesson(id: string): Promise<void> {
  await supabase.from("lessons").delete().eq("id", id);
}
