export const buildFreebieAlertPrompt = (variables: any) => {
  const { target_audience, tone_of_voice, productName, benefit } = variables;

  return `You are a world-class brand strategist and social media expert.
Your task is to create a 5-day social media content plan based on the user's brand information and the freebie they are offering.

The goal is to promote the freebie and build the business/brand into a trusted, likeable, authority, and relatable brand.

**Brand Information:**
- **Target Audience:** ${target_audience}
- **Tone of Voice:** ${tone_of_voice}

**Freebie Information:**
- **Product Name:** ${productName}
- **Benefit:** ${benefit}

**Instructions for each post:**
- Start with a relatable question, surprising stat, or bold statement related to the freebie.
- Deliver core value and connect it to the freebie.
- Use a real-world business example or relatable analogy.
- Encourage users to download the freebie.
- Include 3–5 relevant hashtags for reach.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should be natural-sounding and not salesy.
- Avoid jargon; focus on ROI, efficiency, creativity, and human connection.
- Do not include links.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};

export const buildPaidCoursePrompt = (variables: any) => {
  const { target_audience, tone_of_voice, courseName, price, discount } = variables;

  return `You are a world-class brand strategist and social media expert.
Your task is to create a 5-day social media content plan based on the user's brand information and the paid course they are offering.

The goal is to promote the paid course and build the business/brand into a trusted, likeable, authority, and relatable brand.

**Brand Information:**
- **Target Audience:** ${target_audience}
- **Tone of Voice:** ${tone_of_voice}

**Paid Course Information:**
- **Course Name:** ${courseName}
- **Price:** ${price}
- **Discount:** ${discount}

**Instructions for each post:**
- Start with a relatable question, surprising stat, or bold statement related to the course.
- Deliver core value and connect it to the course.
- Use a real-world business example or relatable analogy.
- Encourage users to enroll in the course.
- Include 3–5 relevant hashtags for reach.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should be natural-sounding and persuasive.
- Avoid jargon; focus on ROI, efficiency, creativity, and human connection.
- Do not include links.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};

export const buildGenericPrompt = (variables: any) => {
  const { target_audience, tone_of_voice} = variables;

  return `You are a world-class brand strategist and social media expert.
Your task is to create a 5-day social media content plan based on the user's brand information.

The goal is to build the business/brand into a trusted, likeable, authority, and relatable brand.

**Brand Information:**
- **Target Audience:** ${target_audience}
- **Tone of Voice:** ${tone_of_voice}

**Instructions for each post:**
- Start with a surprising stat, or bold statement that resonates with the target audience.
- Deliver core value that aligns with the brand's mission and values.
- Use a real-world business example or relatable analogy.
- Encourage engagement, sharing, or visiting the brand's profile.
- Include 3–5 relevant hashtags for reach.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should be natural-sounding and authentic.
- Avoid jargon; focus on ROI, efficiency, creativity, and human connection.
- Do not include links.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};

export const buildQuickTutorialPrompt = (variables: any) => {
  const { target_audience, tone_of_voice, tutorialTopic, tutorialDuration, keyTakeaways } = variables;

  return `You are a world-class brand strategist and social media expert.
Your task is to create a 5-day social media content plan based on the user's brand information and the tutorial they are creating.

The goal is to promote the tutorial and build the business/brand into a trusted, likeable, authority, and relatable brand.

**Brand Information:**
- **Target Audience:** ${target_audience}
- **Tone of Voice:** ${tone_of_voice}

**Tutorial Information:**
- **Tutorial Topic:** ${tutorialTopic}
- **Duration:** ${tutorialDuration}
- **Key Takeaways:** ${keyTakeaways}

**Instructions for each post:**
- Start with a surprising stat, or bold statement related to the tutorial topic.
- Deliver core value and connect it to the tutorial.
- Use a real-world business example or relatable analogy.
- Encourage users to watch/read the tutorial.
- Include 3–5 relevant hashtags for reach.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should be natural-sounding and educational.
- Avoid jargon; focus on ROI, efficiency, creativity, and human connection.
- Do not include links.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};

