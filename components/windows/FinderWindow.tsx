"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, Globe } from "lucide-react";
import Window from "../Window";
import { useRepos, LANG_COLORS } from "@/lib/hooks";
import { useWM } from "@/lib/store";

type Sort = "all" | "popular" | "recent";

export default function FinderWindow() {
  const { data: repos, isLoading } = useRepos();
  const [sort, setSort] = useState<Sort>("all");
  const open = useWM((s) => s.open);

  const sorted = (() => {
    if (!repos) return [];
    const r = [...repos];
    if (sort === "popular") return r.sort((a, b) => b.stars - a.stars);
    if (sort === "recent") return r.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
    return r;
  })();

  const side = (id: Sort, label: string) => (
    <button onClick={() => setSort(id)}
      className={`w-full text-left text-xs rounded-md px-2.5 py-1.5 transition
        ${sort === id ? "bg-violet-500/15 text-violet-500 font-medium" : "hover:bg-black/5 dark:hover:bg-white/5"}`}>
      {label}
    </button>
  );

  return (
    <Window id="finder" title="Projects - Finder" width={780} height={520} x={80} y={56}>
      <div className="flex h-full">
        <aside className="w-40 shrink-0 p-2 space-y-0.5 border-r border-black/5 dark:border-white/5">
          <p className="px-2.5 pt-1 pb-1.5 text-[10px] uppercase tracking-wider text-zinc-400">Library</p>
          {side("all", "All Projects")}
          {side("popular", "* Popular")}
          {side("recent", "Recently Pushed")}
        </aside>

        <div className="flex-1 overflow-y-auto p-4">
          {isLoading && <p className="text-xs text-zinc-400 animate-pulse">Fetching from GitHub...</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sorted.map((repo, i) => (
              <motion.button
                key={repo.name}
                onClick={() => open(`repo:${repo.name}`)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.4) }}
                whileHover={{ y: -4, rotateX: 5, rotateY: -3 }}
                style={{ transformPerspective: 800 }}
                className="text-left rounded-xl p-3.5 bg-white/60 dark:bg-white/5
                           border border-black/10 dark:border-white/10
                           hover:border-violet-400/60 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-sm truncate text-zinc-800 dark:text-zinc-100">{repo.name}</span>
                  <div className="flex items-center gap-2.5 text-[11px] text-zinc-500 shrink-0">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="size-2 rounded-full" style={{ background: LANG_COLORS[repo.language] ?? "#999" }} />
                        {repo.language}
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 min-h-8">
                  {repo.description || "No description"}
                </p>
                {repo.topics.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {repo.topics.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full bg-violet-500/10 text-violet-500 px-2 py-0.5 text-[10px]">{t}</span>
                    ))}
                  </div>
                )}
                <div className="mt-2.5 flex items-center gap-3 text-[11px] text-zinc-500">
                  <span className="flex items-center gap-1"><Star className="size-3" />{repo.stars}</span>
                  <span className="flex items-center gap-1"><GitFork className="size-3" />{repo.forks}</span>
                  {repo.homepage && <span className="flex items-center gap-1 text-violet-400"><Globe className="size-3" />demo</span>}
                </div>
              </motion.button>
            ))}
          </div>
          {!isLoading && sorted.length === 0 && (
            <p className="text-xs text-zinc-400">No public repositories found.</p>
          )}
        </div>
      </div>
    </Window>
  );
}