
import { useState } from "react";
import { generatePosts, rewritePost } from "../lib/ai";

export function AI() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("x");
  const [tone, setTone] = useState("concise");
  const [generatedPosts, setGeneratedPosts] = useState<string[]>([]);
  const [textToRewrite, setTextToRewrite] = useState("");
  const [rewrittenText, setRewrittenText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const posts = await generatePosts({ topic, platform, tone });
      setGeneratedPosts(posts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRewrite = async () => {
    setIsRewriting(true);
    try {
      const rewritten = await rewritePost(textToRewrite, platform, tone, "clarity");
      setRewrittenText(rewritten);
    } catch (error) {
      console.error(error);
    } finally {
      setIsRewriting(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">AI Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Generate Posts</h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="p-2 border rounded"
            />
            <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="p-2 border rounded">
              <option value="x">X (Twitter)</option>
              <option value="linkedin">LinkedIn</option>
              <option value="instagram">Instagram</option>
            </select>
            <select value={tone} onChange={(e) => setTone(e.target.value)} className="p-2 border rounded">
              <option value="concise">Concise</option>
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
            </select>
            <button onClick={handleGenerate} disabled={isGenerating} className="p-2 bg-blue-500 text-white rounded">
              {isGenerating ? "Generating..." : "Generate"}
            </button>
            <div className="mt-4">
              {generatedPosts.map((post, index) => (
                <div key={index} className="p-2 border-b">
                  {post}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Rewrite Post</h3>
          <div className="flex flex-col gap-4">
            <textarea
              placeholder="Text to rewrite"
              value={textToRewrite}
              onChange={(e) => setTextToRewrite(e.target.value)}
              className="p-2 border rounded"
            />
            <button onClick={handleRewrite} disabled={isRewriting} className="p-2 bg-blue-500 text-white rounded">
              {isRewriting ? "Rewriting..." : "Rewrite"}
            </button>
            {rewrittenText && (
              <div className="mt-4 p-2 border rounded bg-gray-100">
                {rewrittenText}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
