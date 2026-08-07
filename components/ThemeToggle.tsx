"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("ps:theme", callback);
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", callback);
  return () => {
    window.removeEventListener("ps:theme", callback);
    mq.removeEventListener("change", callback);
  };
}

function getSnapshot(): "light" | "dark" {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function getServerSnapshot(): "light" | "dark" {
  return "light";
}

function applyTheme(next: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event("ps:theme"));
}

function Sun() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function Moon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span className="inline-flex items-center gap-1">
      <button
        type="button"
        aria-label="Use light theme"
        aria-pressed={theme === "light"}
        className="rounded-md px-2 py-1.5 text-muted hover:text-ink hover:bg-raise"
        onClick={() => applyTheme("light")}
      >
        <Sun />
      </button>
      <button
        type="button"
        aria-label="Use dark theme"
        aria-pressed={theme === "dark"}
        className="rounded-md px-2 py-1.5 text-muted hover:text-ink hover:bg-raise"
        onClick={() => applyTheme("dark")}
      >
        <Moon />
      </button>
    </span>
  );
}
