'use client'
import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeftIcon } from "lucide-react";
import {TemplateInfo} from "./TemplateInfo";

interface Field {
  name: string;
  label: string;
  type: string;
  multiple?: boolean;
  options?: string[];
  example?: string;
}

const DynamicForm = ({ fields, defaultValue }: { fields: Field[], defaultValue?: string }) => {
  return (
    <>
      {fields.map((field) => (
        <div key={field.name} className="grid gap-2">
          <label htmlFor={field.name} className="font-semibold">{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea name={field.name} id={field.name} className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md" defaultValue={field.name === 'niche' ? defaultValue : ''} />
          ) : field.type === 'select' ? (
            <select name={field.name} id={field.name} multiple={field.multiple} className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md">
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

export default function PlannerPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ideasQuery = searchParams.get('ideas');
  const ideas = ideasQuery ? JSON.parse(decodeURIComponent(ideasQuery)) : [];
  const nicheDefaultValue = ideas.join(', ');

  // Default to "Generic" template if no template is specified
  const templateName = searchParams.get('template') || 'Generic';

  const [posts, setPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string>('');

  const commonFields = useMemo(() => [
    { name: 'niche', label: 'What is your niche?', type: 'textarea', example: 'fitness coaching, e-commerce, real estate wholesaling, SaaS for dentists, freelance copywriting' },
    { name: 'target_audience', label: 'Who is your target audience? Be hyper-specific:', type: 'textarea', example: 'newly licensed real estate agents in Texas with 6 months experience, freelance designers tired of scope creep, e-commerce founders stuck at $20K/month' },
    { name: 'tone_of_voice', label: 'What is your brand\'s tone of voice?', type: 'select', multiple: true, options: ['formal', 'informal', 'friendly', 'professional', 'humorous'] },
  ], []);
  const templateFields: { [key: string]: any[] } = useMemo(() => ({
    FreebieAlert: [
      { name: 'productName', label: 'Product Name', type: 'text', example: 'The Ultimate Guide to...' },
      { name: 'benefit', label: 'Benefit', type: 'textarea', example: 'Get more clients, save time, ...' },
    ],
    PaidCourse: [
      { name: 'courseName', label: 'Course Name', type: 'text', example: 'The 90-Day...' },
      { name: 'price', label: 'Price', type: 'text', example: '$997' },
      { name: 'discount', label: 'Discount', type: 'text', example: '50% off' },
    ],
    QuickTutorial: [
      { name: 'tutorialTopic', label: 'Tutorial Topic', type: 'text', example: 'How to...' },
      { name: 'tutorialDuration', label: 'Duration (e.g., 5 minutes)', type: 'text', example: '5 minutes' },
      { name: 'keyTakeaways', label: 'Key Takeaways', type: 'textarea', example: '1. ..., 2. ..., 3. ...' },
    ],
    CarouselPost: [
      { name: 'carouselTopic', label: 'Carousel Topic', type: 'text', example: '5 mistakes...' },
      { name: 'numberOfSlides', label: 'Number of Slides', type: 'text', example: '5' },
    ],
    PromoOffer: [
      { name: 'offerDetails', label: 'Offer Details', type: 'textarea', example: 'Get 50% off...' },
      { name: 'discountPercentage', label: 'Discount Percentage (e.g., 50%)', type: 'text', example: '50%' },
      { name: 'expirationDate', label: 'Expiration Date', type: 'text', example: 'Tomorrow' },
    ],
    ProductLaunch: [
      { name: 'productName', label: 'Product Name', type: 'text', example: 'My new product' },
      { name: 'productDescription', label: 'Product Description', type: 'textarea', example: 'This product will help you...' },
      { name: 'launchDate', label: 'Launch Date', type: 'text', example: 'Next week' },
    ],
    AIAcceleratedFounderPost: [
        { name: 'ai_integration', label: 'AI Integration', type: 'textarea', example: 'Used AI to personalize the onboarding experience' },
        { name: 'offer_type', label: 'Offer Type', type: 'text', example: 'Choose: free masterclass / private workshop / replay to get access' },
    ],
    AuthorityPost: [
        { name: 'credibility_anchor', label: 'Credibility Anchor', type: 'text', example: 'scaled to $5M ARR' },
    ],
    FounderJourneyPost: [
        { name: 'founder_story', label: 'Founder Story', type: 'textarea', example: 'I started with nothing but a laptop and a dream...' },
        { name: 'milestone', label: 'Milestone', type: 'text', example: 'Reached 1000 customers' },
        { name: 'struggle', label: 'Struggle', type: 'text', example: 'Almost gave up after 6 months' },
    ],
    CaseStudyPost: [
        { name: 'client_type', label: 'Client Type', type: 'text', example: 'SaaS companies' },
        { name: 'problem', label: 'Problem', type: 'textarea', example: 'Low user engagement' },
        { name: 'solution', label: 'Solution', type: 'textarea', example: 'Implemented a new onboarding flow' },
        { name: 'result', label: 'Result', type: 'text', example: 'Increased engagement by 50%' },
        { name: 'ai_integration', label: 'AI Integration', type: 'textarea', example: 'Used AI to personalize the onboarding experience' },
    ],
    TrendInsightPost: [
        { name: 'trend', label: 'Trend', type: 'text', example: 'The rise of AI-powered content creation' },
        { name: 'implication', label: 'Implication', type: 'textarea', example: 'Marketers need to adapt to new technologies' },
        { name: 'ai_angle', label: 'AI Angle', type: 'textarea', example: 'How AI can be used to create more effective content' },
    ],
    ListiclePost: [
        { name: 'list_topic', label: 'List Topic', type: 'text', example: '5 ways to improve your social media presence' },
    ],
    HotTakePost: [
        { name: 'hot_take', label: 'Hot Take', type: 'textarea', example: 'Instagram is dead for organic growth' },
    ],
    MotivationalPost: [
        { name: 'struggle', label: 'Struggle', type: 'text', example: 'Feeling uninspired' },
    ],
    OfferPost: [
        { name: 'offer_type', label: 'Offer Type', type: 'text', example: 'Free consultation' },
    ],
    LinkedInFounderStory: [
        { name: 'milestone', label: 'Milestone', type: 'text', example: 'Secured $1M in funding' },
        { name: 'struggle', label: 'Struggle', type: 'text', example: 'Faced hundreds of rejections' },
    ],
    LinkedInTrend: [
        { name: 'trend', label: 'Trend', type: 'text', example: 'The increasing importance of personal branding on LinkedIn' },
        { name: 'implication', label: 'Implication', type: 'textarea', example: 'Professionals need to actively manage their LinkedIn presence' },
    ],
    LinkedInContrarian: [
        { name: 'contrarian_truth', label: 'Contrarian Truth', type: 'textarea', example: 'Your LinkedIn profile is not your resume' },
        { name: 'reasoning', label: 'Reasoning', type: 'textarea', example: 'It\'s a landing page for your career' },
    ],
    LinkedInCaseStudy: [
        { name: 'client_type', label: 'Client Type', type: 'text', example: 'Tech startups' },
        { name: 'problem', label: 'Problem', type: 'textarea', example: 'Struggling to generate leads on LinkedIn' },
        { name: 'solution', label: 'Solution', type: 'textarea', example: 'Implemented a targeted outreach campaign' },
        { name: 'result', label: 'Result', type: 'text', example: 'Generated 50 new leads in one month' },
    ],
    LinkedInListicle: [
        { name: 'list_topic', label: 'List Topic', type: 'text', example: '3 ways to optimize your LinkedIn profile' },
    ],
    LinkedInHotTake: [
        { name: 'hot_take', label: 'Hot Take', type: 'textarea', example: 'LinkedIn endorsements are meaningless' },
        { name: 'reasoning', label: 'Reasoning', type: 'textarea', example: 'They are often given without much thought' },
    ],
    LinkedInMotivation: [
        { name: 'struggle', label: 'Struggle', type: 'text', example: 'Fear of posting on LinkedIn' },
    ],
    LinkedInHiring: [
        { name: 'role', label: 'Role', type: 'text', example: 'Software Engineer' },
        { name: 'company', label: 'Company', type: 'text', example: 'Acme Corporation' },
        { name: 'mission', label: 'Mission', type: 'textarea', example: 'To build the future of software development' },
        { name: 'culture', label: 'Culture', type: 'textarea', example: 'We value collaboration, innovation, and diversity' },
    ],
    LinkedInOffer: [
        { name: 'event_name', label: 'Event Name', type: 'text', example: 'The LinkedIn Growth Summit' },
        { name: 'offer_type', label: 'Offer Type', type: 'text', example: 'Free webinar' },
    ],
    Generic: [],
  }), []);

  const fields = useMemo(() => {
    return [...commonFields, ...(templateFields[templateName] || [])];
  }, [templateName, commonFields, templateFields]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setSelectedPosts([]);
    setError('');
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const toneOfVoice = formData.getAll('tone_of_voice');
    if (toneOfVoice) {
      data.tone_of_voice = toneOfVoice.join(', ');
    }

    try {
      const response = await fetch("/api/ai/content-planner/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ templateName, variables: data }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate content");
      }

      const result = await response.json();
      setPosts(result.posts);
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Failed to generate content");
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
      <div className="w-full max-w-4xl mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </button>
      </div>
      <div className="rounded-lg border border-white/10 bg-black/20 p-6">
        <h2 className="text-2xl font-bold mb-4">AI Content Planner</h2>
        <p className="text-gray-400 mb-4">
          Answer the following questions to generate a personalized content plan.
        </p>
        {templateName && templateName !== 'Generic' && (
          <TemplateInfo
            templateName={templateName}
            commonFields={commonFields}
            templateFields={templateFields}
          />
        )}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <DynamicForm fields={fields} defaultValue={nicheDefaultValue} />
          <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700" disabled={loading}>
            {loading ? "Generating..." : "Generate Content Plan"}
          </button>
        </form>
        {loading && (
          <div className="mt-4">
            <p>Generating content...</p>
          </div>
        )}
        {error && (
          <div className="mt-4 p-4 bg-red-900/30 border border-red-600/50 rounded-md">
            <p className="text-red-400">{error}</p>
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
