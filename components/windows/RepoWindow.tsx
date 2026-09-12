"use client";
import useSWR from "swr";
import { Star, GitFork, Code2, Globe, Loader2 } from "lucide-react";
import Window from "../Window";
import { useRepos, LANG_COLORS } from "@/lib/hooks";

export default function RepoWindow({ name }: { name: string }) {
  const { data: repos } = useRepos();
  const repo = repos?.find((r) => r.name === name);
  const { data: html, isLoading } = useSWR(`/api/github/readme?repo=${name}`, (u) => fetch(u).then((r) => r.text()));

  return (
    <Window id={`repo:${name}`} title={name} width={740} height={560} x={140} y={40}>
      <div className="flex flex-col h-full">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-2.5 border-b border-black/5 dark:border-white/5 text-xs text-zinc-500">
          {repo?.language && (
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full" style={{ background: LANG_COLORS[repo.language] ?? "#999" }} />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1"><Star className="size-3.5" />{repo?.stars ?? "-"}</span>
          <span className="flex items-center gap-1"><GitFork className="size-3.5" />{repo?.forks ?? "-"}</span>
          <div className="ml-auto flex gap-2">
            {repo?.homepage && (
              <a href={repo.homepage} target="_blank" rel="noreferrer"
                 className="flex items-center gap-1 rounded-md bg-violet-500 text-white px-2.5 py-1 hover:bg-violet-600 transition">
                <Globe className="size-3" /> Live Demo
              </a>
            )}
            {repo?.url && (
              <a href={repo.url} target="_blank" rel="noreferrer"
                 className="flex items-center gap-1 rounded-md bg-black/5 dark:bg-white/10 px-2.5 py-1 hover:bg-black/10 dark:hover:bg-white/20 transition">
                <Code2 className="size-3" /> Source
              </a>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {isLoading ? (
            <div className="flex items-center gap-2 text-xs text-zinc-400 animate-pulse">
              <Loader2 className="size-4 animate-spin" /> Loading README...
            </div>
          ) : (
            <div className="readme" dangerouslySetInnerHTML={{ __html: html ?? "<p>No README.</p>" }} />
          )}
        </div>
      </div>
    </Window>
  );
}