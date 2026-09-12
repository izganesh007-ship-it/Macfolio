"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import MenuBar from "./MenuBar";
import LockScreen from "./LockScreen";
import Dock from "./Dock";
import { useWM } from "@/lib/store";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });
const FinderWindow = dynamic(() => import("./windows/FinderWindow"), { ssr: false });
const AboutWindow = dynamic(() => import("./windows/AboutWindow"), { ssr: false });
const ContactWindow = dynamic(() => import("./windows/ContactWindow"), { ssr: false });
const RepoWindow = dynamic(() => import("./windows/RepoWindow"), { ssr: false });

function WindowLayer() {
  const windows = useWM((s) => s.windows);
  return (
    <AnimatePresence>
      {windows.map((w) => {
        if (w.id === "finder") return <FinderWindow key="finder" />;
        if (w.id === "about") return <AboutWindow key="about" />;
        if (w.id === "contact") return <ContactWindow key="contact" />;
        if (w.id.startsWith("repo:")) return <RepoWindow key={w.id} name={w.id.slice(5)} />;
        return null;
      })}
    </AnimatePresence>
  );
}

export default function Desktop() {
  const [locked, setLocked] = useState(true);
  const open = useWM((s) => s.open);

  const unlock = () => {
    setLocked(false);
    setTimeout(() => open("finder"), 350); // Finder opens as you enter
  };

  return (
    <main className="relative h-dvh w-screen overflow-hidden cursor-default select-none">
      {/* Wallpaper - theme aware */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-slate-100 via-indigo-50 to-violet-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-violet-950/50 transition-colors duration-500" />
      <Scene3D />
      <MenuBar />
      <WindowLayer />
      <Dock />
      <AnimatePresence>{locked && <LockScreen onUnlock={unlock} />}</AnimatePresence>
    </main>
  );
}