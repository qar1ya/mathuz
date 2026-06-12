"use client";
import { useState, useEffect } from "react";
import { getAllLessons } from "@/lib/store";
import type { Lesson } from "@/lib/types";
import { PlayCircle, Lock, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const TOPIC_COLORS: Record<string, string> = {
  Logarifm: "bg-purple-500/15 text-purple-400",
  Integral: "bg-blue-500/15 text-blue-400",
  Trigonometriya: "bg-orange-500/15 text-orange-400",
  Hosila: "bg-green-500/15 text-green-400",
  Kombinatorika: "bg-pink-500/15 text-pink-400",
  "Ketma-ketlik": "bg-yellow-500/15 text-yellow-400",
};

export default function DarslarPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    getAllLessons().then(setLessons);
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white mb-1">Video Darslar</h1>
        <p className="text-gray-500 text-sm">DTM va Milliy Sertifikat uchun professional darslar</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="bg-dark-card border border-dark-border rounded-xl overflow-hidden hover:border-brand/30 transition-colors group">
            <div className="h-36 bg-dark-hover flex items-center justify-center relative">
              <div className="w-12 h-12 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                <PlayCircle size={22} className="text-brand" />
              </div>
              {lesson.isPremium && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-yellow-500/20 border border-yellow-500/30 px-2 py-0.5 rounded-full">
                  <Lock size={10} className="text-yellow-400" />
                  <span className="text-[10px] text-yellow-400 font-medium">Premium</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded",
                  TOPIC_COLORS[lesson.topic] ?? "bg-gray-500/15 text-gray-400")}>
                  {lesson.topic}
                </span>
              </div>
              <h3 className="text-white text-sm font-semibold mb-1.5">{lesson.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">{lesson.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Clock size={11} />
                  {lesson.duration}
                </div>
                <button className={cn("text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors",
                  lesson.isPremium
                    ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
                    : "bg-brand/10 text-brand hover:bg-brand/20")}>
                  {lesson.isPremium ? "Premium" : "Ko'rish"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}