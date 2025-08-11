import { Channel } from "@/lib/schema";

const OPTIONS: { id: Channel; label: string }[] = [
  { id: "x", label: "X" },
  { id: "tiktok", label: "TikTok" },
  { id: "instagram", label: "IG" },
  { id: "youtube", label: "YT" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "facebook", label: "Facebook" }
];

export function Channels({
  value, onChange
}: { value: Channel[]; onChange: (c: Channel[])=>void }) {
  function toggle(c: Channel) {
    onChange(value.includes(c) ? value.filter(v => v !== c) : [...value, c]);
  }
  return (
    <div className="flex gap-2 flex-wrap">
      {OPTIONS.map(o => (
        <button key={o.id}
          onClick={() => toggle(o.id)}
          className={`badge ${value.includes(o.id) ? "bg-brand-600 text-white" : ""}`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
