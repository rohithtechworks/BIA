"use client";

import React from "react";
import Link from "next/link";
import { Lesson } from "@/lib/catalog";
import { useAuth } from "@/lib/auth-context";
import { Play, FileText, CheckCircle2, Circle, ExternalLink, Clock } from "lucide-react";

export function LessonCard({
  courseSlug,
  lesson,
  index,
}: {
  courseSlug: string;
  lesson: Lesson;
  index: number;
}) {
  const { isLessonCompleted, toggleLessonCompletion } = useAuth();
  const completed = isLessonCompleted(courseSlug, lesson.slug);

  const isExternalDoc = lesson.type === "document" && lesson.externalUrl;

  return (
    <div
      className={`group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all duration-200 gap-4 shadow-sm ${
        completed
          ? "bg-emerald-50/60 dark:bg-slate-900/60 border-emerald-300 dark:border-emerald-500/30 text-slate-700 dark:text-slate-300"
          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-500/40 text-slate-900 dark:text-white"
      }`}
    >
      <div className="flex items-center gap-4 flex-1">
        {/* Index or Status Icon */}
        <button
          onClick={() => toggleLessonCompletion(courseSlug, lesson.slug)}
          title={completed ? "Mark as incomplete" : "Mark as completed"}
          className="focus:outline-none transition-transform active:scale-95"
        >
          {completed ? (
            <CheckCircle2 className="w-7 h-7 text-emerald-500 fill-emerald-500/20" />
          ) : (
            <Circle className="w-7 h-7 text-slate-400 dark:text-slate-600 group-hover:text-pink-500 transition-colors" />
          )}
        </button>

        {/* Lesson Info */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
              Lesson {index + 1}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {lesson.type === "document" ? (
                <>
                  <FileText className="w-3 h-3 text-amber-500" /> Document
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-pink-500 fill-pink-500" /> Video
                </>
              )}
            </span>
          </div>

          <h4
            className={`font-bold text-base sm:text-lg ${
              completed
                ? "line-through text-slate-400 dark:text-slate-500"
                : "text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-300"
            }`}
          >
            {lesson.title}
          </h4>

          {lesson.duration && (
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>{lesson.duration}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        {isExternalDoc ? (
          <a
            href={lesson.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-xs sm:text-sm border border-amber-500/30 transition-all"
          >
            <span>Open Study PDF</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <Link
            href={`/lessons/${courseSlug}/${lesson.slug}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Watch Lesson</span>
          </Link>
        )}
      </div>
    </div>
  );
}
