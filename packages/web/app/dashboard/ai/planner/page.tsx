"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from 'next/navigation';

const DynamicForm = ({ templateName }: { templateName: string }) => {
  const commonFields = [
    { name: 'mission_vision', label: 'What is your brand\'s mission and vision?', type: 'textarea' },
    { name: 'target_audience', label: 'Who is your target audience?', type: 'textarea' },
    { name: 'core_values', label: 'What are your brand\'s core values?', type: 'textarea' },
    { name: 'tone_of_voice', label: 'What is your brand\'s tone of voice?', type: 'select', options: ['formal', 'informal', 'friendly', 'professional', 'humorous'] },
    { name: 'products_services', label: 'What are your key products or services?', type: 'textarea' },
    { name: 'competitors', label: 'Who are your main competitors?', type: 'textarea' },
    { name: 'unique_selling_proposition', label: 'What makes your brand unique?', type: 'textarea' },
    { name: 'content_goals', label: 'What are your content goals?', type: 'textarea' },
  ];

  const templateFields: { [key: string]: any[] } = {
    FreebieAlert: [
      { name: 'productName', label: 'Product Name', type: 'text' },
      { name: 'benefit', label: 'Benefit', type: 'textarea' },
    ],
    PaidCourse: [
      { name: 'courseName', label: 'Course Name', type: 'text' },
      { name: 'price', label: 'Price', type: 'text' },
      { name: 'discount', label: 'Discount', type: 'text' },
    ],
  };

  const fields = useMemo(() => {
    return [...commonFields, ...(templateFields[templateName] || [])];
  }, [templateName]);

  return (
    <>
      {fields.map((field) => (
        <div key={field.name} className="grid gap-2">
          <label htmlFor={field.name} className="font-semibold">{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea name={field.name} id={field.name} className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md" />
          ) : field.type === 'select' ? (
            <select name={field.name} id={field.name} className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md">
              {field.options?.map((option: string) => (
                <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
              ))}
            </select>
          ) : (
            <input type={field.type} name={field.name} id={field.name} className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md" />
          )}
        </div>
      ))}
    </>
  );
};

export default function ContentPlannerPage() {
  const searchParams = useSearchParams();
  const templateName = searchParams.get('template') || '';

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

    try {
      const response = await fetch("/api/ai/content-planner/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ templateName, variables: data }),
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
          <DynamicForm templateName={templateName} />
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
      </div>
    </div>
  );
}