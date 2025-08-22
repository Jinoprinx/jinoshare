import { Post } from "@jino/common";
import { useEffect, useMemo, useState } from "react";

export function Editor({ value, onChange }: { value: Post; onChange: (p: Post, file?: File) => void }) {
  const [local, setLocal] = useState<Post>(value);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);

  const count = useMemo(() => local.content.trim().length, [local.content]);

  useEffect(() => setLocal(value), [value]);
  useEffect(() => {
    const id = setTimeout(() => onChange(local, mediaFile || undefined), 300);
    return () => clearTimeout(id);
  }, [local, mediaFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file));
    } else {
      setMediaFile(null);
      setMediaPreview(null);
    }
  };

  return (
    <div>
      <input className="input mb-2" placeholder="Title (optional)"
        value={local.title ?? ''} onChange={e => setLocal({ ...local, title: e.target.value })} />
      <textarea className="input min-h-[200px]" placeholder="Write your post..."
        value={local.content ?? ''} onChange={e => setLocal({ ...local, content: e.target.value })} />
      
      <div className="my-2">
        <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
        {mediaPreview && (
          <div className="mt-2">
            {mediaFile?.type.startsWith("image") ? (
              <img src={mediaPreview} alt="Preview" className="max-w-full h-auto" />
            ) : (
              <video src={mediaPreview} controls className="max-w-full h-auto" />
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>{count} chars</span>
        <span>Status: {local.status}</span>
      </div>
    </div>
  );
}