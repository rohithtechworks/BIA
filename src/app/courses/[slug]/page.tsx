"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getModule } from "@/lib/catalog";
import { useAuth } from "@/lib/auth-context";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LessonCard } from "@/components/LessonCard";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Play,
  FileText,
} from "lucide-react";

export default function CourseDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const module = getModule(slug);
  const { user, isLoading, isLessonCompleted, completedLessons } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900 border border-slate-800 shadow-md">
          <Sparkles className="w-5 h-5 text-pink-500 animate-spin" />
          <span className="font-semibold text-sm">Loading Course Details...</span>
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
            Please sign in or create an account to access Brilliant IAS Academy modules and video lessons.
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

  if (!module) {
    return notFound();
  }

  const totalLessons = module.lessons.length;
  let completedCount = 0;
  module.lessons.forEach((les) => {
    if (isLessonCompleted(module.slug, les.slug)) {
      completedCount++;
    }
  });

  const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Back Button */}
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-bold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Course Banner Header */}
        <section
          className={`relative rounded-3xl overflow-hidden bg-gradient-to-r ${module.accent} p-8 sm:p-12 text-white shadow-2xl`}
        >
          <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-15 pointer-events-none">
            <BookOpen className="w-96 h-96" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Circle Module</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              {module.title}
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed">
              {module.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="px-4 py-2 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 text-xs font-bold">
                {totalLessons} Lessons
              </div>
              <div className="px-4 py-2 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>{completedCount} Completed ({percentage}%)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Lessons List Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-white tracking-tight">
              Lessons & Video Tutorials
            </h2>
            <span className="text-xs font-bold text-slate-400">
              Click any lesson to watch video & practice
            </span>
          </div>

          <div className="space-y-3">
            {module.lessons.map((lesson, idx) => (
              <LessonCard
                key={lesson.slug}
                courseSlug={module.slug}
                lesson={lesson}
                index={idx}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
