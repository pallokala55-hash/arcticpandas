"use client";

import { useEffect, useRef } from "react";

type SearchBoxProps = {
  size?: "nav" | "hero";
  placeholder?: string;
};

/**
 * Mock search field. Ctrl/Cmd+K focuses it; real search ships with the backend.
 */
export default function SearchBox({
  size = "nav",
  placeholder = "Search team, player, event…",
}: SearchBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isHero = size === "hero";

  return (
    <div
      className={`group flex items-center gap-2 rounded-xl border border-white/10 bg-panel-2/80 transition-colors focus-within:border-accent/60 ${
        isHero ? "px-4 py-3.5 shadow-[0_0_40px_rgba(108,108,245,0.15)]" : "px-3 py-1.5"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={`shrink-0 text-muted ${isHero ? "h-5 w-5" : "h-4 w-4"}`}
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        ref={inputRef}
        type="search"
        placeholder={placeholder}
        aria-label="Search"
        className={`w-full bg-transparent text-white/90 outline-none placeholder:text-muted ${
          isHero ? "text-base" : "text-sm"
        }`}
      />
      <kbd
        className={`shrink-0 rounded-md border border-white/15 px-1.5 py-0.5 font-mono text-muted ${
          isHero ? "text-xs" : "text-[10px]"
        }`}
      >
        Ctrl+K
      </kbd>
    </div>
  );
}
