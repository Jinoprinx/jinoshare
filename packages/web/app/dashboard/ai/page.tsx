"use client";
import { useRouter } from "next/navigation";

const aiFeatures = [
  {
    title: "Content Planner",
    description: "Create a content plan for your brand.",
    path: "/dashboard/ai/planner",
  },
  {
    title: "Generate Posts Ideas",
    description: "Create social media posts from a topic.",
    path: "/dashboard/ai/generate",
  },
  {
    title: "Rewrite Post",
    description: "Rewrite a post for a different platform or tone.",
    path: "/dashboard/ai/rewrite",
  },
  {
    title: "Generate Images",
    description: "Create images from a text description.",
    path: "/dashboard/ai/image",
  },
  {
    title: "Generate Videos",
    description: "Create videos from a text description.",
    path: "/dashboard/ai/video",
  },
];

export default function AIPage() {
  const router = useRouter();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">AI Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {aiFeatures.map((feature) => (
          <div
            key={feature.title}
            className="rounded-lg border border-white/10 bg-black/20 p-6 cursor-pointer hover:bg-white/5 transition-colors"
            onClick={() => router.push(feature.path)}
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
