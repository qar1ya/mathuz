import { supabase } from "./supabase";
import { SAMPLE_QUESTIONS, SAMPLE_LESSONS } from "./sample-data";
import type { Question, Lesson } from "./types";

function mapQ(q: Record<string, unknown>): Question {
  return {
    id: q.id as string,
    text: q.text as string,
    options: q.options as string[],
    answer: q.answer as string,
    solution: q.solution as string,
    topic: q.topic as string,
    difficulty: q.difficulty as Question["difficulty"],
    examType: q.exam_type as Question["examType"],
    diagramSvg: (q.diagram_svg as string) ?? null,
  };
}

// Fetch all questions with automatic pagination (handles > 1000 rows)
export async function getAllQuestions(): Promise<Question[]> {
  const all: Question[] = [];
  const PAGE = 1000;
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .range(from, from + PAGE - 1);

    if (error || !data || data.length === 0) break;
    all.push(...data.map(mapQ));
    if (data.length < PAGE) break;
    from += PAGE;
  }

  return all.length > 0 ? all : SAMPLE_QUESTIONS;
}

// Fetch questions for a specific topic only (faster for topic-based views)
export async function getQuestionsByTopic(topic: string): Promise<Question[]> {
  const all: Question[] = [];
  const PAGE = 1000;
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .eq("topic", topic)
      .range(from, from + PAGE - 1);

    if (error || !data || data.length === 0) break;
    all.push(...data.map(mapQ));
    if (data.length < PAGE) break;
    from += PAGE;
  }

  return all;
}

// Count questions per topic
export async function getTopicCounts(): Promise<Record<string, number>> {
  const { data } = await supabase
    .from("questions")
    .select("topic")
    .range(0, 4999);

  const counts: Record<string, number> = {};
  data?.forEach((r) => {
    counts[r.topic] = (counts[r.topic] ?? 0) + 1;
  });
  return counts;
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
    id: l.id as string,
    title: l.title as string,
    topic: l.topic as string,
    duration: l.duration as string,
    description: l.description as string,
    isPremium: l.is_premium as boolean,
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
