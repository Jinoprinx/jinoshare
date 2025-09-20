import { ISharedPost } from "@jino/common";
import { useMemo, useState, useEffect } from "react";
//DateTimePicker reinstalled
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import Image from "next/image";

export function Editor({ value, onChange }: { value: Partial<ISharedPost>; onChange: (p: Partial<ISharedPost>, file?: File) => void }) {

  const [localPost, setLocalPost] = useState(value);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);

  useEffect(() => {
    //Enter local post
    setLocalPost(value);
  }, [value]);

  const count = useMemo(() => localPost.content?.trim().length || 0, [localPost.content]);

  const handleChange = (p: Partial<ISharedPost>, f?: File) => {
    onChange(p, f);
  };

  const handleDateChange = (date: Date | null) => {
    const newPost = { ...localPost, scheduled_at: date ? date.toISOString() : null };
    setLocalPost(newPost);
    handleChange(newPost, mediaFile || undefined);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPost = { ...localPost, content: e.target.value };
    setLocalPost(newPost);
    handleChange(newPost, mediaFile || undefined);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file));
      handleChange(localPost, file);
    } else {
      setMediaFile(null);
      setMediaPreview(null);
      handleChange(localPost, undefined);
    }
  };

  return (
    <div className="p-4 rounded-lg bg-black/20 border-white/10">
      <textarea 
        className="input min-h-[150px] w-full p-2 border rounded-md bg-white/5 border-white/10 text-white placeholder-gray-400"
        placeholder="Write your post..."
        value={localPost.content ?? ''} 
        onChange={handleTextChange}
      />

      <div className="my-2">
        <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
        {mediaPreview && (
          <div className="mt-2">
            {mediaFile?.type.startsWith("image") ? (
              <Image src={mediaPreview} alt="Preview" width={300} height={300} className="max-w-full h-auto" />
            ) : (
              <video src={mediaPreview} controls className="max-w-full h-auto" />
            )}
          </div>
        )}
      </div>
      
      <div className="my-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Post</label>
        <DateTimePicker
          onChange={handleDateChange}
          value={localPost.scheduled_at ? new Date(localPost.scheduled_at) : null}
          className="w-full"
        />
      </div>

      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>{count} chars</span>
        <span>Status: {localPost.status || 'draft'}</span>
      </div>
    </div>
  );
}
