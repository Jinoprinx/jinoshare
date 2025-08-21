"use client";
import { addDays, eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns";
import { Post } from "@jino/common";
import { useMemo } from "react";

export function Calendar({ posts, onChange }: { posts: Post[]; onChange: (p: Post)=>void }) {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  const end = endOfWeek(new Date(), { weekStartsOn: 1 });
  const days = useMemo(() => eachDayOfInterval({ start, end }), [start, end]);

  function move(p: Post, deltaDays: number) {
    const when = p.scheduledAt ? new Date(p.scheduledAt) : new Date();
    const next = addDays(when, deltaDays);
    onChange({ ...p, scheduledAt: next.toISOString(), status: "scheduled" });
  }

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map(d => {
        const dayPosts = posts.filter(p => p.scheduledAt && format(new Date(p.scheduledAt), "yyyy-MM-dd") === format(d, "yyyy-MM-dd"));
        return (
          <div key={d.toISOString()} className="card min-h-[140px]">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{format(d, "EEE d")}</div>
            </div>
            <div className="mt-2 space-y-2">
              {dayPosts.map(p => (
                <div key={p.id} className="border rounded p-2 text-sm">
                  <div className="font-medium">{p.title || p.content.split('\n')[0].slice(0, 50) || "Untitled"}</div>
                  <div className="text-gray-600 line-clamp-3">{p.content}</div>
                  <div className="flex gap-2 mt-2">
                    <button className="btn-outline" onClick={() => move(p, -1)}>←</button>
                    <button className="btn-outline" onClick={() => move(p, 1)}>→</button>
                  </div>
                </div>
              ))}
              {dayPosts.length === 0 && <div className="text-gray-400 text-sm">No posts</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
