"use client";
import { useState } from "react";
import type { ChatMessage } from "@/lib/types";
import { Send, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_REPLIES = [
  "Ajoyib savol! Bu masalani quyidagicha yechish mumkin...",
  "Logarifm haqida gapiradigan bo'lsak, uning asosiy xossasi shundaki...",
  "Integralni hisoblash uchun Newton-Leybnits formulasidan foydalanamiz.",
  "Bu trigonometrik tenglamani yechish uchun sin va cos formulalarini qo'llaymiz.",
  "Hosilani topish qoidasi: (x^n)' = n·x^(n-1)",
];

export default function AiPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Salom! Men MathUz AI yordamchisiman. Matematika bo'yicha savollaringizga javob beraman." },
  ]);
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: "user", content: input };
    const botMsg: ChatMessage = {
      role: "assistant",
      content: MOCK_REPLIES[Math.floor(Math.random() * MOCK_REPLIES.length)],
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <Bot size={18} className="text-brand" />
          <h1 className="text-white font-bold">AI Yordamchi</h1>
        </div>
        <p className="text-gray-500 text-xs mt-0.5">Matematika savollaringizni so&apos;rang</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}>
            <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
              msg.role === "assistant" ? "bg-brand/20 text-brand" : "bg-dark-hover text-white")}>
              {msg.role === "assistant" ? "AI" : "U"}
            </div>
            <div className={cn("max-w-md px-4 py-2.5 rounded-2xl text-sm",
              msg.role === "assistant"
                ? "bg-dark-card border border-dark-border text-gray-200"
                : "bg-brand text-black font-medium")}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-dark-border">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Savol yozing..."
            className="flex-1 bg-dark-card border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand/50"
          />
          <button onClick={send}
            className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center hover:bg-brand-dark transition-colors">
            <Send size={16} className="text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}