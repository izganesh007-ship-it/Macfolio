"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Github, Sun, Moon } from "lucide-react";
import { useProfile, useRepos } from "@/lib/hooks";
import { useWM } from "@/lib/store";

function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!now) return <span className="w-28" />;
  return (
    <span className="tabular-nums">
      {now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}
      {"  "}
      {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </span>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <span className="size-4" />;
  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="hover:opacity-70 transition"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

export default function MenuBar() {
  const { data: profile } = useProfile();
  const { data: repos } = useRepos();
  const open = useWM((s) => s.open);
  const item = "hover:bg-black/10 dark:hover:bg-white/10 rounded px-2 py-0.5 transition";

  return (
    <header className="fixed top-0 inset-x-0 h-8 z-[5000] flex items-center justify-between px-3
                       text-xs text-zinc-800 dark:text-zinc-200
                       bg-white/50 dark:bg-black/40 backdrop-blur-xl
                       border-b border-black/5 dark:border-white/5">
      <div className="flex items-center gap-1">
        <img src={profile?.avatar_url} alt="" className="size-4 rounded-full mr-1" />
        <button onClick={() => open("finder")} className={`${item} font-semibold`}>
          {profile?.name?.split(" ")[0] || "Ganesh"}
        </button>
        <button onClick={() => open("finder")} className={item}>
          Projects {repos ? `(${repos.length})` : ""}
        </button>
        <button onClick={() => open("about")} className={item}>About</button>
        <button onClick={() => open("contact")} className={item}>Contact</button>
      </div>
      <div className="flex items-center gap-3">
        <a href={profile?.html_url || "https://github.com/izganesh007-ship-it"} target="_blank"
           rel="noreferrer" className="hover:opacity-70 transition" aria-label="GitHub">
          <Github className="size-4" />
        </a>
        <ThemeToggle />
        <Clock />
      </div>
    </header>
  );
}