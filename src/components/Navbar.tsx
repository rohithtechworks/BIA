"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Logo } from "@/components/Logo";
import {
  BookOpen,
  User as UserIcon,
  LogOut,
  Flame,
  CheckCircle2,
  Menu,
  X,
  Sun,
  Moon,
  LayoutDashboard,
} from "lucide-react";

export function Navbar({ onOpenAuth }: { onOpenAuth?: (tab: "login" | "signup") => void }) {
  const { user, logout, getOverallProgress, getStreakCount, theme, toggleTheme } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const progress = getOverallProgress();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 border-b border-slate-200 text-slate-900 dark:bg-slate-900/90 dark:border-slate-800 dark:text-white transition-colors duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Logo className="w-10 h-10 group-hover:scale-105 transition-transform" />
          <div>
            <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 dark:from-pink-400 dark:via-purple-300 dark:to-indigo-200">
              Brilliant IAS Academy
            </span>
            <span className="hidden sm:block text-[10px] uppercase tracking-widest font-bold text-pink-600 dark:text-pink-400 -mt-1">
              Spoken English & Learning
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 font-medium text-sm">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  pathname === "/dashboard"
                    ? "bg-purple-100 text-purple-700 font-semibold dark:bg-purple-600/30 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60"
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-pink-500" />
                Dashboard
              </Link>
              <Link
                href="/dashboard#modules"
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60"
              >
                <BookOpen className="w-4 h-4 text-indigo-500" />
                All Circles
              </Link>
              <Link
                href="/profile"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  pathname === "/profile"
                    ? "bg-purple-100 text-purple-700 font-semibold dark:bg-purple-600/30 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60"
                }`}
              >
                <UserIcon className="w-4 h-4 text-emerald-500" />
                Profile
              </Link>
            </>
          ) : (
            <Link
              href="/#modules"
              className="px-3 py-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
            >
              Explore Circles
            </Link>
          )}
        </nav>

        {/* Right Section: Theme Toggle + User Stats & Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-amber-300 border border-slate-200 dark:border-slate-700 transition-all focus:outline-none"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-indigo-600" />
            ) : (
              <Sun className="w-5 h-5 text-amber-400" />
            )}
          </button>

          {user ? (
            <>
              {/* Progress Pill */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="font-semibold">
                  {progress.completedCount}/{progress.totalCount}
                </span>
                <span className="text-slate-400">({progress.percentage}%)</span>
              </div>

              {/* Streak Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-600 dark:text-amber-300">
                <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
                <span>{getStreakCount()} Day Streak</span>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenAuth ? onOpenAuth("login") : (window.location.href = "/login")}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => onOpenAuth ? onOpenAuth("signup") : (window.location.href = "/signup")}
                className="px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:opacity-90 text-white shadow-md shadow-pink-500/20 transition-all hover:scale-105"
              >
                Get Started
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu & Theme toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-amber-300 border border-slate-200 dark:border-slate-700"
          >
            {theme === "light" ? <Moon className="w-5 h-5 text-indigo-600" /> : <Sun className="w-5 h-5 text-amber-400" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3">
          {user ? (
            <>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 mb-3">
                <p className="font-bold text-slate-900 dark:text-white text-base">{user.fullName}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                  <span>Progress: {progress.completedCount}/{progress.totalCount} ({progress.percentage}%)</span>
                  <span className="text-amber-500 font-bold flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" /> {getStreakCount()} Streak
                  </span>
                </div>
              </div>

              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
              >
                <LayoutDashboard className="w-5 h-5 text-pink-500" />
                Dashboard
              </Link>
              <Link
                href="/dashboard#modules"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
              >
                <BookOpen className="w-5 h-5 text-indigo-500" />
                All Circles
              </Link>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
              >
                <UserIcon className="w-5 h-5 text-emerald-500" />
                Profile Settings
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 font-medium text-left"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth ? onOpenAuth("login") : (window.location.href = "/login");
                }}
                className="w-full py-2.5 rounded-xl text-center font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth ? onOpenAuth("signup") : (window.location.href = "/signup");
                }}
                className="w-full py-2.5 rounded-xl text-center font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white shadow"
              >
                Create Free Account
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
