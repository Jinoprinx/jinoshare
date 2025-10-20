'use client';

import { useState } from "react";
import { generatePostIdeas } from "../../../../lib/ai";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

export default function GeneratePostIdeasPage() {
  const [niche, setNiche] = useState("");
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedIdeas, setSelectedIdeas] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const ideas = await generatePostIdeas({ niche });
      setGeneratedIdeas(ideas);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleIdeaSelect = (idea: string) => {
    setSelectedIdeas((prev) =>
      prev.includes(idea)
        ? prev.filter((p) => p !== idea)
        : [...prev, idea]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIdeas(generatedIdeas);
    } else {
      setSelectedIdeas([]);
    }
  };

  const handleSaveToLibrary = async () => {
    if (selectedIdeas.length === 0) return;

    setIsAdding(true);
    try {
      await Promise.all(
        selectedIdeas.map((postContent) =>
          fetch("/api/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: postContent }),
          })
        )
      );

      alert(`${selectedIdeas.length} post(s) added to your library as drafts!`);
      setSelectedIdeas([]);
    } catch (error) {
      console.error(error);
      alert("Failed to add posts.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleMoveToContentPlanner = () => {
    if (selectedIdeas.length === 0) return;
    const ideas = JSON.stringify(selectedIdeas);
    router.push(`/dashboard/ai/planner?ideas=${encodeURIComponent(ideas)}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8">
      {/* Page header */}
      <div className="w-full max-w-4xl mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </button>
        <h2 className="font-display text-3xl text-center font-bold mt-4">Generate Post Ideas</h2>
      </div>

      {/* Glassmorphism content card */}
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_1px_0_rgba(255,255,255,0.25),0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md supports-[backdrop-filter]:bg-white/5">
        <div className="p-5 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Niche or Business Idea"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="rounded-md border border-white/10 bg-white/5 p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/40"
            />

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="rounded-md bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isGenerating ? "Generating..." : "Generate"}
            </button>

            {generatedIdeas.length > 0 && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="select-all"
                    onChange={handleSelectAll}
                    checked={selectedIdeas.length === generatedIdeas.length}
                    className="mr-4"
                  />
                  <label htmlFor="select-all">Select All</label>
                </div>
                {generatedIdeas.map((idea, index) => (
                  <div
                    key={index}
                    className="flex items-center rounded-lg border border-white/10 bg-black/20 p-4"
                  >
                    <input
                      type="checkbox"
                      id={`idea-${index}`}
                      checked={selectedIdeas.includes(idea)}
                      onChange={() => handleIdeaSelect(idea)}
                      className="mr-4"
                    />
                    <label htmlFor={`idea-${index}`} className="cursor-pointer w-full">{idea}</label>
                  </div>
                ))}
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={handleSaveToLibrary}
                    disabled={selectedIdeas.length === 0 || isAdding}
                    className="rounded-md bg-green-600 px-4 py-3 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isAdding ? "Saving..." : "Save to Library"}
                  </button>
                  <button
                    onClick={handleMoveToContentPlanner}
                    disabled={selectedIdeas.length === 0}
                    className="rounded-md bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Move to Content Planner
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Optional subtle highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 [mask-image:linear-gradient(transparent,black,transparent)]" />
      </div>
    </div>
  );
}