export const buildCarouselPostPrompt = (variables: any) => {
  const { target_audience, tone_of_voice, carouselTopic, numberOfSlides } = variables;

  return `You are a world-class brand strategist and social media expert.
Your task is to create a 5-day social media content plan based on the user's brand information and the carousel post they are creating.

The goal is to promote the carousel content and build the business/brand into a trusted, likeable, authority, and relatable brand.

**Brand Information:**
- **Target Audience:** ${target_audience}
- **Tone of Voice:** ${tone_of_voice}

**Carousel Information:**
- **Carousel Topic:** ${carouselTopic}
- **Number of Slides:** ${numberOfSlides}

**Instructions for each post:**
- Start with a relatable question, surprising stat, or bold statement related to the carousel topic.
- Deliver core value and encourage users to swipe through.
- Use a real-world business example or relatable analogy.
- Encourage users to swipe through the carousel.
- Include 3–5 relevant hashtags for reach.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should be natural-sounding and engaging.
- Avoid jargon; focus on ROI, efficiency, creativity, and human connection.
- Do not include links.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};

export const buildPromoOfferPrompt = (variables: any) => {
  const { target_audience, tone_of_voice, offerDetails, discountPercentage, expirationDate } = variables;

  return `You are a world-class brand strategist and social media expert.
Your task is to create a 5-day social media content plan based on the user's brand information and the promotional offer they are running.

The goal is to promote the offer and build the business/brand into a trusted, likeable, authority, and relatable brand.

**Brand Information:**
- **Target Audience:** ${target_audience}
- **Tone of Voice:** ${tone_of_voice}

**Promotional Offer Information:**
- **Offer Details:** ${offerDetails}
- **Discount Percentage:** ${discountPercentage}
- **Expiration Date:** ${expirationDate}

**Instructions for each post:**
- Start with urgency and excitement related to the promotional offer.
- Highlight the value and limited-time nature of the offer.
- Use a real-world business example or relatable analogy.
- Encourage users to take advantage of the offer before it expires.
- Include 3–5 relevant hashtags for reach.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should create urgency and excitement.
- Avoid jargon; focus on ROI, efficiency, creativity, and human connection.
- Do not include links.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};

