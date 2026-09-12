"use client";
import Window from "../Window";
import { useProfile, useRepos } from "@/lib/hooks";

const SKILLS = ["TypeScript", "React", "Next.js", "Node.js", "Python", "Tailwind", "Git", "REST APIs", "SQLite"];

export default function AboutWindow() {
  const { data: profile } = useProfile();
  const { data: repos } = useRepos();
  const totalStars = repos?.reduce((s, r) => s + r.stars, 0) ?? 0;

  return (
    <Window id="about" title="Terminal - about" width={580} height={440} x={200} y={110}>
      <div className="h-full bg-zinc-950/95 font-mono text-[13px] text-zinc-300 overflow-y-auto p-4 leading-relaxed">
        <p><span className="text-emerald-400">ganesh@portfolio</span> <span className="text-zinc-500">~ %</span> cat about.txt</p>
        <p className="mt-2 text-zinc-100">{profile?.bio || "Developer. Builder. Ship-it enjoyer."}</p>
        {profile?.location && <p className="text-zinc-500">Location: {profile.location}</p>}

        <p className="mt-4"><span className="text-emerald-400">ganesh@portfolio</span> <span className="text-zinc-500">~ %</span> ls skills/</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {SKILLS.map((s) => (
            <span key={s} className="rounded-md bg-white/10 px-2 py-0.5 text-xs">{s}</span>
          ))}
        </div>

        <p className="mt-4"><span className="text-emerald-400">ganesh@portfolio</span> <span className="text-zinc-500">~ %</span> gh stats</p>
        <p className="mt-2">
          <span className="text-violet-400">{profile?.public_repos ?? "-"}</span> public repos |{" "}
          <span className="text-violet-400">{totalStars}</span> total stars |{" "}
          <span className="text-violet-400">{profile?.followers ?? "-"}</span> followers
        </p>

        <p className="mt-4">
          <span className="text-emerald-400">ganesh@portfolio</span> <span className="text-zinc-500">~ %</span>{" "}
          <span className="inline-block size-2.5 bg-zinc-300 align-middle animate-pulse" />
        </p>
      </div>
    </Window>
  );
}