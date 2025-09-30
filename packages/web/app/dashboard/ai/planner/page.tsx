"use client";
import { useState } from "react";

interface FormData {
  mission_vision: string;
  target_audience: string;
  core_values: string;
  tone_of_voice: string;
  products_services: string;
  competitors: string;
  unique_selling_proposition: string;
  content_goals: string;
}

export default function ContentPlannerPage() {
  const [prompt, setPrompt] = useState<FormData | null>(null);
  const [posts, setPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setSelectedPosts([]);
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    setPrompt(data as unknown as FormData);

    try {
      const response = await fetch("/api/ai/content-planner/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      const result = await response.json();
      setPosts(result.posts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPosts = async () => {
    if (selectedPosts.length === 0) return;

    setIsAdding(true);
    try {
      await Promise.all(
        selectedPosts.map((postContent) =>
          fetch("/api/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: postContent }),
          })
        )
      );

      alert(`${selectedPosts.length} post(s) added to your library as drafts!`);
      setSelectedPosts([]);
    } catch (error) {
      console.error(error);
      alert("Failed to add posts.");
    } finally {
      setIsAdding(false);
    }
  };

  const handlePostSelect = (post: string) => {
    setSelectedPosts((prev) =>
      prev.includes(post)
        ? prev.filter((p) => p !== post)
        : [...prev, post]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedPosts(posts);
    } else {
      setSelectedPosts([]);
    }
  };

  return (
    <div className="flex-1 p-8 pt-6">
      <div className="rounded-lg border border-white/10 bg-black/20 p-6">
        <h2 className="text-2xl font-bold mb-4">AI Content Planner</h2>
        <p className="text-gray-400 mb-4">
          Answer the following questions to generate a personalized content plan.
        </p>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Form fields... */}
          <div className="grid gap-2">
            <label htmlFor="mission_vision" className="font-semibold">What is your brand&apos;s mission and vision?</label>
            <textarea name="mission_vision" id="mission_vision" className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="target_audience" className="font-semibold">Who is your target audience?</label>
            <textarea name="target_audience" id="target_audience" className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="core_values" className="font-semibold">What are your brand&apos;s core values?</label>
            <textarea name="core_values" id="core_values" className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="tone_of_voice" className="font-semibold">What is your brand&apos;s tone of voice?</label>
            <select name="tone_of_voice" id="tone_of_voice" className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md">
              <option value="formal">Formal</option>
              <option value="informal">Informal</option>
              <option value="friendly">Friendly</option>
              <option value="professional">Professional</option>
              <option value="humorous">Humorous</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="products_services" className="font-semibold">What are your key products or services?</label>
            <textarea name="products_services" id="products_services" className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="competitors" className="font-semibold">Who are your main competitors?</label>
            <textarea name="competitors" id="competitors" className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="unique_selling_proposition" className="font-semibold">What makes your brand unique?</label>
            <textarea name="unique_selling_proposition" id="unique_selling_proposition" className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="content_goals" className="font-semibold">What are your content goals?</label>
            <textarea name="content_goals" id="content_goals" className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md" />
          </div>
          <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700" disabled={loading}>
            {loading ? "Generating..." : "Generate Content Plan"}
          </button>
        </form>
        {loading && (
          <div className="mt-4">
            <p>Generating content...</p>
          </div>
        )}
        {posts.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Generated Content:</h3>
            <div className="flex items-center mt-2 mb-2">
              <input
                type="checkbox"
                id="select-all"
                onChange={handleSelectAll}
                checked={selectedPosts.length === posts.length}
                className="mr-4"
              />
              <label htmlFor="select-all">Select All</label>
            </div>
            <div className="grid gap-4 mt-2">
              {posts.map((post, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-800 rounded-md">
                  <input
                    type="checkbox"
                    id={`post-${index}`}
                    name="selectedPosts"
                    value={post}
                    checked={selectedPosts.includes(post)}
                    onChange={() => handlePostSelect(post)}
                    className="mr-4"
                  />
                  <label htmlFor={`post-${index}`} className="cursor-pointer w-full"><p>{post}</p></label>
                </div>
              ))}
            </div>
            <button
              onClick={handleAddPosts}
              className="mt-4 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-500"
              disabled={selectedPosts.length === 0 || isAdding}
            >
              {isAdding ? "Adding..." : `Add ${selectedPosts.length} Post(s) to Library`}
            </button>
          </div>
        )}
        {prompt && !loading && posts.length === 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Generated JSON Prompt:</h3>
            <pre className="p-4 mt-2 bg-gray-100 rounded-md">
              {JSON.stringify(prompt, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
