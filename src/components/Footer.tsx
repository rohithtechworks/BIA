import React from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Heart, Sparkles, ShieldCheck, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-slate-900 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-3">
            <Logo className="w-10 h-10" />
            <span className="text-xl font-black tracking-tight text-white">
              Brilliant IAS Academy
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Empowering IAS aspirants, students, and professionals to speak natural, fluent English in every circle of life.
          </p>
          <div className="flex items-center gap-2 text-xs text-pink-400 font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Interactive Platform Powered by Supabase</span>
          </div>
        </div>

        {/* Circles */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Learning Circles</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/courses/relatives" className="hover:text-pink-400 transition-colors">
                Relative Circle
              </Link>
            </li>
            <li>
              <Link href="/courses/personal" className="hover:text-pink-400 transition-colors">
                Personal Circle
              </Link>
            </li>
            <li>
              <Link href="/courses/official" className="hover:text-pink-400 transition-colors">
                Official Circle
              </Link>
            </li>
            <li>
              <Link href="/courses/public" className="hover:text-pink-400 transition-colors">
                Public Circle
              </Link>
            </li>
            <li>
              <Link href="/courses/business" className="hover:text-pink-400 transition-colors">
                Business Circle
              </Link>
            </li>
          </ul>
        </div>

        {/* Practice & Grammar */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Practice & Modules</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/courses/fluency" className="hover:text-indigo-400 transition-colors">
                Fluency Practice
              </Link>
            </li>
            <li>
              <Link href="/courses/question" className="hover:text-indigo-400 transition-colors">
                Question Practice
              </Link>
            </li>
            <li>
              <Link href="/courses/answer" className="hover:text-indigo-400 transition-colors">
                Answer Practice
              </Link>
            </li>
            <li>
              <Link href="/courses/grammar" className="hover:text-indigo-400 transition-colors">
                Grammar & Tenses
              </Link>
            </li>
            <li>
              <Link href="/courses/pronunciation" className="hover:text-indigo-400 transition-colors">
                Pronunciation Guide
              </Link>
            </li>
          </ul>
        </div>

        {/* Security & Contact */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Platform Security</h4>
          <div className="space-y-2 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Protected Routes & Supabase RLS</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-pink-400" />
              <span>info@brilliantiasacademy.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} Brilliant IAS Academy. All rights reserved.</p>
      </div>
    </footer>
  );
}
