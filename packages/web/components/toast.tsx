"use client";
import { useEffect, useState } from "react";

type T = { id: string; type: "success"|"error"|"info"; msg: string };
let push!: (t: T) => void;

export function Toasts() {
  const [items, setItems] = useState<T[]>([]);
  useEffect(() => {
    push = (t: T) => {
      setItems(prev => [...prev, t]);
      setTimeout(() => setItems(prev => prev.filter(x => x.id !== t.id)), 2000);
    };
  }, []);
  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {items.map(t => (
        <div key={t.id} className={`px-4 py-2 rounded text-white shadow
          ${t.type==="success"?"bg-emerald-600":t.type==="error"?"bg-rose-600":"bg-gray-800"}`}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}
export const toast = {
  success: (msg: string) => push({ id: crypto.randomUUID(), type: "success", msg }),
  error:   (msg: string) => push({ id: crypto.randomUUID(), type: "error", msg }),
  info:    (msg: string) => push({ id: crypto.randomUUID(), type: "info", msg })
};