export const buildProductLaunchPrompt = (variables: any) => {
  const { target_audience, tone_of_voice, productName, productDescription, launchDate } = variables;

  return `You are a world-class brand strategist and social media expert.
Your task is to create a 5-day social media content plan based on the user's brand information and the product they are launching.

The goal is to build anticipation for the product launch and position the business/brand as innovative and customer-focused.

**Brand Information:**
- **Target Audience:** ${target_audience}
- **Tone of Voice:** ${tone_of_voice}

**Product Launch Information:**
- **Product Name:** ${productName}
- **Product Description:** ${productDescription}
- **Launch Date:** ${launchDate}

**Instructions for each post:**
- Start with excitement and anticipation related to the product launch.
- Highlight the innovative features and benefits of the product.
- Use a real-world business example or relatable analogy.
- Encourage users to stay tuned for the launch or sign up for updates.
- Include 3–5 relevant hashtags for reach.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should build anticipation and excitement.
- Avoid jargon; focus on ROI, efficiency, creativity, and human connection.
- Do not include links.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildAIAcceleratedFounderPostPrompt = (variables: any) => {
  const {niche, target_audience, ai_integration, tone_of_voice, offer_type } = variables;

  return `
Your task is to create a compelling, scroll-stopping social media content in the voice of a battle-tested founder who has scaled a business to 7–9 figures.

**Brand Information:**
**Niche:** ${niche} 
**Target Audience:** ${target_audience}
**AI Integration (Optional):** ${ai_integration}
**Offer Type:** ${offer_type}

Use this exact structure:

1. OPEN WITH A CONTRARIAN, BRUTAL TRUTH OR PERSONAL FAILURE
Start with one short, hard-hitting sentence that exposes a painful reality or debunks a myth in [Niche]. Make it feel earned—not theoretical.
2. INTRODUCE A SIMPLE, ACTIONABLE FRAMEWORK OR TEST
Present a 3–5 step system that turns confusion into clarity. For each step:
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
Ensure JSON is syntactically correct with no trailing commas.`
};
export const buildAuthorityPostPrompt = (variables: any) => {
  const { niche, target_audience, tone_of_voice, credibility_anchor} = variables;

  return `
Your task is to create a bold, authority-building post that positions the founder as a thought leader in ${niche}.

**Brand Info:**
- Niche: ${niche}
- Target Audience: ${target_audience}
- Credibility Anchor: ${credibility_anchor} (e.g., "scaled to $5M ARR", "helped 200+ clients")

Structure:
1. OPEN with a sharp contrarian statement that challenges common beliefs in ${niche}.
2. SHARE a personal story or lesson that proves the contrarian truth.
3. TEACH one actionable insight that ${target_audience} can apply immediately.
4. CLOSE with a confident takeaway that reinforces authority.

Tone: ${tone_of_voice}. Direct. Confident. Human. No fluff.
**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildFounderJourneyPostPrompt = (variables: any) => {
  const { niche, founder_story, milestone, struggle, tone_of_voice } = variables;

  return `
Create a behind-the-scenes founder story post that feels raw and relatable.

**Inputs:**
- Niche: ${niche}
- Founder Story: ${founder_story}
- Milestone: ${milestone}
- Struggle: ${struggle}

Structure:
1. OPEN with a vulnerable or surprising detail from the founder’s journey.
2. DESCRIBE the ${struggle} in vivid, human terms.
3. SHARE the turning point that led to ${milestone}.
4. TEACH a practical lesson in one or two punchy sentences.
5. CLOSE with encouragement for others in ${niche}.

Tone: ${tone_of_voice}. Honest. Relatable. Human.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
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
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildHowToPostPrompt = (variables: any) => {
  const { niche, target_audience, tone_of_voice } = variables;

  return `
Write an educational "how-to" post for ${target_audience} in ${niche}.

Structure:
1. HOOK with a bold promise or myth-busting statement.
2. INTRODUCE a framework [Give your system a punchy name, e.g., The $10K Client Filter, The 3-Day Offer Test, The 5-Seller Sprint]
3. BREAK IT DOWN in 3–5 clear steps with specific, actionable detail.
4. CLOSE with encouragement and a CTA to try it today.

Tone: ${tone_of_voice}. Practical. Clear. Teacher-like but approachable.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildMythBustingPostPrompt = (variables: any) => {
  const { niche, tone_of_voice } = variables;

  return `
Create a myth-busting post for ${niche}.


Structure:
1. OPEN with the myth regarding ${niche}, stated as if it’s common knowledge.
2. FLIP it with the blunt truth.
3. PROVE it with a practical and relatable example.
4. CLOSE with a call to think differently.

Tone: ${tone_of_voice}. Bold. Direct. Slightly provocative.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
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
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildListiclePostPrompt = (variables: any) => {
  const { niche, target_audience, list_topic, tone_of_voice } = variables;

  return `
Write a listicle-style post for ${target_audience} in ${niche}.

**Inputs:**
- Topic: ${list_topic}

Structure FOR EACH POST:
1. HOOK with a bold statement about why ${list_topic} matters.
2. LIST: Include 3–7 actionable items. For each item:
     - Give it a clear title or number
     - Provide 1-2 sentences of explanation and practical detail
     - Include examples or specific tactics where relevant
3. CLOSE with a challenge or CTA to apply one today.

Tone: ${tone_of_voice}. Punchy. Skimmable. Shareable.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete, detailed social media post.
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
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildMotivationalPostPrompt = (variables: any) => {
  const { niche, target_audience, struggle, tone_of_voice } = variables;

  return `
Write a motivational mindset post for ${target_audience} in ${niche}.

**Inputs:**
- Struggle: ${struggle}

Structure:
1. OPEN with a relatable description of ${struggle}.
2. REVEAL the mindset shift that changes everything.
3. GIVE a short example of the shift in action.
4. CLOSE with encouragement and a call to keep going.

Tone: ${tone_of_voice}. Uplifting. Direct. No clichés.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildOfferPostPrompt = (variables: any) => {
  const { niche, target_audience, offer_type, tone_of_voice } = variables;

  return `
Write a high-converting offer post for ${target_audience} in ${niche}.

**Inputs:**
- Offer Type: ${offer_type}

Structure:
1. HOOK with a painful problem ${target_audience} face.
2. PRESENT the ${offer_type} as the solution.
3. PROMISE the Hook outcome.
4. ADD urgency.
5. CLOSE with a clear CTA.

Tone: ${tone_of_voice}. Persuasive. Direct. No fluff.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInFounderStoryPrompt = (vars: any) => {
  const { niche, milestone, struggle, tone_of_voice } = vars;

  return `
Write a LinkedIn post that shares a founder’s journey in ${niche}.

Inputs:
- Milestone: ${milestone}
- Struggle: ${struggle}}

Structure:
1. OPEN with a vulnerable or surprising detail about ${struggle}.
2. SHOW the turning point that led to ${milestone}.
3. TEACH a relatable valuable lesson in one or two punchy sentences.
4. CLOSE with encouragement for peers in ${niche}.

Tone: ${tone_of_voice}. Professional yet human. Relatable but authoritative.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInTrendPrompt = (vars: any) => {
  const { niche, trend, implication, tone_of_voice } = vars;

  return `
Write a LinkedIn post analyzing a trend in ${niche}.

Inputs:
- Trend: ${trend}

Structure:
1. HOOK with 2 stats that grabs attention.
2. EXPLAIN what ${trend} means for ${niche}.
3. SHARE the implications in practical terms for ${niche}.
4. CLOSE with a prediction or open-ended question.

Tone: ${tone_of_voice}. Analytical. Forward-looking. Engaging.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
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
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInCaseStudyPrompt = (vars: any) => {
  const { client_type, problem, solution, result, tone_of_voice } = vars;

  return `
Write a LinkedIn case study post.

Inputs:
- Client Type: ${client_type}
- Problem: ${problem}
- Solution: ${solution}
- Result: ${result}

Structure:
1. OPEN with the ${problem} the ${client_type} faced.
2. SHOW the ${solution} applied.
3. QUANTIFY the ${result}.
4. SHOW a credibity anchor to validate claims
4. CLOSE with a takeaway.

Tone: ${tone_of_voice}. Results-driven. Professional. Inspiring.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInHowToPrompt = (vars: any) => {
  const { niche, target_audience, tone_of_voice } = vars;

  return `
Write a LinkedIn how-to post for ${target_audience} in ${niche}.

Structure:
1. HOOK with a bold promise or myth-busting statement.
2. INTRODUCE a framework [Give your system a punchy name, e.g., The $10K Noise Filter, The 3-Way Validator Test, The 5-Seller Magnet].
3. BREAK IT DOWN in 3-5 steps with specifics.
4. CLOSE with encouragement to try it.

Tone: ${tone_of_voice}. Clear. Practical. Teacher-like.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInListiclePrompt = (vars: any) => {
  const { niche, list_topic, target_audience, tone_of_voice } = vars;

  return `
Write a LinkedIn listicle post for ${niche}.

Inputs:
- Topic: ${list_topic}
- Audience: ${target_audience}

Structure:
1. HOOK with why ${list_topic} matters.
2. LIST 3-7 items with 1–2 sentences each.
3. CLOSE with a challenge or CTA.

Tone: ${tone_of_voice}. Punchy. Skimmable. Shareable.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInHotTakePrompt = (vars: any) => {
  const { niche, hot_take, tone_of_voice } = vars;

  return `
Write a LinkedIn hot-take post for ${niche}.

Inputs:
- Hot Take: ${hot_take}

Structure:
1. OPEN with the ${hot_take} in one sentence.
2. DEFEND it with a systematic Logical reasoning.
3. CONTRAST with what "most people" believe.
4. CLOSE with a provocative question.

Tone: ${tone_of_voice}. Bold. Debate-starting. Professional.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInMotivationPrompt = (vars: any) => {
  const { niche, struggle, target_audience, tone_of_voice } = vars;

  return `
Write a motivational LinkedIn post in ${niche}.

Inputs:
- Struggle: ${struggle}
- Audience: ${target_audience}

Structure:
1. OPEN with a relatable ${struggle} for ${target_audience}.
2. REVEAL the mindset shift.
3. GIVE an example of applying it.
4. CLOSE with encouragement.

Tone: ${tone_of_voice}. Uplifting. Direct. No clichés.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
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
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInOfferPrompt = (vars: any) => {
  const { event_name, offer_type, target_audience, tone_of_voice } = vars;

  return `
Write a LinkedIn promotional post.

Inputs:
- Event: ${event_name}
- Offer Type: ${offer_type}
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
Ensure JSON is syntactically correct with no trailing commas.`;
};