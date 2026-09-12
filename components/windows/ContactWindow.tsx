"use client";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import Window from "../Window";

// EDIT THESE - your real links
const LINKS = [
  { icon: Mail, label: "Email", value: "hello@izganesh.dev", href: "mailto:hello@izganesh.dev" },
  { icon: Github, label: "GitHub", value: "izganesh007-ship-it", href: "https://github.com/izganesh007-ship-it" },
  { icon: Linkedin, label: "LinkedIn", value: "in/izganesh", href: "https://linkedin.com/in/izganesh" },
  { icon: Twitter, label: "X / Twitter", value: "@izganesh", href: "https://x.com/izganesh" },
];

export default function ContactWindow() {
  return (
    <Window id="contact" title="Contact - Mail" width={460} height={400} x={300} y={150}>
      <div className="h-full overflow-y-auto p-5">
        <p className="text-xs uppercase tracking-wider text-zinc-400 mb-4">Open to work &amp; collaborations</p>
        <div className="space-y-2.5">
          {LINKS.map(({ icon: Icon, label, value, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
               className="flex items-center gap-3 rounded-xl p-3 bg-white/60 dark:bg-white/5
                          border border-black/10 dark:border-white/10
                          hover:border-violet-400/60 hover:shadow-md transition">
              <span className="flex size-9 items-center justify-center rounded-lg bg-violet-500/15 text-violet-500">
                <Icon className="size-4" />
              </span>
              <span>
                <span className="block text-[10px] uppercase tracking-wide text-zinc-400">{label}</span>
                <span className="block text-sm font-medium text-zinc-800 dark:text-zinc-100">{value}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </Window>
  );
}