import { Post } from "@jino/common";
import { useEffect, useMemo, useState } from "react";

export function Editor({ value, onChange }: { value: Post; onChange: (p: Post)=>void }) {
  const [local, setLocal] = useState<Post>(value);
  const count = useMemo(() => local.content.trim().length, [local.content]);

  useEffect(() => setLocal(value), [value]);
  useEffect(() => {
    const id = setTimeout(() => onChange(local), 300); // debounce/autosave
    return () => clearTimeout(id);
  }, [local]); // eslint-disable-line

  return (
    <div>
      <input className="input mb-2" placeholder="Title (optional)"
        value={local.title ?? ''} onChange={e => setLocal({ ...local, title: e.target.value })} />
      <textarea className="input min-h-[200px]" placeholder="Write your post..."
        value={local.content ?? ''} onChange={e => setLocal({ ...local, content: e.target.value })} />
      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>{count} chars</span>
        <span>Status: {local.status}</span>
      </div>
    </div>
  );
}
