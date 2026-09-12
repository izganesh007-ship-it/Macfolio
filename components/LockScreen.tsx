"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useProfile } from "@/lib/hooks";

export default function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const { data: profile } = useProfile();
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      onClick={onUnlock}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer
                 bg-white/30 dark:bg-black/40 backdrop-blur-2xl"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
    >
      <div className="absolute top-16 text-center text-zinc-800 dark:text-white">
        <div className="text-7xl font-extralight tabular-nums tracking-tight">
          {now ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
        </div>
        <div className="mt-1 text-sm opacity-70">
          {now ? now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }) : ""}
        </div>
      </div>

      <motion.img
        src={profile?.avatar_url || "https://github.com/identicons/izganesh007-ship-it.png"}
        alt="avatar"
        className="size-28 rounded-full ring-4 ring-white/40 dark:ring-white/20 shadow-2xl object-cover"
        whileHover={{ scale: 1.05 }}
      />
      <h1 className="mt-4 text-xl font-medium text-zinc-800 dark:text-white">
        {profile?.name || profile?.login || "Ganesh"}
      </h1>
      <p className="mt-8 text-xs animate-pulse text-zinc-600 dark:text-zinc-400">
        Click anywhere to enter
      </p>
    </motion.div>
  );
}