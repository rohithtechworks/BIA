"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ModuleCard } from "@/components/ModuleCard";
import { CourseUnlockModal } from "@/components/CourseUnlockModal";
import { modules } from "@/lib/catalog";
import { Logo } from "@/components/Logo";
import {
  Flame,
  CheckCircle2,
  Search,
  Sparkles,
  Lock,
  KeyRound,
} from "lucide-react";

export default function DashboardPage() {
  const { user, isLoading, getOverallProgress, getStreakCount } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);

  const progress = getOverallProgress();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-900 dark:text-white">
        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <Sparkles className="w-5 h-5 text-pink-500 animate-spin" />
          <span className="font-semibold text-sm">Loading Your Learning Dashboard...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-md mx-auto">
          <Logo className="w-20 h-20 shadow-xl" />
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Protected Dashboard</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Please sign in or create an account to access Brilliant IAS Academy course progress.
          </p>
          <div className="flex items-center gap-3 w-full">
            <Link
              href="/login"
              className="flex-1 py-3.5 rounded-2xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 font-bold text-sm text-center text-slate-900 dark:text-white"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 font-bold text-sm text-center text-white shadow-lg"
            >
              Create Account
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const filteredModules = modules.filter((mod) => {
    const matchesSearch =
      mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || mod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* User Greeting Hero Banner */}
        <section className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white rounded-3xl border border-indigo-500/30 p-8 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-xs font-bold text-pink-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Brilliant IAS Student Dashboard</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Welcome back, {user.fullName.split(" ")[0]}!
              </h1>
              <p className="text-purple-200/80 text-sm sm:text-base max-w-xl">
                Keep practicing every day to master natural spoken English across all 11 life circles.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              <div className="flex-1 sm:flex-initial p-4 rounded-2xl bg-slate-950/70 border border-slate-800 backdrop-blur-md min-w-[150px]">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
                  <span>Overall Progress</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-white">
                  {progress.percentage}%
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {progress.completedCount} / {progress.totalCount} Lessons
                </div>
              </div>

              <div className="flex-1 sm:flex-initial p-4 rounded-2xl bg-slate-950/70 border border-slate-800 backdrop-blur-md min-w-[150px]">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
                  <span>Current Streak</span>
                  <Flame className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-amber-300 flex items-center gap-1">
                  {getStreakCount()} Days 🔥
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  Consistent Learning
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-300">
              <span>Overall Platform Completion</span>
              <span className="text-pink-400">{progress.percentage}% Completed</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-950/80 p-0.5 border border-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 transition-all duration-700"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>
        </section>

        {/* Lock Warning Banner if NOT unlocked */}
        {!user.unlocked && (
          <section className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-amber-900 dark:text-amber-200 text-base">Course Password Required</h4>
                <p className="text-xs text-amber-800 dark:text-amber-300/80 mt-0.5">
                  Enter your Brilliant IAS Academy course password to unlock all 11 Circles & video modules. (Default Code: <strong className="underline">BRILLIANT2025</strong>)
                </p>
              </div>
            </div>

            <button
              onClick={() => setUnlockModalOpen(true)}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm shrink-0 shadow-lg transition-all flex items-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Unlock Now</span>
            </button>
          </section>
        )}

        {/* Modules Header & Filter */}
        <section id="modules" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                All 11 Learning Circles
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Select a circle below to view lessons and video content.
              </p>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter courses..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1 text-xs font-bold shadow-sm">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    selectedCategory === "all"
                      ? "bg-pink-500 text-white"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedCategory("conversations")}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    selectedCategory === "conversations"
                      ? "bg-pink-500 text-white"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Circles
                </button>
                <button
                  onClick={() => setSelectedCategory("practice")}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    selectedCategory === "practice"
                      ? "bg-pink-500 text-white"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Practice
                </button>
                <button
                  onClick={() => setSelectedCategory("grammar")}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    selectedCategory === "grammar"
                      ? "bg-pink-500 text-white"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Grammar
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((mod) => (
              <ModuleCard key={mod.slug} module={mod} />
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <CourseUnlockModal
        isOpen={unlockModalOpen}
        onClose={() => setUnlockModalOpen(false)}
      />
    </div>
  );
}
