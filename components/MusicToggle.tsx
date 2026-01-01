"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicToggle() {
  const [on, setOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/winter.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.45;
    }

    const a = audioRef.current;

    if (!a) return;

    if (on) {
      void a.play().catch(() => setOn(false));
    } else {
      a.pause();
      a.currentTime = 0;
    }
  }, [on]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  return (
    <button type="button" className="btn-neaw text-sm" onClick={() => setOn((v) => !v)}>
      {on ? "Music: ON" : "Music: OFF"}
    </button>
  );
}
