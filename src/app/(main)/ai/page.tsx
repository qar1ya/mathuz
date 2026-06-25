"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, Loader2, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { useDailyLimit } from "@/lib/useDailyLimit";
import PremiumGate from "@/components/premium/PremiumGate";

const FREE_LIMIT = 5;

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AiPage() {
  const { user } = useAuth();
  const { remaining, showGate, setShowGate, increment } = useDailyLimit(
    "ai", FREE_LIMIT, user?.isPremium ?? false
  );

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Salom! Men MathUz AI o'qituvchisiman. Matematika bo'yicha savollaringizga javob beraman. Savol bering! 📐",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    if (!increment()) return; // limit tugadi → gate ko'rsatiladi

    const userMsg: Message = { role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);

    // Placeholder for streaming response
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error("API xatosi");

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: accumulated };
          return copy;
        });
      }
    } catch {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Xatolik yuz berdi. Iltimos qayta urinib ko'ring.",
        };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {showGate && (
        <PremiumGate
          title="AI Yordamchi limiti tugadi"
          desc={`Bepul rejimda kuniga ${FREE_LIMIT} ta savol. Premium bilan cheksiz!`}
          onClose={() => setShowGate(false)}
        />
      )}

      {/* Header */}
      <div className="px-6 py-4 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <Bot size={18} className="text-brand" />
          <h1 className="text-white font-bold">AI Yordamchi</h1>
          <span className="text-[10px] bg-brand/15 text-brand px-1.5 py-0.5 rounded font-medium">
            Claude
          </span>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-gray-500 text-xs">Matematika savollaringizni so&apos;rang</p>
          {!user?.isPremium && (
            <span className="text-[10px] text-gray-500">
              {remaining === 0
                ? <span className="text-red-400 flex items-center gap-1"><Crown size={10} /> Limit tugadi</span>
                : `${remaining}/${FREE_LIMIT} qoldi`}
            </span>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}
          >
            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                msg.role === "assistant"
                  ? "bg-brand/20 text-brand"
                  : "bg-dark-hover text-white"
              )}
            >
              {msg.role === "assistant" ? "AI" : "U"}
            </div>
            <div
              className={cn(
                "max-w-md px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap",
                msg.role === "assistant"
                  ? "bg-dark-card border border-dark-border text-gray-200"
                  : "bg-brand text-black font-medium"
              )}
            >
              {msg.content || (
                <Loader2 size={14} className="animate-spin text-brand" />
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-dark-border">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
            placeholder="Savol yozing..."
            disabled={loading}
            className="flex-1 bg-dark-card border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand/50 disabled:opacity-50"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center hover:bg-brand-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={15} className="text-black animate-spin" />
            ) : (
              <Send size={15} className="text-black" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
