"use client";
import { format } from "date-fns";
import { ISharedPost } from "@jino/common";

export function ContentList({ posts, onUpdate, onDelete, onEdit }: { posts: ISharedPost[]; onUpdate: (p: ISharedPost)=>void; onDelete: (id: string)=>void; onEdit: (p: ISharedPost) => void; }) {

  return (
    <div className="grid gap-3">
      {posts.map(p => (
        <div key={p._id} className="card">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold text-gray-500">{p.status}</span>
                <div className="flex gap-1">
                  {p.channels.map(c => <span key={c} className="badge">{c}</span>)}
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap mt-1">{p.content}</p>
              {p.scheduledAt && (
                <p className="text-sm text-gray-500 mt-1">
                  Scheduled: {format(new Date(p.scheduledAt), "EEE, MMM d p")}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button className="btn-outline" onClick={() => onEdit(p)}>
                {p.status === "draft" ? "Schedule" : "Edit"}
              </button>
              <button className="btn-outline" onClick={() => onDelete(p._id)}>Delete</button>
              <button className="btn-outline" onClick={() => onEdit(p)}>Post Now</button>
            </div>
          </div>
        </div>
      ))}
      {posts.length === 0 && <p className="text-gray-500">No posts yet.</p>}
    </div>
  );
}