"use client";
import { useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { useWM } from "@/lib/store";

type Props = {
  id: string; title: string; children: React.ReactNode;
  width?: number; height?: number; x?: number; y?: number;
};

function Light({ color, onClick }: { color: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      onPointerDown={(e) => e.stopPropagation()}
      className="size-3 rounded-full hover:brightness-110 transition"
      style={{ background: color }}
    />
  );
}

export default function Window({ id, title, children, width = 720, height = 480, x = 100, y = 80 }: Props) {
  const controls = useDragControls();
  const win = useWM((s) => s.windows.find((w) => w.id === id));
  const focus = useWM((s) => s.focus);
  const close = useWM((s) => s.close);
  const toggleMin = useWM((s) => s.toggleMin);
  const [maxed, setMaxed] = useState(false);

  if (!win || win.minimized) return null;

  return (
    <motion.div
      className={`absolute flex flex-col rounded-xl overflow-hidden
                  border border-black/10 dark:border-white/10
                  bg-white/75 dark:bg-zinc-900/75 backdrop-blur-2xl shadow-2xl
                  ${maxed ? "left-2 right-2 top-10 bottom-16" : "max-w-[calc(100vw-24px)] max-h-[calc(100vh-130px)]"}`}
      style={{ left: maxed ? undefined : x, top: maxed ? undefined : y,
               width: maxed ? undefined : width, height: maxed ? undefined : height, zIndex: win.z }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      drag dragListener={false} dragControls={controls}
      dragMomentum={false} dragElastic={0}
      onPointerDown={() => focus(id)}
    >
      <header
        onPointerDown={(e) => { if (!maxed) controls.start(e); }}
        onDoubleClick={() => setMaxed((m) => !m)}
        className="flex items-center h-10 px-3 shrink-0 border-b border-black/5 dark:border-white/5 cursor-default"
      >
        <div className="flex gap-2">
          <Light color="#ff5f57" onClick={() => close(id)} />
          <Light color="#febc2e" onClick={() => toggleMin(id)} />
          <Light color="#28c840" onClick={() => setMaxed((m) => !m)} />
        </div>
        <span className="mx-auto text-xs font-semibold text-zinc-600 dark:text-zinc-300">{title}</span>
        <span className="w-14" />
      </header>
      <div className="flex-1 min-h-0 select-text">{children}</div>
    </motion.div>
  );
}