"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Module } from "@/lib/catalog";
import { useAuth } from "@/lib/auth-context";
import { CourseUnlockModal } from "@/components/CourseUnlockModal";
import {
  Users,
  User,
  Briefcase,
  Globe,
  TrendingUp,
  MessagesSquare,
  CircleHelp,
  MessageCircle,
  BookOpen,
  Mic,
  Volume2,
  CheckCircle2,
  ChevronRight,
  Play,
  Lock,
  KeyRound,
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  users: <Users className="w-6 h-6" />,
  user: <User className="w-6 h-6" />,
  briefcase: <Briefcase className="w-6 h-6" />,
  globe: <Globe className="w-6 h-6" />,
  "trending-up": <TrendingUp className="w-6 h-6" />,
  "messages-square": <MessagesSquare className="w-6 h-6" />,
  "circle-help": <CircleHelp className="w-6 h-6" />,
  "message-circle": <MessageCircle className="w-6 h-6" />,
  "book-open": <BookOpen className="w-6 h-6" />,
  mic: <Mic className="w-6 h-6" />,
  "volume-2": <Volume2 className="w-6 h-6" />,
};

export function ModuleCard({ module }: { module: Module }) {
  const { user, completedLessons } = useAuth();
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);

  const isUnlocked = user ? user.unlocked : true; // Public preview or unlocked user

  const totalLessons = module.lessons.length;
  let completedCount = 0;
  module.lessons.forEach((les) => {
    if (completedLessons.has(`${module.slug}:${les.slug}`)) {
      completedCount++;
    }
  });

  const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <>
      <div className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
        {/* Header Accent Gradient */}
        <div className={`h-28 bg-gradient-to-r ${module.accent} p-6 flex items-start justify-between relative overflow-hidden`}>
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-20 text-white">
            {ICON_MAP[module.icon] || <BookOpen className="w-32 h-32" />}
          </div>

          {/* Icon Badge */}
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            {ICON_MAP[module.icon] || <BookOpen className="w-6 h-6" />}
          </div>

          {/* Lesson Count / Lock Badge */}
          {!isUnlocked ? (
            <span className="px-3 py-1 rounded-full bg-red-950/80 backdrop-blur-md text-xs font-bold text-red-200 border border-red-500/40 shadow flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-red-400" /> Locked
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-slate-950/60 backdrop-blur-md text-xs font-bold text-white border border-white/20 shadow">
              {totalLessons} Lessons
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
              {module.title}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
              {module.description}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                {completedCount === totalLessons && totalLessons > 0 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                  </span>
                ) : (
                  `Progress: ${completedCount}/${totalLessons}`
                )}
              </span>
              <span className="text-pink-600 dark:text-pink-400 font-bold">{percent}%</span>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${module.accent} transition-all duration-500`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* Action Link / Unlock Button */}
          {!isUnlocked ? (
            <button
              onClick={() => setUnlockModalOpen(true)}
              className="mt-4 w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95 text-sm font-bold text-white transition-all shadow-md"
            >
              <span className="flex items-center gap-2">
                <KeyRound className="w-4 h-4" />
                Unlock Course Password
              </span>
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          ) : (
            <Link
              href={`/courses/${module.slug}`}
              className="mt-4 w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-slate-100 hover:bg-purple-100 dark:bg-slate-800 dark:hover:bg-purple-600/30 border border-slate-200 dark:border-slate-700/80 text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-purple-700 dark:hover:text-white transition-all group/btn"
            >
              <span className="flex items-center gap-2">
                <Play className="w-4 h-4 text-pink-500 fill-pink-500" />
                {completedCount > 0 ? "Continue Circle" : "Start Module"}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>

      <CourseUnlockModal
        isOpen={unlockModalOpen}
        onClose={() => setUnlockModalOpen(false)}
      />
    </>
  );
}
