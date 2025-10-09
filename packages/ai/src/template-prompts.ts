export const buildFreebieAlertPrompt = (variables: any) => {
  const { mission_vision, target_audience, core_values, tone_of_voice, products_services, competitors, unique_selling_proposition, content_goals, productName, benefit } = variables;

  return `You are a world-class brand strategist and social media expert.
Your task is to create a 5-day social media content plan based on the user's brand information and the freebie they are offering.

The goal is to promote the freebie and build the business/brand into a trusted, likeable, authority, and relatable brand.

**Brand Information:**
- **Mission and Vision:** ${mission_vision}
- **Target Audience:** ${target_audience}
- **Core Values:** ${core_values}
- **Tone of Voice:** ${tone_of_voice}
- **Key Products/Services:** ${products_services}
- **Main Competitors:** ${competitors}
- **Unique Selling Proposition:** ${unique_selling_proposition}
- **Content Goals:** ${content_goals}

**Freebie Information:**
- **Product Name:** ${productName}
- **Benefit:** ${benefit}

**Instructions for each post:**
- **Hook:** Start with a relatable question, surprising stat, or bold statement related to the freebie.
- **Key Insight/Message:** Deliver core value and connect it to the freebie.
- **Example/Analogy:** Use a real-world business example or relatable analogy.
- **Call-to-Action (CTA):** Encourage users to download the freebie.
- **Hashtags:** Include 3–5 relevant hashtags for reach.
- **Image Prompt:** Provide a detailed text-to-image generator prompt for a scroll-stopping visual to match the post theme.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should be natural-sounding and not salesy.
- Avoid jargon; focus on ROI, efficiency, creativity, and human connection.
- Do not include links.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};

export const buildPaidCoursePrompt = (variables: any) => {
  const { mission_vision, target_audience, core_values, tone_of_voice, products_services, competitors, unique_selling_proposition, content_goals, courseName, price, discount } = variables;

  return `You are a world-class brand strategist and social media expert.
Your task is to create a 5-day social media content plan based on the user's brand information and the paid course they are offering.

The goal is to promote the paid course and build the business/brand into a trusted, likeable, authority, and relatable brand.

**Brand Information:**
- **Mission and Vision:** ${mission_vision}
- **Target Audience:** ${target_audience}
- **Core Values:** ${core_values}
- **Tone of Voice:** ${tone_of_voice}
- **Key Products/Services:** ${products_services}
- **Main Competitors:** ${competitors}
- **Unique Selling Proposition:** ${unique_selling_proposition}
- **Content Goals:** ${content_goals}

**Paid Course Information:**
- **Course Name:** ${courseName}
- **Price:** ${price}
- **Discount:** ${discount}

**Instructions for each post:**
- **Hook:** Start with a relatable question, surprising stat, or bold statement related to the course.
- **Key Insight/Message:** Deliver core value and connect it to the course.
- **Example/Analogy:** Use a real-world business example or relatable analogy.
- **Call-to-Action (CTA):** Encourage users to enroll in the course.
- **Hashtags:** Include 3–5 relevant hashtags for reach.
- **Image Prompt:** Provide a detailed text-to-image generator prompt for a scroll-stopping visual to match the post theme.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should be natural-sounding and persuasive.
- Avoid jargon; focus on ROI, efficiency, creativity, and human connection.
- Do not include links.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};

