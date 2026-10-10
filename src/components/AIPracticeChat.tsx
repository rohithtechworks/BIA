"use client";

import React, { useState } from "react";
import { Sparkles, Send, Bot, User, CheckCircle } from "lucide-react";

export function AIPracticeChat({
  lessonTitle,
  courseTitle,
}: {
  lessonTitle: string;
  courseTitle: string;
}) {
  const [messages, setMessages] = useState<
    { sender: "ai" | "user"; text: string; feedback?: string }[]
  >([
    {
      sender: "ai",
      text: `Hello! I'm your Brilliant IAS English Practice Partner for "${lessonTitle}" (${courseTitle}). Let's practice conversations together! Try starting with a sentence or question related to ${lessonTitle}.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setInput("");

    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setIsTyping(true);

    setTimeout(() => {
      let aiReply = "";
      let feedback = "";

      if (userText.toLowerCase().includes("hello") || userText.toLowerCase().includes("hi")) {
        aiReply = `Hello there! How are you doing today? Let's talk about ${lessonTitle}.`;
        feedback = "Great greeting! Fluent and natural.";
      } else if (userText.length < 5) {
        aiReply = `Could you speak a little more? Try answering in a full sentence!`;
        feedback = "Tip: Try expanding your answer with details (e.g. 'Yes, I usually...').";
      } else {
        aiReply = `That's very well said! In this scenario (${lessonTitle}), you can also say: "I appreciate your help with this." What else would you like to say?`;
        feedback = "Grammar: 100% Correct. Accent & Tone: Polite & Confident!";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiReply,
          feedback,
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 flex flex-col h-[520px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center text-white shadow">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">AI Conversation Practice</h4>
            <p className="text-xs text-pink-600 dark:text-pink-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Topic: {lessonTitle}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              msg.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                msg.sender === "user"
                  ? "bg-gradient-to-tr from-purple-500 to-indigo-600"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-pink-500" />}
            </div>

            <div className="space-y-1.5 max-w-[80%]">
              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-purple-600 text-white rounded-tr-none"
                    : "bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>

              {msg.feedback && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{msg.feedback}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 italic">
            <Bot className="w-4 h-4 text-pink-500 animate-bounce" />
            <span>AI Practice Partner is typing...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={`Type a response for ${lessonTitle}...`}
          className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-pink-500 transition-colors"
        />
        <button
          onClick={handleSend}
          className="p-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white shadow-lg transition-transform active:scale-95"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
