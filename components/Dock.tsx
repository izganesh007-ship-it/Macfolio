"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { Folder, Terminal, Mail, Github } from "lucide-react";
import { useWM } from "@/lib/store";

function DockIcon(props: {
  mouseX: MotionValue<number>; label: string; bg: string;
  icon: React.ReactNode; onClick?: () => void; href?: string; running?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(props.mouseX, (val) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - b.x - b.width / 2;
  });
  const scale = useSpring(useTransform(distance, [-110, 0, 110], [1, 1.45, 1]), {
    stiffness: 260, damping: 18, mass: 0.4,
  });
  const Comp = (props.href ? motion.a : motion.button) as typeof motion.button;

  return (
    <div ref={ref} className="group relative flex flex-col items-center">
      <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md px-2 py-1 text-[10px]
                       bg-black/70 text-white dark:bg-white/85 dark:text-zinc-900
                       opacity-0 group-hover:opacity-100 transition-opacity">
        {props.label}
      </span>
      <Comp
        href={props.href} target={props.href ? "_blank" : undefined} rel="noreferrer"
        onClick={props.onClick}
        style={{ scale }} whileTap={{ scale: 0.9 }}
        className={`relative flex size-11 items-center justify-center rounded-xl
                    bg-gradient-to-br ${props.bg} shadow-md ring-1 ring-black/10 dark:ring-white/10`}
      >
        {props.icon}
        {props.running && (
          <span className="absolute -bottom-[6px] size-1 rounded-full bg-black/50 dark:bg-white/60" />
        )}
      </Comp>
    </div>
  );
}

export default function Dock() {
  const mouseX = useMotionValue(Infinity);
  const open = useWM((s) => s.open);
  const windows = useWM((s) => s.windows);
  const isOpen = (id: string) => windows.some((w) => w.id === id && !w.minimized);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[4000] flex items-end gap-1.5
                 rounded-2xl border border-black/10 dark:border-white/10
                 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-xl px-2.5 pb-2 pt-1.5 shadow-xl"
    >
      <DockIcon mouseX={mouseX} label="Projects" running={isOpen("finder")}
        onClick={() => open("finder")} icon={<Folder className="size-6 text-white" fill="currentColor" />}
        bg="from-sky-400 to-blue-600" />
      <DockIcon mouseX={mouseX} label="About" running={isOpen("about")}
        onClick={() => open("about")} icon={<Terminal className="size-6 text-emerald-300" />}
        bg="from-zinc-600 to-zinc-900" />
      <DockIcon mouseX={mouseX} label="Contact" running={isOpen("contact")}
        onClick={() => open("contact")} icon={<Mail className="size-6 text-white" />}
        bg="from-violet-400 to-violet-700" />
      <div className="w-px self-stretch bg-black/10 dark:bg-white/10 mx-1" />
      <DockIcon mouseX={mouseX} label="GitHub" href="https://github.com/izganesh007-ship-it"
        icon={<Github className="size-6 text-white" />} bg="from-zinc-700 to-black" />
    </motion.div>
  );
}