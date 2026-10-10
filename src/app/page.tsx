"use client";

import React, { useState } from "react";
import { Splash } from "@/components/Splash";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroBanner } from "@/components/HeroBanner";
import { ModuleCard } from "@/components/ModuleCard";
import { AuthModal } from "@/components/AuthModal";
import { modules } from "@/lib/catalog";
import { useAuth } from "@/lib/auth-context";
import { Logo } from "@/components/Logo";
import {
  Sparkles,
  Users,
  ShieldCheck,
  Video,
  Bot,
  Search,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { user } = useAuth();

  const openAuth = (tab: "login" | "signup") => {
    setAuthTab(tab);
    setAuthModalOpen(true);
  };

  const filteredModules = modules.filter((mod) => {
    const matchesSearch =
      mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || mod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {showSplash && <Splash onFinish={() => setShowSplash(false)} />}

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Navbar onOpenAuth={openAuth} />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          {/* Hero Section */}
          <HeroBanner
            onGetStarted={() => {
              if (user) {
                window.location.href = "/dashboard";
              } else {
                openAuth("signup");
              }
            }}
          />

          {/* Features Highlight Bar */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">11 Circles of Life</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  From family & friends to official, bank & business talks.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">80+ Video Lessons</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Step-by-step video tutorials and practical sentence structures.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">AI Practice Partner</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Interactive real-time English conversation assistant on every lesson.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Supabase Powered</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Secure authentication, progress sync, and media storage.
                </p>
              </div>
            </div>
          </section>

          {/* Course Modules Grid */}
          <section id="modules" className="space-y-6 pt-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-xs font-bold text-pink-600 dark:text-pink-400 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Brilliant IAS Curriculum</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  Explore Learning Circles
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Select a module to view lessons, watch videos, and complete practice tasks.
                </p>
              </div>

              {/* Category Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search modules..."
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

            {/* Modules Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map((mod) => (
                <ModuleCard key={mod.slug} module={mod} />
              ))}
            </div>
          </section>

          {/* Bottom Callout Banner */}
          <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-700 p-8 sm:p-12 text-center text-white shadow-2xl">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <Logo className="w-16 h-16 mx-auto shadow-2xl border-2 border-white" />

              <h3 className="text-3xl sm:text-4xl font-black">
                Ready to Speak English with Unshakeable Confidence?
              </h3>
              <p className="text-purple-100 text-base leading-relaxed">
                Join Brilliant IAS Academy today. Track your progress across 80+ structured lessons with Supabase backend security.
              </p>

              <button
                onClick={() => (user ? (window.location.href = "/dashboard") : openAuth("signup"))}
                className="mt-2 inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-base shadow-xl transition-all hover:scale-105"
              >
                <span>{user ? "Go to My Dashboard" : "Sign Up & Start Now"}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </section>
        </main>

        <Footer />

        {/* Modal */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          defaultTab={authTab}
        />
      </div>
    </>
  );
}
