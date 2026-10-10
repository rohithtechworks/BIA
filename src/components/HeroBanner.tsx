"use client";

import React from "react";
import { Sparkles, ArrowRight, Play, BookOpen, CheckCircle } from "lucide-react";

export function HeroBanner({
  onGetStarted,
}: {
  onGetStarted?: () => void;
}) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white rounded-3xl border border-indigo-500/30 shadow-2xl p-8 sm:p-12 lg:p-16 my-6">
      {/* Background Animated Glowing Spheres */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000" />

      <div className="relative z-10 max-w-3xl space-y-6">
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold text-pink-300 shadow-inner">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span>Brilliant IAS Academy Spoken English Program</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
          Master Natural English{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300">
            Across Every Circle of Life
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-purple-200/80 leading-relaxed max-w-2xl">
          Designed by Brilliant IAS Academy for students & professionals. Watch step-by-step video lessons, track your progress, and speak with complete confidence.
        </p>

        {/* Key Features Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 bg-white/10 p-2.5 rounded-xl border border-white/15">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>11 Life Circles</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 bg-white/10 p-2.5 rounded-xl border border-white/15">
            <Play className="w-4 h-4 text-pink-400" />
            <span>80+ Video Lessons</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 bg-white/10 p-2.5 rounded-xl border border-white/15">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Spoken Notes & PDFs</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <button
            onClick={onGetStarted}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-base shadow-xl shadow-pink-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <span>Start Free Journey</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <a
            href="#modules"
            className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 backdrop-blur-md transition-all"
          >
            <BookOpen className="w-5 h-5 text-indigo-300" />
            <span>Explore All 11 Circles</span>
          </a>
        </div>
      </div>
    </div>
  );
}
