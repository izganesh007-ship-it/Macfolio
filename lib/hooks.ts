"use client";
import useSWR from "swr";
import type { Profile, Repo } from "./types";

export const fetcher = (u: string) => fetch(u).then((r) => r.json());
export const useProfile = () => useSWR<Profile>("/api/github/profile", fetcher);
export const useRepos = () => useSWR<Repo[]>("/api/github/repos", fetcher);

export const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5", Rust: "#dea584",
  Go: "#00ADD8", Java: "#b07219", "C++": "#f34b7d", C: "#8a8a8a", HTML: "#e34c26",
  CSS: "#563d7c", Shell: "#89e051", Kotlin: "#A97BFF", Swift: "#F05138",
  Dart: "#00B4AB", PHP: "#4F5D95", Ruby: "#701516", Vue: "#41b883", Svelte: "#ff3e00",
};