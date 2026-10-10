"use client";

import React from "react";

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center rounded-full overflow-hidden shrink-0 border-2 border-slate-900 bg-white shadow-md ${className}`}>
      <img
        src="/logo.svg"
        alt="Brilliant IAS Academy Mahatma Gandhi Logo"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
