"use client";
import { create } from "zustand";

type Win = { id: string; z: number; minimized: boolean };

type WM = {
  windows: Win[];
  cascade: number;
  open: (id: string) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  toggleMin: (id: string) => void;
};

export const useWM = create<WM>((set) => ({
  windows: [],
  cascade: 0,
  open: (id) =>
    set((s) => {
      const topZ = s.windows.reduce((m, w) => Math.max(m, w.z), 10) + 1;
      const exists = s.windows.find((w) => w.id === id);
      if (exists)
        return { windows: s.windows.map((w) => (w.id === id ? { ...w, z: topZ, minimized: false } : w)) };
      return { windows: [...s.windows, { id, z: topZ, minimized: false }], cascade: s.cascade + 1 };
    }),
  close: (id) => set((s) => ({ windows: s.windows.filter((w) => w.id !== id) })),
  focus: (id) =>
    set((s) => {
      const topZ = s.windows.reduce((m, w) => Math.max(m, w.z), 10) + 1;
      return { windows: s.windows.map((w) => (w.id === id ? { ...w, z: topZ } : w)) };
    }),
  toggleMin: (id) =>
    set((s) => ({ windows: s.windows.map((w) => (w.id === id ? { ...w, minimized: !w.minimized } : w)) })),
}));