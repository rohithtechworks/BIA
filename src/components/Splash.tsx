"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, GraduationCap } from "lucide-react";

export function Splash({ onFinish }: { onFinish?: () => void }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      if (onFinish) {
        setTimeout(onFinish, 600);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-950 text-white transition-opacity duration-700 ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Animated glowing bg circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Logo Badge */}
        <div className="relative mb-6">
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl blur-lg opacity-80 animate-tilt" />
          <div className="relative w-24 h-24 rounded-3xl bg-slate-900/90 border border-white/20 flex items-center justify-center shadow-2xl">
            <GraduationCap className="w-12 h-12 text-pink-400 animate-bounce" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300">
          BRILLIANT IAS ACADEMY
        </h1>
        <p className="mt-2 text-lg sm:text-xl font-medium text-purple-200/80 max-w-md">
          Spoken English & Fluency Platform
        </p>

        {/* Loading Indicator */}
        <div className="mt-8 flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-xl">
          <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
          <span className="text-sm font-semibold tracking-wide text-white/90">
            Initializing Learning Engine...
          </span>
        </div>

        {/* Floating Keywords */}
        <div className="mt-12 flex flex-wrap justify-center gap-2 max-w-sm text-xs font-semibold text-purple-300/60">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Relative Circle</span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Personal Circle</span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Fluency Practice</span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Grammar & Tenses</span>
        </div>
      </div>
    </div>
  );
}
