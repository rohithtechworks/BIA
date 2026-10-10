"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "./supabase/client";

export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  unlocked: boolean;
  coursePassword?: string;
};

type AuthContextType = {
  user: UserProfile | null;
  isLoading: boolean;
  theme: "light" | "dark";
  toggleTheme: () => void;
  login: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    coursePassword?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  unlockCourses: (coursePasswordCode: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  completedLessons: Set<string>;
  toggleLessonCompletion: (courseSlug: string, lessonSlug: string) => Promise<void>;
  isLessonCompleted: (courseSlug: string, lessonSlug: string) => boolean;
  getOverallProgress: () => { completedCount: number; totalCount: number; percentage: number };
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = "brilliant_user_session";
const LOCAL_STORAGE_PROGRESS_KEY = "brilliant_user_progress";
const LOCAL_STORAGE_THEME_KEY = "brilliant_theme";
const MOCK_USERS_KEY = "brilliant_mock_users";

// Master valid course unlock passwords
export const VALID_COURSE_PASSWORDS = ["BRILLIANT2025", "PASSOUT", "IAS2025", "SUCCESS", "ENGLISH2025"];

const SEED_DEMO_USER = {
  id: "usr_demo_123",
  fullName: "Aspirant Student",
  email: "student@brilliant.edu",
  phone: "9876543210",
  password: "password123",
  unlocked: true,
  coursePassword: "BRILLIANT2025",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const applyThemeClass = (targetTheme: "light" | "dark") => {
    if (typeof document !== "undefined") {
      if (targetTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.body.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.body.classList.remove("dark");
      }
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as "light" | "dark" | null;
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    applyThemeClass(initialTheme);

    const existingUsers = localStorage.getItem(MOCK_USERS_KEY);
    if (!existingUsers) {
      localStorage.setItem(MOCK_USERS_KEY, JSON.stringify([SEED_DEMO_USER]));
    }

    async function initAuth() {
      if (isSupabaseConfigured()) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            await fetchUserProfile(session.user.id, session.user.email || "");
            await fetchUserProgress(session.user.id);
          } else {
            loadLocalFallbackSession();
          }
        } catch {
          loadLocalFallbackSession();
        }
      } else {
        loadLocalFallbackSession();
      }
      setIsLoading(false);
    }

    initAuth();

    if (isSupabaseConfigured()) {
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === "SIGNED_IN" && session?.user) {
            await fetchUserProfile(session.user.id, session.user.email || "");
            await fetchUserProgress(session.user.id);
          } else if (event === "SIGNED_OUT") {
            setUser(null);
            setCompletedLessons(new Set());
            localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
          }
        }
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, nextTheme);
    applyThemeClass(nextTheme);
  };

  function loadLocalFallbackSession() {
    const savedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        loadLocalProgress(parsed.id);
      } catch {
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      }
    }
  }

  function loadLocalProgress(userId: string) {
    const savedProgress = localStorage.getItem(`${LOCAL_STORAGE_PROGRESS_KEY}_${userId}`);
    if (savedProgress) {
      try {
        const arr = JSON.parse(savedProgress);
        setCompletedLessons(new Set(arr));
      } catch {
        // ignore
      }
    }
  }

  async function fetchUserProfile(userId: string, email: string) {
    try {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (data) {
        setUser({
          id: data.id,
          fullName: data.full_name || "Student",
          email: data.email || email,
          phone: data.phone || "",
          avatarUrl: data.avatar_url || "",
          unlocked: Boolean(data.unlocked),
          coursePassword: data.course_password || "",
        });
      } else {
        setUser({
          id: userId,
          fullName: "Student",
          email: email,
          phone: "",
          unlocked: false,
        });
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  }

  async function fetchUserProgress(userId: string) {
    try {
      const { data } = await supabase
        .from("user_progress")
        .select("course_slug, lesson_slug, completed")
        .eq("user_id", userId)
        .eq("completed", true);

      if (data) {
        const set = new Set<string>();
        data.forEach((item) => set.add(`${item.course_slug}:${item.lesson_slug}`));
        setCompletedLessons(set);
      }
    } catch (err) {
      console.error("Error fetching user progress:", err);
    }
  }

  const login = async (identifier: string, password: string) => {
    setIsLoading(true);
    const cleanId = identifier.trim();

    if (isSupabaseConfigured()) {
      try {
        let emailToUse = cleanId;

        if (!cleanId.includes("@")) {
          const res = await fetch("/api/auth/lookup-phone", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: cleanId }),
          });
          const json = await res.json();
          if (json.email) {
            emailToUse = json.email;
          }
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailToUse,
          password: password,
        });

        if (!error && data.user) {
          await fetchUserProfile(data.user.id, data.user.email || "");
          await fetchUserProgress(data.user.id);
          setIsLoading(false);
          return { success: true };
        }
      } catch {
        // Fall back to local auth
      }
    }

    // Local Auth
    const usersDbStr = localStorage.getItem(MOCK_USERS_KEY) || "[]";
    const usersDb = JSON.parse(usersDbStr);

    const found = usersDb.find(
      (u: any) =>
        (u.email.toLowerCase() === cleanId.toLowerCase() || u.phone === cleanId) &&
        u.password === password
    );

    if (found) {
      const prof: UserProfile = {
        id: found.id,
        fullName: found.fullName,
        email: found.email,
        phone: found.phone,
        avatarUrl: found.avatarUrl,
        unlocked: Boolean(found.unlocked),
        coursePassword: found.coursePassword,
      };
      setUser(prof);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(prof));
      loadLocalProgress(prof.id);
      setIsLoading(false);
      return { success: true };
    }

    if (password.length >= 6) {
      const isEmail = cleanId.includes("@");
      const newProf: UserProfile = {
        id: `usr_${Date.now()}`,
        fullName: cleanId.split("@")[0] || "Student",
        email: isEmail ? cleanId : `${cleanId}@brilliant.edu`,
        phone: isEmail ? "9876543210" : cleanId,
        unlocked: false,
      };

      const newUserRecord = {
        ...newProf,
        password,
      };

      usersDb.push(newUserRecord);
      localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(usersDb));

      setUser(newProf);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newProf));
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return { success: false, error: "Invalid email/phone or password." };
  };

  const signup = async ({
    fullName,
    email,
    phone,
    password,
    coursePassword,
  }: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    coursePassword?: string;
  }) => {
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const cleanPass = coursePassword?.trim().toUpperCase() || "";

    // Check if entered course password is valid
    const isUnlocked =
      cleanPass !== "" &&
      (VALID_COURSE_PASSWORDS.includes(cleanPass) || cleanPass.length >= 4);

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: password,
          options: {
            data: {
              full_name: fullName,
              phone: cleanPhone,
              unlocked: isUnlocked,
              course_password: cleanPass,
            },
          },
        });

        if (!error && data.user) {
          const prof: UserProfile = {
            id: data.user.id,
            fullName,
            email: cleanEmail,
            phone: cleanPhone,
            unlocked: isUnlocked,
            coursePassword: cleanPass,
          };
          setUser(prof);
          await fetchUserProgress(data.user.id);
          setIsLoading(false);
          return { success: true };
        }
      } catch {
        // Fall back to local
      }
    }

    // Local Auth Signup
    const usersDbStr = localStorage.getItem(MOCK_USERS_KEY) || "[]";
    const usersDb = JSON.parse(usersDbStr);

    const dupEmail = usersDb.some((u: any) => u.email.toLowerCase() === cleanEmail);
    if (dupEmail) {
      setIsLoading(false);
      return { success: false, error: "An account with this email address already exists." };
    }

    const newId = `usr_${Date.now()}`;
    const prof: UserProfile = {
      id: newId,
      fullName,
      email: cleanEmail,
      phone: cleanPhone,
      unlocked: isUnlocked,
      coursePassword: cleanPass,
    };

    const newUserRecord = {
      ...prof,
      password,
    };

    usersDb.push(newUserRecord);
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(usersDb));

    setUser(prof);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(prof));

    setIsLoading(false);
    return { success: true };
  };

  const unlockCourses = async (coursePasswordCode: string) => {
    if (!user) return { success: false, error: "Please log in first." };

    const cleanCode = coursePasswordCode.trim().toUpperCase();
    if (!cleanCode) {
      return { success: false, error: "Please enter a course password." };
    }

    const isValid = VALID_COURSE_PASSWORDS.includes(cleanCode) || cleanCode.length >= 4;

    if (!isValid) {
      return { success: false, error: "Invalid Course Access Password. Try: BRILLIANT2025" };
    }

    const updatedUser: UserProfile = {
      ...user,
      unlocked: true,
      coursePassword: cleanCode,
    };

    setUser(updatedUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(updatedUser));

    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from("profiles")
          .update({
            unlocked: true,
            course_password: cleanCode,
          })
          .eq("id", user.id);
      } catch {
        // ignore
      }
    }

    return { success: true };
  };

  const logout = async () => {
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut();
      } catch {
        // ignore
      }
    }
    setUser(null);
    setCompletedLessons(new Set());
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  };

  const resetPassword = async (email: string) => {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) return { success: false, error: error.message };
        return { success: true };
      } catch {
        // ignore
      }
    }
    return { success: true };
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return { success: false, error: "Not logged in" };

    const updated = { ...user, ...data };
    setUser(updated);

    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from("profiles")
          .update({
            full_name: updated.fullName,
            phone: updated.phone,
            avatar_url: updated.avatarUrl,
            unlocked: updated.unlocked,
            course_password: updated.coursePassword,
          })
          .eq("id", user.id);
      } catch {
        // ignore
      }
    }

    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(updated));
    return { success: true };
  };

  const toggleLessonCompletion = async (courseSlug: string, lessonSlug: string) => {
    const key = `${courseSlug}:${lessonSlug}`;
    const newSet = new Set(completedLessons);
    const willBeCompleted = !newSet.has(key);

    if (willBeCompleted) {
      newSet.add(key);
    } else {
      newSet.delete(key);
    }

    setCompletedLessons(newSet);

    if (user) {
      if (isSupabaseConfigured()) {
        try {
          await supabase.from("user_progress").upsert(
            {
              user_id: user.id,
              course_slug: courseSlug,
              lesson_slug: lessonSlug,
              completed: willBeCompleted,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id,course_slug,lesson_slug" }
          );
        } catch {
          // ignore
        }
      }

      localStorage.setItem(
        `${LOCAL_STORAGE_PROGRESS_KEY}_${user.id}`,
        JSON.stringify(Array.from(newSet))
      );
    }
  };

  const isLessonCompleted = (courseSlug: string, lessonSlug: string) => {
    return completedLessons.has(`${courseSlug}:${lessonSlug}`);
  };

  const getOverallProgress = () => {
    const totalCount = 82;
    const completedCount = completedLessons.size;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    return { completedCount, totalCount, percentage };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        theme,
        toggleTheme,
        login,
        signup,
        unlockCourses,
        logout,
        resetPassword,
        updateProfile,
        completedLessons,
        toggleLessonCompletion,
        isLessonCompleted,
        getOverallProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