export const buildGenericPrompt = (variables: any) => {
  const { mission_vision, target_audience, core_values, tone_of_voice, products_services, competitors, unique_selling_proposition, content_goals } = variables;

  return `You are a world-class brand strategist and social media expert.
Your task is to create a 5-day social media content plan based on the user's brand information.

The goal is to build the business/brand into a trusted, likeable, authority, and relatable brand.

**Brand Information:**
- **Mission and Vision:** ${mission_vision}
- **Target Audience:** ${target_audience}
- **Core Values:** ${core_values}
- **Tone of Voice:** ${tone_of_voice}
- **Key Products/Services:** ${products_services}
- **Main Competitors:** ${competitors}
- **Unique Selling Proposition:** ${unique_selling_proposition}
- **Content Goals:** ${content_goals}

**Instructions for each post:**
- **Hook:** Start with a relatable question, surprising stat, or bold statement that resonates with the target audience.
- **Key Insight/Message:** Deliver core value that aligns with the brand's mission and values.
- **Example/Analogy:** Use a real-world business example or relatable analogy.
- **Call-to-Action (CTA):** Encourage engagement, sharing, or visiting the brand's profile.
- **Hashtags:** Include 3–5 relevant hashtags for reach.
- **Image Prompt:** Provide a detailed text-to-image generator prompt for a scroll-stopping visual to match the post theme.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should be natural-sounding and authentic.
- Avoid jargon; focus on ROI, efficiency, creativity, and human connection.
- Do not include links.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};

export const buildQuickTutorialPrompt = (variables: any) => {
  const { mission_vision, target_audience, core_values, tone_of_voice, products_services, competitors, unique_selling_proposition, content_goals, tutorialTopic, tutorialDuration, keyTakeaways } = variables;

  return `You are a world-class brand strategist and social media expert.
Your task is to create a 5-day social media content plan based on the user's brand information and the tutorial they are creating.

The goal is to promote the tutorial and build the business/brand into a trusted, likeable, authority, and relatable brand.

**Brand Information:**
- **Mission and Vision:** ${mission_vision}
- **Target Audience:** ${target_audience}
- **Core Values:** ${core_values}
- **Tone of Voice:** ${tone_of_voice}
- **Key Products/Services:** ${products_services}
- **Main Competitors:** ${competitors}
- **Unique Selling Proposition:** ${unique_selling_proposition}
- **Content Goals:** ${content_goals}

**Tutorial Information:**
- **Tutorial Topic:** ${tutorialTopic}
- **Duration:** ${tutorialDuration}
- **Key Takeaways:** ${keyTakeaways}

**Instructions for each post:**
- **Hook:** Start with a relatable question, surprising stat, or bold statement related to the tutorial topic.
- **Key Insight/Message:** Deliver core value and connect it to the tutorial.
- **Example/Analogy:** Use a real-world business example or relatable analogy.
- **Call-to-Action (CTA):** Encourage users to watch/read the tutorial.
- **Hashtags:** Include 3–5 relevant hashtags for reach.
- **Image Prompt:** Provide a detailed text-to-image generator prompt for a scroll-stopping visual to match the post theme.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should be natural-sounding and educational.
- Avoid jargon; focus on ROI, efficiency, creativity, and human connection.
- Do not include links.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};

export const buildCarouselPostPrompt = (variables: any) => {
  const { mission_vision, target_audience, core_values, tone_of_voice, products_services, competitors, unique_selling_proposition, content_goals, carouselTopic, numberOfSlides } = variables;

  return `You are a world-class brand strategist and social media expert.
Your task is to create a 5-day social media content plan based on the user's brand information and the carousel post they are creating.

The goal is to promote the carousel content and build the business/brand into a trusted, likeable, authority, and relatable brand.

**Brand Information:**
- **Mission and Vision:** ${mission_vision}
- **Target Audience:** ${target_audience}
- **Core Values:** ${core_values}
- **Tone of Voice:** ${tone_of_voice}
- **Key Products/Services:** ${products_services}
- **Main Competitors:** ${competitors}
- **Unique Selling Proposition:** ${unique_selling_proposition}
- **Content Goals:** ${content_goals}

**Carousel Information:**
- **Carousel Topic:** ${carouselTopic}
- **Number of Slides:** ${numberOfSlides}

**Instructions for each post:**
- **Hook:** Start with a relatable question, surprising stat, or bold statement related to the carousel topic.
- **Key Insight/Message:** Deliver core value and encourage users to swipe through.
- **Example/Analogy:** Use a real-world business example or relatable analogy.
- **Call-to-Action (CTA):** Encourage users to swipe through the carousel.
- **Hashtags:** Include 3–5 relevant hashtags for reach.
- **Image Prompt:** Provide a detailed text-to-image generator prompt for a scroll-stopping visual to match the post theme.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should be natural-sounding and engaging.
- Avoid jargon; focus on ROI, efficiency, creativity, and human connection.
- Do not include links.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};

export const buildPromoOfferPrompt = (variables: any) => {
  const { mission_vision, target_audience, core_values, tone_of_voice, products_services, competitors, unique_selling_proposition, content_goals, offerDetails, discountPercentage, expirationDate } = variables;

  return `You are a world-class brand strategist and social media expert.
Your task is to create a 5-day social media content plan based on the user's brand information and the promotional offer they are running.

The goal is to promote the offer and build the business/brand into a trusted, likeable, authority, and relatable brand.

**Brand Information:**
- **Mission and Vision:** ${mission_vision}
- **Target Audience:** ${target_audience}
- **Core Values:** ${core_values}
- **Tone of Voice:** ${tone_of_voice}
- **Key Products/Services:** ${products_services}
- **Main Competitors:** ${competitors}
- **Unique Selling Proposition:** ${unique_selling_proposition}
- **Content Goals:** ${content_goals}

**Promotional Offer Information:**
- **Offer Details:** ${offerDetails}
- **Discount Percentage:** ${discountPercentage}
- **Expiration Date:** ${expirationDate}

**Instructions for each post:**
- **Hook:** Start with urgency and excitement related to the promotional offer.
- **Key Insight/Message:** Highlight the value and limited-time nature of the offer.
- **Example/Analogy:** Use a real-world business example or relatable analogy.
- **Call-to-Action (CTA):** Encourage users to take advantage of the offer before it expires.
- **Hashtags:** Include 3–5 relevant hashtags for reach.
- **Image Prompt:** Provide a detailed text-to-image generator prompt for a scroll-stopping visual to match the post theme.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should create urgency and excitement.
- Avoid jargon; focus on ROI, efficiency, creativity, and human connection.
- Do not include links.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};

