"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { uploadMedia } from "@/lib/storage";
import {
  User,
  Mail,
  Phone,
  Upload,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  LogOut,
  Flame,
  KeyRound,
  AlertCircle,
  Camera,
} from "lucide-react";

export default function ProfilePage() {
  const { user, updateProfile, logout, getOverallProgress, getStreakCount } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
  const [isUploading, setIsUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const progress = getOverallProgress();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <h2 className="text-2xl font-black text-white">Please Sign In</h2>
          <p className="text-slate-400 text-sm">You need to be logged in to view your profile.</p>
          <Link
            href="/login"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm"
          >
            Go to Login
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadedUrl = await uploadMedia(file, "avatars");
    setIsUploading(false);

    if (uploadedUrl) {
      setAvatarUrl(uploadedUrl);
      await updateProfile({ avatarUrl: uploadedUrl });
      setStatusMsg({ type: "success", text: "Profile avatar updated successfully!" });
    } else {
      setStatusMsg({ type: "error", text: "Failed to upload avatar image." });
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    const res = await updateProfile({
      fullName: fullName.trim(),
      phone: phone.trim(),
    });

    if (res.success) {
      setStatusMsg({ type: "success", text: "Profile information saved successfully!" });
    } else {
      setStatusMsg({ type: "error", text: res.error || "Failed to update profile." });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            My Account & Settings
          </h1>
          <p className="text-sm text-slate-400">
            Manage your personal details, profile picture, and progress
          </p>
        </div>

        {statusMsg && (
          <div
            className={`p-4 rounded-2xl border flex items-center gap-3 text-xs sm:text-sm font-semibold ${
              statusMsg.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : "bg-red-500/10 border-red-500/30 text-red-300"
            }`}
          >
            <Sparkles className="w-5 h-5 shrink-0" />
            <span>{statusMsg.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Avatar & Quick Stats */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-4 shadow-xl">
              {/* Avatar Image / Placeholder */}
              <div className="relative w-28 h-28 mx-auto">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={user.fullName}
                    className="w-28 h-28 rounded-full object-cover border-4 border-pink-500/50 shadow-2xl"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 border-4 border-white/20 flex items-center justify-center font-black text-4xl text-white uppercase shadow-2xl">
                    {user.fullName ? user.fullName[0] : "S"}
                  </div>
                )}

                {/* Upload Overlay Button */}
                <label className="absolute bottom-0 right-0 p-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white cursor-pointer shadow-lg transition-transform hover:scale-110">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <h3 className="text-xl font-black text-white">{user.fullName}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
              </div>

              {isUploading && (
                <p className="text-xs text-pink-400 font-semibold animate-pulse">
                  Uploading avatar to Supabase Storage...
                </p>
              )}

              <div className="pt-2 border-t border-slate-800 space-y-2 text-xs font-semibold text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Completed Lessons</span>
                  <span className="text-pink-400 font-bold">{progress.completedCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Overall Percentage</span>
                  <span className="text-emerald-400 font-bold">{progress.percentage}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Learning Streak</span>
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" /> {getStreakCount()} Days
                  </span>
                </div>
              </div>
            </div>

            {/* Logout Action */}
            <button
              onClick={() => logout()}
              className="w-full py-3.5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of Account</span>
            </button>
          </div>

          {/* Right Column: Edit Profile Form */}
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <User className="w-5 h-5 text-pink-400" />
              <span>Personal Details</span>
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Email Address (Verified)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-400 text-sm cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-pink-500/20 transition-all hover:scale-105"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
