"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson, getModule } from "@/lib/catalog";
import { useAuth } from "@/lib/auth-context";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VideoPlayer } from "@/components/VideoPlayer";
import { AIPracticeChat } from "@/components/AIPracticeChat";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Sparkles,
  ExternalLink,
  Play,
  FileText,
} from "lucide-react";

export default function LessonDetailPage({
  params,
}: {
  params: Promise<{ moduleSlug: string; lessonSlug: string }>;
}) {
  const { moduleSlug, lessonSlug } = use(params);
  const data = getLesson(moduleSlug, lessonSlug);
  const { user, isLoading, isLessonCompleted, toggleLessonCompletion } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900 border border-slate-800 shadow-md">
          <Sparkles className="w-5 h-5 text-pink-500 animate-spin" />
          <span className="font-semibold text-sm">Loading Lesson...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-md mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mx-auto shadow-xl">
            <Sparkles className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-white">Sign In Required</h2>
          <p className="text-slate-400 text-sm">
            Please sign in or create an account to access Brilliant IAS Academy video lessons and AI practice assistant.
          </p>
          <div className="flex items-center gap-3 w-full">
            <Link
              href="/login"
              className="flex-1 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 font-bold text-sm text-center text-white"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 font-bold text-sm text-center text-white shadow-lg"
            >
              Sign Up
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!data) {
    return notFound();
  }

  const { course, lesson } = data;
  const completed = isLessonCompleted(course.slug, lesson.slug);

  // Find prev/next lesson
  const currentIndex = course.lessons.findIndex((l) => l.slug === lesson.slug);
  const prevLesson = currentIndex > 0 ? course.lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < course.lessons.length - 1
      ? course.lessons[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <Link href="/dashboard" className="hover:text-white transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <Link
            href={`/courses/${course.slug}`}
            className="hover:text-white transition-colors"
          >
            {course.title}
          </Link>
          <span>/</span>
          <span className="text-pink-400">{lesson.title}</span>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Video Player & Controls */}
          <div className="lg:col-span-2 space-y-6">
            {lesson.type === "document" && lesson.externalUrl ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white">{lesson.title}</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  This spoken keywords lesson is available as a study notes document. Open the study PDF below to review vocabulary and grammar tables.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <a
                    href={lesson.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-base shadow-xl transition-all"
                  >
                    <span>Open Study PDF Notes</span>
                    <ExternalLink className="w-5 h-5" />
                  </a>

                  <button
                    onClick={() => toggleLessonCompletion(course.slug, lesson.slug)}
                    className={`inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm shadow-xl transition-all ${
                      completed
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{completed ? "Completed" : "Mark Complete"}</span>
                  </button>
                </div>
              </div>
            ) : (
              <VideoPlayer
                src={lesson.src}
                title={lesson.title}
                isCompleted={completed}
                onComplete={() => toggleLessonCompletion(course.slug, lesson.slug)}
              />
            )}

            {/* Lesson Information Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                    {course.title} • Lesson {currentIndex + 1} of {course.lessons.length}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    {lesson.title}
                  </h1>
                </div>

                <button
                  onClick={() => toggleLessonCompletion(course.slug, lesson.slug)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow ${
                    completed
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{completed ? "Lesson Completed" : "Mark as Completed"}</span>
                </button>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                In this video session for <strong className="text-white">{lesson.title}</strong>, observe the sentence structure, vocabulary, tone, and spoken expressions used in real life. Use the AI practice assistant on the right to practice responding aloud!
              </p>
            </div>

            {/* Prev / Next Lesson Buttons */}
            <div className="flex items-center justify-between pt-2">
              {prevLesson ? (
                <Link
                  href={`/lessons/${course.slug}/${prevLesson.slug}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Prev: {prevLesson.title}</span>
                </Link>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <Link
                  href={`/lessons/${course.slug}/${nextLesson.slug}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white text-xs font-bold shadow-lg transition-all"
                >
                  <span>Next: {nextLesson.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  href={`/courses/${course.slug}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Finish Module</span>
                </Link>
              )}
            </div>
          </div>

          {/* Right Column: AI Practice Partner */}
          <div className="space-y-6">
            <AIPracticeChat
              lessonTitle={lesson.title}
              courseTitle={course.title}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