export const buildProductLaunchPrompt = (variables: any) => {
  const { mission_vision, target_audience, core_values, tone_of_voice, products_services, competitors, unique_selling_proposition, content_goals, productName, productDescription, launchDate } = variables;

  return `You are a world-class brand strategist and social media expert.
Your task is to create a 5-day social media content plan based on the user's brand information and the product they are launching.

The goal is to build anticipation for the product launch and position the business/brand as innovative and customer-focused.

**Brand Information:**
- **Mission and Vision:** ${mission_vision}
- **Target Audience:** ${target_audience}
- **Core Values:** ${core_values}
- **Tone of Voice:** ${tone_of_voice}
- **Key Products/Services:** ${products_services}
- **Main Competitors:** ${competitors}
- **Unique Selling Proposition:** ${unique_selling_proposition}
- **Content Goals:** ${content_goals}

**Product Launch Information:**
- **Product Name:** ${productName}
- **Product Description:** ${productDescription}
- **Launch Date:** ${launchDate}

**Instructions for each post:**
- **Hook:** Start with excitement and anticipation related to the product launch.
- **Key Insight/Message:** Highlight the innovative features and benefits of the product.
- **Example/Analogy:** Use a real-world business example or relatable analogy.
- **Call-to-Action (CTA):** Encourage users to stay tuned for the launch or sign up for updates.
- **Hashtags:** Include 3–5 relevant hashtags for reach.
- **Image Prompt:** Provide a detailed text-to-image generator prompt for a scroll-stopping visual to match the post theme.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should build anticipation and excitement.
- Avoid jargon; focus on ROI, efficiency, creativity, and human connection.
- Do not include links.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};

export const buildMondayMotivationPrompt = (variables: any) => {
  const { mission_vision, target_audience, core_values, tone_of_voice, products_services, competitors, unique_selling_proposition, content_goals, motivationTheme } = variables;

  return `You are a world-class brand strategist and social media expert.
Your task is to create a 5-day social media content plan based on the user's brand information with a Monday Motivation theme.

The goal is to inspire and motivate the target audience while building the business/brand into a trusted, likeable, authority, and relatable brand.

**Brand Information:**
- **Mission and Vision:** ${mission_vision}
- **Target Audience:** ${target_audience}
- **Core Values:** ${core_values}
- **Tone of Voice:** ${tone_of_voice}
- **Key Products/Services:** ${products_services}
- **Main Competitors:** ${competitors}
- **Unique Selling Proposition:** ${unique_selling_proposition}
- **Content Goals:** ${content_goals}

**Motivation Theme:** ${motivationTheme}

**Instructions for each post:**
- **Hook:** Start with an inspiring quote, question, or statement related to the motivation theme.
- **Key Insight/Message:** Deliver motivational value that resonates with the target audience.
- **Example/Analogy:** Use a real-world success story or relatable analogy.
- **Call-to-Action (CTA):** Encourage engagement, reflection, or action.
- **Hashtags:** Include 3–5 relevant hashtags for reach (including #MondayMotivation).
- **Image Prompt:** Provide a detailed text-to-image generator prompt for a scroll-stopping visual to match the post theme.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should be uplifting and authentic.
- Avoid jargon; focus on inspiration, growth, and human connection.
- Do not include links.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildAIAcceleratedFounderPostPrompt = (variables: any) => {
  const {niche, target_audience, ai_integration, tone_of_voice, offer_type } = variables;

  return `
Your task is to create a 5-day compelling, scroll-stopping social media content in the voice of a battle-tested founder who has scaled a business to 7–9 figures.

**Brand Information:**
**Niche:** ${niche} [Insert niche, e.g., fitness coaching, e-commerce, real estate wholesaling, SaaS for dentists, freelance copywriting]
**Core Contrarian Truth:** [Insert a blunt, counterintuitive insight that flips common belief in this ${niche}]
**Framework Name:** [Give your system a punchy name, e.g., The $10K Client Filter, The 3-Day Offer Test, The 5-Seller Sprint]
**Target Audience:** ${target_audience} [Be hyper-specific: e.g., newly licensed real estate agents in Texas with <6 months experience, freelance designers tired of scope creep, e-commerce founders stuck at $20K/month]
**AI Integration (Optional):** ${ai_integration} [Briefly describe how AI accelerates results in this niche—e.g., AI scrapes client pain points from Reddit, AI writes 30 cold DMs in 2 minutes, AI analyzes property comps instantly]
**Offer Type:** ${offer_type} [Choose: free masterclass / private workshop / replay to get access]
**Offer Hook:** [What they’ll learn/do—e.g., launch your first offer in 72 hours, find 10 dream clients without cold outreach, validate your idea before spending a dime]

Use this exact structure:

1. OPEN WITH A CONTRARIAN, BRUTAL TRUTH OR PERSONAL FAILURE
Start with one short, hard-hitting sentence that exposes a painful reality or debunks a myth in [Niche]. Make it feel earned—not theoretical.

2. INTRODUCE A SIMPLE, ACTIONABLE FRAMEWORK OR TEST
Present [Framework Name]—a 3–5 step system that turns confusion into clarity. For each step:

Replace vague language with hyper-specific examples (e.g., not “clients” → “e-commerce founders running Shopify stores with 2–5 SKUs and 30% cart abandonment”)
Include real math or metrics (e.g., “5 DMs × 20% reply × 2 calls = 1 client”)
3. CONTRAST “MOST PEOPLE” VS. “WINNERS”
Use sharp comparisons:

“Most ${target_audience}… / Winners…”
“Then vs. Now” (especially if AI changes the game)
Emphasize speed, specificity, or systems as the differentiator.
4. INTEGRATE AI AS A FORCE MULTIPLIER (if applicable)
Show how ${ai_integration} compresses months of work into hours. Use concrete verbs: scrape, generate, analyze, draft, validate.

5. CLOSE WITH A HIGH-VALUE, LOW-FRICTION OFFER
End with:

A free but exclusive-feeling ${offer_type} for ${target_audience}
Clear outcome: “You’ll learn how to [Offer Hook]”
Reassurance: “No experience required” or “Even if you’ve never…”
CTA: “👉 Grab your spot, drop a comment here: ”
Tone Rules: 
Use ${tone_of_voice}.
Confident. Direct. Slightly provocative.
Short sentences. Fragments for rhythm.
Zero fluff. No “tips” or “hacks.”
Anchor credibility in real results (e.g., “scaled to $X,” “helped X clients,” “built X in Y time”)
Speak to doers, not dreamers.
✅ Example Usage (Filled-In)
Niche: Online course creators
Core Contrarian Truth: “If you haven’t sold 10 copies before you finish your course, you’re building a museum—not a business.”
Framework Name: The Pre-Sell Validation Loop
Target Audience: Coaches and consultants who’ve spent 3+ months building a course no one’s bought
AI Integration: AI analyzes past student feedback to draft your offer, email sequence, and sales page in one afternoon
Offer Type: free masterclass
Offer Hook: validate demand and sell your first 10 spots before recording a single lesson

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`
};
export const buildAuthorityPostPrompt = (variables: any) => {
  const { niche, target_audience, contrarian_truth, tone_of_voice, credibility_anchor } = variables;

  return `
Your task is to create a bold, authority-building post that positions the founder as a thought leader in ${niche}.

**Brand Info:**
- Niche: ${niche}
- Target Audience: ${target_audience}
- Contrarian Truth: ${contrarian_truth}
- Credibility Anchor: ${credibility_anchor} (e.g., "scaled to $5M ARR", "helped 200+ clients")

Structure:
1. OPEN with a sharp contrarian statement that challenges common beliefs in ${niche}.
2. SHARE a personal story or lesson that proves the contrarian truth.
3. TEACH one actionable insight that ${target_audience} can apply immediately.
4. CLOSE with a confident takeaway that reinforces authority.

Tone: ${tone_of_voice}. Direct. Confident. Human. No fluff.
**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildFounderJourneyPostPrompt = (variables: any) => {
  const { niche, founder_story, milestone, struggle, lesson, tone_of_voice } = variables;

  return `
Create a behind-the-scenes founder story post that feels raw and relatable.

**Inputs:**
- Niche: ${niche}
- Founder Story: ${founder_story}
- Milestone: ${milestone}
- Struggle: ${struggle}
- Lesson Learned: ${lesson}

Structure:
1. OPEN with a vulnerable or surprising detail from the founder’s journey.
2. DESCRIBE the ${struggle} in vivid, human terms.
3. SHARE the turning point that led to ${milestone}.
4. TEACH the ${lesson} in one or two punchy sentences.
5. CLOSE with encouragement for others in ${niche}.

Tone: ${tone_of_voice}. Honest. Relatable. Human.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.
`;
};
export const buildCaseStudyPostPrompt = (variables: any) => {
  const { client_type, problem, solution, result, ai_integration, tone_of_voice } = variables;

  return `
Write a case study style post that highlights a client win.

**Inputs:**
- Client Type: ${client_type}
- Problem: ${problem}
- Solution: ${solution}
- Result: ${result}
- AI Integration: ${ai_integration}

Structure:
1. OPEN with the painful problem the ${client_type} faced.
2. SHOW the simple solution applied (include ${ai_integration} if relevant).
3. QUANTIFY the result with numbers (e.g., revenue, time saved, % growth).
4. CLOSE with a takeaway that inspires similar ${client_type}.

Tone: ${tone_of_voice}. Clear. Results-driven. Inspiring.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildHowToPostPrompt = (variables: any) => {
  const { niche, target_audience, framework_name, tone_of_voice } = variables;

  return `
Write an educational "how-to" post for ${target_audience} in ${niche}.

**Inputs:**
- Framework Name: ${framework_name}

Structure:
1. HOOK with a bold promise or myth-busting statement.
2. INTRODUCE the ${framework_name}.
3. BREAK IT DOWN in 3–5 clear steps with specific, actionable detail.
4. CLOSE with encouragement and a CTA to try it today.

Tone: ${tone_of_voice}. Practical. Clear. Teacher-like but approachable.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildMythBustingPostPrompt = (variables: any) => {
  const { niche, myth, truth, tone_of_voice } = variables;

  return `
Create a myth-busting post for ${niche}.

**Inputs:**
- Myth: ${myth}
- Truth: ${truth}

Structure:
1. OPEN with the myth stated as if it’s common knowledge.
2. FLIP it with the blunt truth.
3. PROVE it with a practical and relatable example.
4. CLOSE with a call to think differently.

Tone: ${tone_of_voice}. Bold. Direct. Slightly provocative.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildTrendInsightPostPrompt = (variables: any) => {
  const { niche, trend, implication, ai_angle, tone_of_voice } = variables;

  return `
Write a trend/insight post for ${niche}.

**Inputs:**
- Trend: ${trend}
- Implication: ${implication}
- AI Angle: ${ai_angle}

Structure:
1. OPEN with a surprising stat or headline about ${trend}.
2. EXPLAIN why it matters for ${niche}.
3. SHOW how ${ai_angle} changes the game.
4. CLOSE with a prediction or challenge to ${niche} leaders.

Tone: ${tone_of_voice}. Forward-looking. Analytical. Confident.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildListiclePostPrompt = (variables: any) => {
  const { niche, target_audience, list_topic, items, tone_of_voice } = variables;

  return `
Write a listicle-style post for ${target_audience} in ${niche}.

**Inputs:**
- Topic: ${list_topic}
- Items: ${items} (3–7 punchy items)

Structure:
1. HOOK with a bold statement about why ${list_topic} matters.
2. LIST the ${items}, each with 1–2 sentences of detail.
3. CLOSE with a challenge or CTA to apply one today.

Tone: ${tone_of_voice}. Punchy. Skimmable. Shareable.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildHotTakePostPrompt = (variables: any) => {
  const { niche, hot_take, tone_of_voice } = variables;

  return `
Write a hot-take opinion post for ${niche}.

**Inputs:**
- Hot Take: ${hot_take}

Structure:
1. OPEN with the hot take in one blunt sentence.
2. DEFEND it with a sound and practical reasoning.
3. CONTRAST with what "most people" believe.
4. CLOSE with a provocative question to spark comments.

Tone: ${tone_of_voice}. Bold. Confident. Debate-starting.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildMotivationalPostPrompt = (variables: any) => {
  const { niche, target_audience, struggle, mindset_shift, tone_of_voice } = variables;

  return `
Write a motivational mindset post for ${target_audience} in ${niche}.

**Inputs:**
- Struggle: ${struggle}
- Mindset Shift: ${mindset_shift}

Structure:
1. OPEN with a relatable description of ${struggle}.
2. REVEAL the mindset shift that changes everything.
3. GIVE a short example of the shift in action.
4. CLOSE with encouragement and a call to keep going.

Tone: ${tone_of_voice}. Uplifting. Direct. No clichés.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildOfferPostPrompt = (variables: any) => {
  const { niche, target_audience, offer_type, offer_hook, urgency, tone_of_voice } = variables;

  return `
Write a high-converting offer post for ${target_audience} in ${niche}.

**Inputs:**
- Offer Type: ${offer_type}
- Offer Hook: ${offer_hook}

Structure:
1. HOOK with a painful problem ${target_audience} face.
2. PRESENT the ${offer_type} as the solution.
3. PROMISE the ${offer_hook} outcome.
4. ADD urgency.
5. CLOSE with a clear CTA.

Tone: ${tone_of_voice}. Persuasive. Direct. No fluff.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInFounderStoryPrompt = (vars: any) => {
  const { niche, milestone, struggle, lesson, tone_of_voice } = vars;

  return `
Write a LinkedIn post that shares a founder’s journey in ${niche}.

Inputs:
- Milestone: ${milestone}
- Struggle: ${struggle}
- Lesson: ${lesson}

Structure:
1. OPEN with a vulnerable or surprising detail about ${struggle}.
2. SHOW the turning point that led to ${milestone}.
3. TEACH the ${lesson} in one or two punchy sentences.
4. CLOSE with encouragement for peers in ${niche}.

Tone: ${tone_of_voice}. Professional yet human. Relatable but authoritative.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInTrendPrompt = (vars: any) => {
  const { niche, trend, stat, implication, tone_of_voice } = vars;

  return `
Write a LinkedIn post analyzing a trend in ${niche}.

Inputs:
- Trend: ${trend}
- Stat: ${stat}
- Implication: ${implication}

Structure:
1. HOOK with ${stat} that grabs attention.
2. EXPLAIN what ${trend} means for ${niche}.
3. SHARE ${implication} in practical terms.
4. CLOSE with a prediction or open-ended question.

Tone: ${tone_of_voice}. Analytical. Forward-looking. Engaging.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInContrarianPrompt = (vars: any) => {
  const { niche, contrarian_truth, reasoning, tone_of_voice } = vars;

  return `
Write a contrarian thought-leadership post for ${niche}.

Inputs:
- Contrarian Truth: ${contrarian_truth}
- Reasoning: ${reasoning}

Structure:
1. OPEN with the contrarian truth in one blunt sentence.
2. DEFEND it with ${reasoning}.
3. PROVE it with 1-2 practical examples.
4. CLOSE with a challenge to rethink assumptions.

Tone: ${tone_of_voice}. Confident. Provocative. Respectful.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInCaseStudyPrompt = (vars: any) => {
  const { client_type, problem, solution, result, credibility_anchor, tone_of_voice } = vars;

  return `
Write a LinkedIn case study post.

Inputs:
- Client Type: ${client_type}
- Problem: ${problem}
- Solution: ${solution}
- Result: ${result}
- Credibility Anchor: ${credibility_anchor}

Structure:
1. OPEN with the ${problem} the ${client_type} faced.
2. SHOW the ${solution} applied.
3. QUANTIFY the ${result}.
4. CLOSE with ${credibility_anchor} and a takeaway.

Tone: ${tone_of_voice}. Results-driven. Professional. Inspiring.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInHowToPrompt = (vars: any) => {
  const { niche, framework_name, target_audience, tone_of_voice } = vars;

  return `
Write a LinkedIn how-to post for ${target_audience} in ${niche}.

Inputs:
- Framework: ${framework_name}

Structure:
1. HOOK with a bold promise or myth-busting statement.
2. INTRODUCE the ${framework_name}.
3. BREAK IT DOWN in 3-5 steps with specifics.
4. CLOSE with encouragement to try it.

Tone: ${tone_of_voice}. Clear. Practical. Teacher-like.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInListiclePrompt = (vars: any) => {
  const { niche, list_topic, items, target_audience, tone_of_voice } = vars;

  return `
Write a LinkedIn listicle post.

Inputs:
- Topic: ${list_topic}
- Items: ${items}
- Audience: ${target_audience}

Structure:
1. HOOK with why ${list_topic} matters.
2. LIST ${items} with 1–2 sentences each.
3. CLOSE with a challenge or CTA.

Tone: ${tone_of_voice}. Punchy. Skimmable. Shareable.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInHotTakePrompt = (vars: any) => {
  const { niche, hot_take, reasoning, tone_of_voice } = vars;

  return `
Write a LinkedIn hot-take post for ${niche}.

Inputs:
- Hot Take: ${hot_take}
- Reasoning: ${reasoning}

Structure:
1. OPEN with the hot take in one sentence.
2. DEFEND it with ${reasoning}.
3. CONTRAST with what "most people" believe.
4. CLOSE with a provocative question.

Tone: ${tone_of_voice}. Bold. Debate-starting. Professional.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInMotivationPrompt = (vars: any) => {
  const { niche, struggle, mindset_shift, target_audience, tone_of_voice } = vars;

  return `
Write a motivational LinkedIn post.

Inputs:
- Struggle: ${struggle}
- Mindset Shift: ${mindset_shift}
- Audience: ${target_audience}

Structure:
1. OPEN with a relatable ${struggle}.
2. REVEAL the ${mindset_shift}.
3. GIVE an example of applying it.
4. CLOSE with encouragement.

Tone: ${tone_of_voice}. Uplifting. Direct. No clichés.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInHiringPrompt = (vars: any) => {
  const { role, company, mission, culture, tone_of_voice } = vars;

  return `
Write a LinkedIn hiring announcement.

Inputs:
- Role: ${role}
- Company: ${company}
- Mission: ${mission}
- Culture: ${culture}

Structure:
1. OPEN with excitement about growth.
2. DESCRIBE the ${role} and why it matters.
3. SHARE ${mission} and ${culture}.
4. CLOSE with a clear CTA to apply.

Tone: ${tone_of_voice}. Professional. Warm. Inviting.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInOfferPrompt = (vars: any) => {
  const { event_name, offer_type, target_audience, tone_of_voice } = vars;

  return `
Write a LinkedIn promotional post.

Inputs:
- Event: ${event_name}
- Offer Type: ${offer_type}
- Hook:
- Urgency:
- Audience: ${target_audience}

Structure:
1. HOOK with a pain point ${target_audience} face.
2. PRESENT the ${offer_type} (${event_name}) as the solution.
3. PROMISE the HOOK.
4. ADD urgency.
5. CLOSE with a CTA.

Tone: ${tone_of_voice}. Persuasive. Professional. No fluff.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Do not include explanations, markdown, or extra text.
Ensure JSON is syntactically correct with no trailing commas.`;
};