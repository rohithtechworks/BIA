"use client";

import React, { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, CheckCircle2, RotateCcw, AlertCircle } from "lucide-react";

export function VideoPlayer({
  src,
  title,
  onComplete,
  isCompleted,
}: {
  src?: string;
  title: string;
  onComplete?: () => void;
  isCompleted?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => setHasError(true));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const changeSpeed = (rate: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const toggleFullScreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group">
      {src && !hasError ? (
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src={src}
            className="w-full h-full object-contain"
            controls
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => setHasError(true)}
            onEnded={() => {
              setIsPlaying(false);
              if (onComplete && !isCompleted) {
                onComplete();
              }
            }}
          />
        </div>
      ) : (
        /* Video Fallback Card / Practice Card */
        <div className="aspect-video w-full bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 p-8 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
            <Play className="w-8 h-8 fill-pink-400" />
          </div>

          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <p className="text-sm text-purple-200/80 max-w-md">
            Interactive Spoken English Video Lesson. Practice speaking your response aloud or chat with the AI English Assistant below!
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onComplete}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm shadow-lg transition-all ${
                isCompleted
                  ? "bg-emerald-600 text-white"
                  : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90"
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{isCompleted ? "Completed Lesson" : "Mark as Completed"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Video Speed & Control Bar */}
      {src && !hasError && (
        <div className="bg-slate-900 px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white truncate max-w-[200px]">{title}</span>
            <span className="hidden sm:inline-block text-slate-500">|</span>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-slate-400">Speed:</span>
              {[0.75, 1, 1.25, 1.5].map((rate) => (
                <button
                  key={rate}
                  onClick={() => changeSpeed(rate)}
                  className={`px-2 py-0.5 rounded font-bold transition-colors ${
                    playbackRate === rate
                      ? "bg-pink-500 text-white"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>

          {onComplete && (
            <button
              onClick={onComplete}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isCompleted
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-pink-500 hover:bg-pink-600 text-white shadow"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? "Completed" : "Mark Complete"}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
