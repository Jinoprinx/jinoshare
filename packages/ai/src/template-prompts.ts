export const buildFreebieAlertPrompt = (variables: any) => {
  const { target_audience, tone_of_voice, productName, benefit } = variables;

  return `You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Your task is to create a 5-day social media content plan that promotes a freebie and builds a powerful, relatable brand.

**Brand Information:**
- **Target Audience:** ${target_audience}
- **Tone of Voice:** ${tone_of_voice}

**Freebie Information:**
- **Product Name:** ${productName}
- **Benefit:** ${benefit}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Problem" Post**
*   **Hook:** Start with a relatable question or a bold statement that exposes a common pain point of the target audience.
*   **Problem:** Dive deep into the emotional struggle of the problem. Use storytelling to make it relatable.
*   **Solution:** Briefly introduce the freebie as the light at the end of the tunnel.
*   **CTA:** Ask a question to encourage engagement and comments.

**Day 2: The "Solution" Post**
*   **Hook:** Use a contrarian hook that challenges a common belief related to the problem.
*   **Solution:** Present the freebie as the ultimate solution.
*   **Breakdown:** Use bullet points to break down the key benefits of the freebie.
*   **CTA:** Encourage users to download the freebie with a clear and compelling call to action.

**Day 3: The "Value" Post**
*   **Hook:** Start with a surprising statistic or a little-known fact.
*   **Value:** Provide a valuable tip or insight from the freebie.
*   **Story:** Share a short story or a case study of someone who has benefited from the freebie.
*   **CTA:** Encourage users to share the post with someone who needs it.

**Day 4: The "Urgency" Post**
*   **Hook:** Use a "limited time" or "exclusive access" hook to create a sense of urgency.
*   **Urgency:** Emphasize the scarcity of the offer (even if it's a digital product).
*   **Benefit:** Remind the audience of the key benefit of the freebie.
*   **CTA:** A strong and direct call to action to download the freebie now.

**Day 5: The "Community" Post**
*   **Hook:** Start with a question that invites the audience to share their experiences.
*   **Community:** Create a sense of community by sharing some of the best comments or questions from the previous days.
*   **Reminder:** Gently remind the audience about the freebie.
*   **CTA:** A final call to action to download the freebie and join the community.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should be natural-sounding and not salesy.
- Avoid jargon; focus on ROI, efficiency, creativity, and human connection.
- Do not include links.
- Include 3-5 relevant hashtags for reach.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};

export const buildPaidCoursePrompt = (variables: any) => {
  const { target_audience, tone_of_voice, courseName, price, discount } = variables;

  return `You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Your task is to create a 5-day social media content plan that promotes a paid course and builds a powerful, relatable brand.

**Brand Information:**
- **Target Audience:** ${target_audience}
- **Tone of Voice:** ${tone_of_voice}

**Paid Course Information:**
- **Course Name:** ${courseName}
- **Price:** ${price}
- **Discount:** ${discount}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Problem" Post**
*   **Hook:** Start with a relatable question or a bold statement that exposes a common pain point of the target audience.
*   **Problem:** Dive deep into the emotional struggle of the problem. Use storytelling to make it relatable.
*   **Solution:** Briefly introduce the course as the path to transformation.
*   **CTA:** Ask a question to encourage engagement and comments.

**Day 2: The "Solution" Post**
*   **Hook:** Use a contrarian hook that challenges a common belief related to the problem.
*   **Solution:** Present the course as the ultimate solution.
*   **Breakdown:** Use bullet points to break down the key modules and outcomes of the course.
*   **CTA:** Encourage users to enroll in the course with a clear and compelling call to action.

**Day 3: The "Value" Post**
*   **Hook:** Start with a surprising statistic or a little-known fact.
*   **Value:** Provide a valuable tip or insight from the course.
*   **Story:** Share a short story or a testimonial from a successful student.
*   **CTA:** Encourage users to share the post with someone who needs it.

**Day 4: The "Urgency" Post**
*   **Hook:** Use a "limited time offer" or "last chance" hook to create a sense of urgency.
*   **Urgency:** Emphasize the limited-time discount and the value of enrolling now.
*   **Benefit:** Remind the audience of the key transformation the course provides.
*   **CTA:** A strong and direct call to action to enroll in the course now.

**Day 5: The "Community" Post**
*   **Hook:** Start with a question that invites the audience to share their goals and aspirations.
*   **Community:** Create a sense of community by sharing some of the success stories from the course.
*   **Reminder:** Gently remind the audience about the course and the limited-time offer.
*   **CTA:** A final call to action to enroll in the course and join the community of successful students.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should be persuasive and inspiring.
- Avoid jargon; focus on ROI, efficiency, creativity, and human connection.
- Do not include links.
- Include 3-5 relevant hashtags for reach.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};

export const buildGenericPrompt = (variables: any) => {
  const { target_audience, tone_of_voice} = variables;

  return `You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Your task is to create a 5-day social media content plan that builds a powerful, relatable brand.

**Brand Information:**
- **Target Audience:** ${target_audience}
- **Tone of Voice:** ${tone_of_voice}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Vision" Post**
*   **Hook:** Start with a bold and inspiring statement about the future of the industry or the brand’s vision.
*   **Problem:** Articulate the problem that the brand is trying to solve in the world.
*   **Solution:** Position the brand as a leader and a change-maker.
*   **CTA:** Ask a question to encourage engagement and discussion about the future.

**Day 2: The "Values" Post**
*   **Hook:** Use a personal story or an anecdote that reflects the brand’s core values.
*   **Values:** Share the brand’s core values and what they mean in practice.
*   **Story:** Tell a story about how the brand has lived up to its values.
*   **CTA:** Ask the audience to share their own values.

**Day 3: The "Behind the Scenes" Post**
*   **Hook:** Take the audience behind the scenes with a photo or a video.
*   **Behind the Scenes:** Show the human side of the brand, the team, the process, or the office.
*   **Story:** Tell a story about a challenge or a success that happened behind the scenes.
*   **CTA:** Ask a question about the audience’s own work or life.

**Day 4: The "Community" Post**
*   **Hook:** Feature a customer, a partner, or a community member.
*   **Community:** Celebrate the brand’s community and the people who make it special.
*   **Story:** Tell a story about how a community member has inspired the brand.
*   **CTA:** Encourage the audience to tag someone who inspires them.

**Day 5: The "Future" Post**
*   **Hook:** Share a bold prediction or a hot take about the future of the industry.
*   **Future:** Paint a picture of the future and the brand’s role in it.
*   **Invitation:** Invite the audience to be a part of the brand’s journey.
*   **CTA:** Ask the audience to share their own predictions for the future.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should be authentic and inspiring.
- Avoid jargon; focus on ROI, efficiency, creativity, and human connection.
- Do not include links.
- Include 3-5 relevant hashtags for reach.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};

export const buildQuickTutorialPrompt = (variables: any) => {
  const { target_audience, tone_of_voice, tutorialTopic, tutorialDuration, keyTakeaways } = variables;

  return `You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Your task is to create a 5-day social media content plan that promotes a quick tutorial and builds a powerful, relatable brand.

**Brand Information:**
- **Target Audience:** ${target_audience}
- **Tone of Voice:** ${tone_of_voice}

**Tutorial Information:**
- **Tutorial Topic:** ${tutorialTopic}
- **Duration:** ${tutorialDuration}
- **Key Takeaways:** ${keyTakeaways}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Why" Post**
*   **Hook:** Start with a surprising statistic or a common misconception related to the tutorial topic.
*   **Problem:** Explain why the tutorial is so important and what problem it solves.
*   **Solution:** Briefly introduce the tutorial as the key to unlocking a new skill.
*   **CTA:** Ask a question to gauge the audience’s interest in the topic.

**Day 2: The "What" Post**
*   **Hook:** Use a “How to” hook that clearly states the benefit of the tutorial.
*   **What:** Break down the key takeaways from the tutorial in a clear and concise way.
*   **Breakdown:** Use bullet points to list the key skills the audience will learn.
*   **CTA:** Encourage the audience to watch the tutorial with a clear and compelling call to action.

**Day 3: The "Sneak Peek" Post**
*   **Hook:** Share a short clip or a screenshot from the tutorial.
*   **Sneak Peek:** Give the audience a taste of what they will learn in the tutorial.
*   **Story:** Tell a story about how you learned this skill and how it has helped you.
*   **CTA:** Encourage the audience to share what they are most excited to learn.

**Day 4: The "Transformation" Post**
*   **Hook:** Paint a picture of the transformation the audience will experience after watching the tutorial.
*   **Transformation:** Describe the before and after state of the audience.
*   **Benefit:** Remind the audience of the key benefit of learning this new skill.
*   **CTA:** A strong and direct call to action to watch the tutorial now.

**Day 5: The "Q&A" Post**
*   **Hook:** Ask the audience what questions they have about the tutorial topic.
*   **Q&A:** Answer the most common questions in a helpful and engaging way.
*   **Reminder:** Gently remind the audience about the tutorial.
*   **CTA:** A final call to action to watch the tutorial and ask any remaining questions.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should be educational and inspiring.
- Avoid jargon; focus on ROI, efficiency, creativity, and human connection.
- Do not include links.
- Include 3-5 relevant hashtags for reach.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};

export const buildCarouselPostPrompt = (variables: any) => {
  const { target_audience, tone_of_voice, carouselTopic, numberOfSlides } = variables;

  return `You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Your task is to create a 5-day social media content plan that promotes a carousel post and builds a powerful, relatable brand.

**Brand Information:**
- **Target Audience:** ${target_audience}
- **Tone of Voice:** ${tone_of_voice}

**Carousel Information:**
- **Carousel Topic:** ${carouselTopic}
- **Number of Slides:** ${numberOfSlides}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Hook" Post**
*   **Hook:** Start with a powerful and intriguing question that the carousel will answer.
*   **Problem:** Briefly touch on the problem that the carousel solves.
*   **Intrigue:** Tease the content of the carousel and create a sense of anticipation.
*   **CTA:** Ask a question to get the audience thinking about the topic.

**Day 2: The "First Look" Post**
*   **Hook:** Share the first slide of the carousel and a compelling caption.
*   **First Look:** Give the audience a glimpse of the value they will get from the carousel.
*   **Story:** Tell a short story that relates to the topic of the carousel.
*   **CTA:** Encourage the audience to swipe through the rest of the carousel.

**Day 3: The "Deep Dive" Post**
*   **Hook:** Focus on one key slide or takeaway from the carousel.
*   **Deep Dive:** Go into more detail about that specific point and provide additional value.
*   **Example:** Share a real-world example or a case study that illustrates the point.
*   **CTA:** Ask the audience to share their own experiences related to the topic.

**Day 4: The "Behind the Scenes" Post**
*   **Hook:** Share a behind-the-scenes look at how the carousel was created.
*   **Behind the Scenes:** Show the research, the design process, or the team behind the content.
*   **Story:** Tell a story about the creative process and the challenges that were overcome.
*   **CTA:** Ask the audience what they would like to see next.

**Day 5: The "Reminder" Post**
*   **Hook:** Use a gentle reminder to encourage the audience to check out the carousel if they haven’t already.
*   **Reminder:** Briefly summarize the key benefits of the carousel.
*   **Community:** Share some of the best comments or insights from the previous posts.
*   **CTA:** A final call to action to swipe through the carousel and share it with others.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should be engaging and visually appealing.
- Avoid jargon; focus on ROI, efficiency, creativity, and human connection.
- Do not include links.
- Include 3-5 relevant hashtags for reach.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};

export const buildPromoOfferPrompt = (variables: any) => {
  const { target_audience, tone_of_voice, offerDetails, discountPercentage, expirationDate } = variables;

  return `You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Your task is to create a 5-day social media content plan that promotes a special offer and builds a powerful, relatable brand.

**Brand Information:**
- **Target Audience:** ${target_audience}
- **Tone of Voice:** ${tone_of_voice}

**Promotional Offer Information:**
- **Offer Details:** ${offerDetails}
- **Discount Percentage:** ${discountPercentage}
- **Expiration Date:** ${expirationDate}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Announcement" Post**
*   **Hook:** Announce the special offer with excitement and enthusiasm.
*   **Problem:** Briefly touch on the problem that the offer solves.
*   **Solution:** Present the offer as a no-brainer solution.
*   **CTA:** A clear and direct call to action to take advantage of the offer.

**Day 2: The "Benefit" Post**
*   **Hook:** Focus on the key benefit of the offer.
*   **Benefit:** Dive deep into the emotional and practical benefits of the offer.
*   **Story:** Share a story of someone who has benefited from a similar offer in the past.
*   **CTA:** Encourage the audience to imagine themselves experiencing the benefits.

**Day 3: The "Urgency" Post**
*   **Hook:** Create a sense of urgency with a “limited time” or “last chance” hook.
*   **Urgency:** Remind the audience that the offer is expiring soon.
*   **Scarcity:** Emphasize that there are limited spots or products available.
*   **CTA:** A strong and direct call to action to act now before it’s too late.

**Day 4: The "FAQ" Post**
*   **Hook:** Address the most common questions or objections about the offer.
*   **FAQ:** Answer the questions in a clear and concise way.
*   **Trust:** Build trust and credibility by being transparent and helpful.
*   **CTA:** Encourage the audience to ask any remaining questions.

**Day 5: The "Final Call" Post**
*   **Hook:** A final, urgent reminder that the offer is about to expire.
*   **Final Call:** Use strong and persuasive language to encourage immediate action.
*   **FOMO:** Create a strong sense of FOMO (fear of missing out).
*   **CTA:** The final and most direct call to action to take advantage of the offer now.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should be persuasive and create a sense of urgency.
- Avoid jargon; focus on ROI, efficiency, creativity, and human connection.
- Do not include links.
- Include 3-5 relevant hashtags for reach.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};

export const buildProductLaunchPrompt = (variables: any) => {
  const { target_audience, tone_of_voice, productName, productDescription, launchDate } = variables;

  return `You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Your task is to create a 5-day social media content plan that builds anticipation for a product launch and positions the brand as innovative and customer-focused.

**Brand Information:**
- **Target Audience:** ${target_audience}
- **Tone of Voice:** ${tone_of_voice}

**Product Launch Information:**
- **Product Name:** ${productName}
- **Product Description:** ${productDescription}
- **Launch Date:** ${launchDate}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Teaser" Post**
*   **Hook:** A cryptic message or a mysterious image that hints at something new and exciting.
*   **Intrigue:** Create a sense of mystery and anticipation without revealing too much.
*   **Question:** Ask a question that sparks curiosity and speculation.
*   **CTA:** Encourage the audience to guess what’s coming.

**Day 2: The "Problem" Post**
*   **Hook:** A relatable story or a common problem that the new product will solve.
*   **Problem:** Dive deep into the emotional struggle of the problem.
*   **Hint:** Drop a bigger hint about the new product and how it will solve the problem.
*   **CTA:** Ask the audience to share their own experiences with the problem.

**Day 3: The "Big Reveal" Post**
*   **Hook:** The official announcement of the new product.
*   **Big Reveal:** Introduce the product with a bang. Share its name, its features, and its key benefits.
*   **Story:** Tell the story behind the product – why it was created and what makes it special.
*   **CTA:** A clear and direct call to action to learn more about the product.

**Day 4: The "Behind the Scenes" Post**
*   **Hook:** A behind-the-scenes look at the making of the product.
*   **Behind the Scenes:** Show the team, the process, or the technology behind the product.
*   **Story:** Tell a story about a challenge or a breakthrough that happened during the development process.
*   **CTA:** Ask the audience what they are most excited about.

**Day 5: The "Launch Day" Post**
*   **Hook:** The official launch of the product.
*   **Launch Day:** Announce that the product is now available for purchase.
*   **Urgency:** Create a sense of urgency with a limited-time launch offer or a bonus for early adopters.
*   **CTA:** A strong and direct call to action to buy the product now.

**General Rules:**
- Each post must be unique and non-repetitive.
- The posts should build anticipation and excitement.
- Avoid jargon; focus on ROI, efficiency, creativity, and human connection.
- Do not include links.
- Include 3-5 relevant hashtags for reach.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildAIAcceleratedFounderPostPrompt = (variables: any) => {
  const {niche, target_audience, ai_integration, tone_of_voice, offer_type } = variables;

  return `
You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Your task is to create a 5-day social media content plan in the voice of a battle-tested founder who has scaled a business to 7–9 figures.

**Brand Information:**
**Niche:** ${niche} 
**Target Audience:** ${target_audience}
**AI Integration (Optional):** ${ai_integration}
**Offer Type:** ${offer_type}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Brutal Truth" Post**
*   **Hook:** Start with a short, hard-hitting sentence that exposes a painful reality or debunks a myth in [Niche].
*   **Problem:** Contrast “Most People” vs. “Winners” to highlight the problem.
*   **Solution:** Introduce a simple, actionable framework or test that turns confusion into clarity.
*   **CTA:** Ask a provocative question to spark comments and debate.

**Day 2: The "Framework" Post**
*   **Hook:** A bold statement that introduces your unique framework or system.
*   **Framework:** Break down your framework into 3-5 clear, actionable steps. Use hyper-specific examples and real metrics.
*   **AI Integration:** Show how ${ai_integration} compresses months of work into hours.
*   **CTA:** Ask the audience to share their biggest takeaway from the framework.

**Day 3: The "Story" Post**
*   **Hook:** A personal story of failure or a surprising lesson learned.
*   **Story:** Tell a raw, unfiltered story that demonstrates the power of your framework.
*   **Lesson:** Teach a practical lesson in one or two punchy sentences.
*   **CTA:** Encourage others to share their own stories of failure and success.

**Day 4: The "Value" Post**
*   **Hook:** A surprising insight or a counter-intuitive tip.
*   **Value:** Provide a high-value, actionable tip that the audience can implement immediately.
*   **Example:** Use a real-world example to illustrate the tip.
*   **CTA:** Ask the audience to share a tip of their own.

**Day 5: The "Offer" Post**
*   **Hook:** A high-value, low-friction offer.
*   **Offer:** Present a free but exclusive-feeling ${offer_type} for ${target_audience}.
*   **Outcome:** Clearly state the outcome of the offer.
*   **CTA:** A clear and direct call to action to grab the offer.

Tone Rules: 
Use ${tone_of_voice}.
Confident. Direct. Slightly provocative.
Short sentences. Fragments for rhythm.
Zero fluff. No “tips” or “hacks.”
Anchor credibility in real results (e.g., “scaled to $X,” “helped X clients,” “built X in Y time”)
Speak to doers, not dreamers.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`
};
export const buildAuthorityPostPrompt = (variables: any) => {
  const { niche, target_audience, tone_of_voice, credibility_anchor} = variables;

  return `
You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Your task is to create a 5-day social media content plan that positions the founder as a thought leader in ${niche}.

**Brand Info:**
- Niche: ${niche}
- Target Audience: ${target_audience}
- Credibility Anchor: ${credibility_anchor} (e.g., "scaled to $5M ARR", "helped 200+ clients")

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Contrarian Truth" Post**
*   **Hook:** Start with a sharp contrarian statement that challenges common beliefs in ${niche}.
*   **Problem:** Explain why the common belief is wrong and what it costs the target audience.
*   **Solution:** Share a personal story or a lesson that proves the contrarian truth.
*   **CTA:** Ask a provocative question to spark comments and debate.

**Day 2: The "Actionable Insight" Post**
*   **Hook:** A bold promise to teach the audience something new and valuable.
*   **Insight:** Teach one actionable insight that ${target_audience} can apply immediately.
*   **Example:** Use a real-world example or a case study to illustrate the insight.
*   **CTA:** Ask the audience to share how they will apply the insight.

**Day 3: The "Behind the Scenes" Post**
*   **Hook:** A behind-the-scenes look at your work or your process.
*   **Behind the Scenes:** Show the audience how you get the results you do.
*   **Story:** Tell a story about a challenge you faced and how you overcame it.
*   **CTA:** Ask the audience to share their own challenges.

**Day 4: The "Prediction" Post**
*   **Hook:** A bold prediction about the future of ${niche}.
*   **Prediction:** Share your vision for the future and why you believe it will happen.
*   **Implication:** Explain the implications of your prediction for the target audience.
*   **CTA:** Ask the audience to share their own predictions.

**Day 5: The "Q&A" Post**
*   **Hook:** An invitation to ask you anything about ${niche}.
*   **Q&A:** Answer the best questions in a thoughtful and insightful way.
*   **Value:** Provide additional value and insights.
*   **CTA:** Encourage the audience to keep the conversation going.

Tone: ${tone_of_voice}. Direct. Confident. Human. No fluff.
**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildFounderJourneyPostPrompt = (variables: any) => {
  const { niche, founder_story, milestone, struggle, tone_of_voice } = variables;

  return `
You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Create a 5-day social media content plan that shares a behind-the-scenes founder story that feels raw and relatable.

**Inputs:**
- Niche: ${niche}
- Founder Story: ${founder_story}
- Milestone: ${milestone}
- Struggle: ${struggle}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Struggle" Post**
*   **Hook:** Start with a vulnerable or surprising detail from the founder’s journey, focusing on the ${struggle}.
*   **Problem:** Describe the ${struggle} in vivid, human terms.
*   **Story:** Share a specific anecdote about the struggle.
*   **CTA:** Ask the audience to share a similar struggle they’ve faced.

**Day 2: The "Turning Point" Post**
*   **Hook:** A moment of realization or a key decision that changed everything.
*   **Turning Point:** Share the turning point that led to the ${milestone}.
*   **Story:** Tell the story of the turning point and the emotions that came with it.
*   **CTA:** Ask the audience about a turning point in their own lives.

**Day 3: The "Milestone" Post**
*   **Hook:** The achievement of the ${milestone}.
*   **Milestone:** Celebrate the milestone and the hard work that went into it.
*   **Story:** Share the story of the milestone and what it means for the brand.
*   **CTA:** Encourage the audience to celebrate their own milestones, big or small.

**Day 4: The "Lesson" Post**
*   **Hook:** A key lesson learned from the journey.
*   **Lesson:** Teach a practical lesson in one or two punchy sentences.
*   **Example:** Share an example of how you applied this lesson in your business.
*   **CTA:** Ask the audience to share a lesson they’ve learned.

**Day 5: The "Future" Post**
*   **Hook:** A look ahead to the future of the brand.
*   **Future:** Share your vision for the future and what you’re excited about.
*   **Invitation:** Invite the audience to be a part of the journey.
*   **CTA:** Ask the audience what they are excited about for the future.

Tone: ${tone_of_voice}. Honest. Relatable. Human.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.
`;
};
export const buildCaseStudyPostPrompt = (variables: any) => {
  const { client_type, problem, solution, result, ai_integration, tone_of_voice } = variables;

  return `
You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Write a 5-day social media content plan that highlights a client win in a case study format.

**Inputs:**
- Client Type: ${client_type}
- Problem: ${problem}
- Solution: ${solution}
- Result: ${result}
- AI Integration: ${ai_integration}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Problem" Post**
*   **Hook:** Start with the painful problem the ${client_type} faced.
*   **Problem:** Dive deep into the emotional and financial cost of the problem.
*   **Story:** Tell a story about the client’s struggle before they found your solution.
*   **CTA:** Ask the audience if they can relate to this problem.

**Day 2: The "Solution" Post**
*   **Hook:** Introduce the simple but powerful solution that changed everything.
*   **Solution:** Show the ${solution} applied (include ${ai_integration} if relevant).
*   **Breakdown:** Break down the solution into 3 simple steps.
*   **CTA:** Ask the audience what they think of the solution.

**Day 3: The "Result" Post**
*   **Hook:** The incredible, quantifiable result that the client achieved.
*   **Result:** Quantify the result with numbers (e.g., revenue, time saved, % growth).
*   **Story:** Tell the story of the client’s success and how it has changed their business.
*   **CTA:** Encourage the audience to imagine what they could achieve with similar results.

**Day 4: The "Testimonial" Post**
*   **Hook:** A powerful quote from the client.
*   **Testimonial:** Share a glowing testimonial from the client.
*   **Trust:** Build trust and credibility by letting your client do the talking.
*   **CTA:** Ask the audience to share a win of their own.

**Day 5: The "Offer" Post**
*   **Hook:** An invitation to get the same results as your client.
*   **Offer:** Present a clear and compelling offer for your product or service.
*   **Urgency:** Create a sense of urgency with a limited-time offer or a bonus.
*   **CTA:** A strong and direct call to action to book a call or learn more.

Tone: ${tone_of_voice}. Clear. Results-driven. Inspiring.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildHowToPostPrompt = (variables: any) => {
  const { niche, target_audience, tone_of_voice } = variables;

  return `
You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Write a 5-day social media content plan for an educational "how-to" post for ${target_audience} in ${niche}.

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Why" Post**
*   **Hook:** Start with a bold promise or a myth-busting statement about the topic.
*   **Problem:** Explain why this skill is so important and what problem it solves.
*   **Solution:** Briefly introduce the framework or system you will be teaching.
*   **CTA:** Ask a question to gauge the audience’s interest in the topic.

**Day 2: The "Framework" Post**
*   **Hook:** Introduce your unique framework with a punchy name (e.g., The $10K Client Filter, The 3-Day Offer Test, The 5-Seller Sprint).
*   **Framework:** Break down the framework in 3–5 clear steps with specific, actionable detail.
*   **Example:** Use a real-world example to illustrate the framework.
*   **CTA:** Ask the audience to share their biggest takeaway from the framework.

**Day 3: The "Deep Dive" Post**
*   **Hook:** Focus on one specific step of the framework.
*   **Deep Dive:** Go into more detail about that specific step and provide additional value.
*   **Story:** Share a story about how you learned this step and how it has helped you.
*   **CTA:** Ask the audience to share their own experiences with this step.

**Day 4: The "Common Mistakes" Post**
*   **Hook:** The most common mistakes people make when trying to apply this skill.
*   **Mistakes:** List the most common mistakes and explain how to avoid them.
*   **Tip:** Provide a pro-tip to help the audience get even better results.
*   **CTA:** Ask the audience to share a mistake they’ve made and what they learned from it.

**Day 5: The "Success Story" Post**
*   **Hook:** A success story of someone who has used your framework to achieve great results.
*   **Success Story:** Share a testimonial or a case study of a successful student.
*   **Inspiration:** Inspire the audience to take action and apply the framework themselves.
*   **CTA:** A final call to action to try it out today.

Tone: ${tone_of_voice}. Practical. Clear. Teacher-like but approachable.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildMythBustingPostPrompt = (variables: any) => {
  const { niche, tone_of_voice } = variables;

  return `
You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Create a 5-day social media content plan for a myth-busting post for ${niche}.

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Myth" Post**
*   **Hook:** State the myth as if it’s common knowledge.
*   **Problem:** Explain why this myth is so damaging and what it costs the target audience.
*   **Intrigue:** Hint that you have a controversial truth to share.
*   **CTA:** Ask the audience if they believe this myth.

**Day 2: The "Truth" Post**
*   **Hook:** The blunt, controversial truth that shatters the myth.
*   **Truth:** Flip the myth on its head and reveal the surprising truth.
*   **Proof:** Prove the truth with a practical and relatable example.
*   **CTA:** Ask the audience what they think of this truth.

**Day 3: The "Why" Post**
*   **Hook:** A deeper dive into why the myth is so pervasive.
*   **Why:** Explain the psychology behind the myth and why so many people believe it.
*   **Story:** Share a story about how you used to believe the myth and what changed your mind.
*   **CTA:** Ask the audience to share their own experiences with the myth.

**Day 4: The "Action" Post**
*   **Hook:** A clear and actionable tip to help the audience overcome the myth.
*   **Action:** Provide a practical step that the audience can take to apply the truth in their own lives.
*   **Benefit:** Explain the benefit of taking this action.
*   **CTA:** Encourage the audience to take action and share their results.

**Day 5: The "Debate" Post**
*   **Hook:** A provocative question that sparks a debate.
*   **Debate:** Encourage a healthy debate and discussion around the myth and the truth.
*   **Community:** Create a sense of community by engaging with the comments and fostering a lively discussion.
*   **CTA:** A final call to action to think differently.

Tone: ${tone_of_voice}. Bold. Direct. Slightly provocative.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildTrendInsightPostPrompt = (variables: any) => {
  const { niche, trend, implication, ai_angle, tone_of_voice } = variables;

  return `
You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Write a 5-day social media content plan for a trend/insight post for ${niche}.

**Inputs:**
- Trend: ${trend}
- Implication: ${implication}
- AI Angle: ${ai_angle}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Trend Alert" Post**
*   **Hook:** Start with a surprising stat or headline about the ${trend}.
*   **Problem:** Explain why this trend is so important and what it means for ${niche}.
*   **Intrigue:** Hint at the implications of the trend and how it will change the game.
*   **CTA:** Ask the audience if they have heard of this trend.

**Day 2: The "Implication" Post**
*   **Hook:** A bold statement about the ${implication} of the trend.
*   **Implication:** Explain the ${implication} in practical terms for ${niche}.
*   **AI Angle:** Show how ${ai_angle} changes the game.
*   **CTA:** Ask the audience what they think of the implication.

**Day 3: The "Opportunity" Post**
*   **Hook:** The biggest opportunity that the trend presents.
*   **Opportunity:** Explain how the audience can take advantage of the trend.
*   **Example:** Share an example of someone who is already capitalizing on the trend.
*   **CTA:** Ask the audience to share their own ideas for capitalizing on the trend.

**Day 4: The "Threat" Post**
*   **Hook:** The biggest threat that the trend presents.
*   **Threat:** Explain the risks of ignoring the trend.
*   **Story:** Share a story about a brand that was disrupted by a similar trend.
*   **CTA:** Ask the audience how they are preparing for the trend.

**Day 5: The "Prediction" Post**
*   **Hook:** A bold prediction about the future of the trend.
*   **Prediction:** Share your vision for the future and how the trend will evolve.
*   **Challenge:** Challenge ${niche} leaders to adapt to the trend.
*   **CTA:** Ask the audience to share their own predictions.

Tone: ${tone_of_voice}. Forward-looking. Analytical. Confident.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildListiclePostPrompt = (variables: any) => {
  const { niche, target_audience, list_topic, tone_of_voice } = variables;

  return `
You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Write a 5-day social media content plan for a listicle-style post for ${target_audience} in ${niche}.

**Inputs:**
- Topic: ${list_topic}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Hook" Post**
*   **Hook:** Start with a bold statement about why ${list_topic} matters.
*   **Problem:** Briefly touch on the problem that the listicle solves.
*   **Intrigue:** Tease the content of the listicle and create a sense of anticipation.
*   **CTA:** Ask a question to get the audience thinking about the topic.

**Day 2: The "First Look" Post**
*   **Hook:** Share the first item on the list and a compelling caption.
*   **First Look:** Give the audience a glimpse of the value they will get from the listicle.
*   **Story:** Tell a short story that relates to the first item on the list.
*   **CTA:** Encourage the audience to check out the full list.

**Day 3: The "Deep Dive" Post**
*   **Hook:** Focus on one key item from the list.
*   **Deep Dive:** Go into more detail about that specific item and provide additional value.
*   **Example:** Share a real-world example or a case study that illustrates the item.
*   **CTA:** Ask the audience to share their own experiences related to the item.

**Day 4: The "Bonus" Post**
*   **Hook:** A bonus item that didn’t make the original list.
*   **Bonus:** Provide an extra tip or resource that is related to the list topic.
*   **Value:** Give the audience even more value and show that you are a generous expert.
*   **CTA:** Ask the audience to share their own bonus tips.

**Day 5: The "Reminder" Post**
*   **Hook:** A gentle reminder to check out the listicle if they haven’t already.
*   **Reminder:** Briefly summarize the key benefits of the listicle.
*   **Community:** Share some of the best comments or insights from the previous posts.
*   **CTA:** A final call to action to read the full list and share it with others.

Tone: ${tone_of_voice}. Punchy. Skimmable. Shareable.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete, detailed social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildHotTakePostPrompt = (variables: any) => {
  const { niche, hot_take, tone_of_voice } = variables;

  return `
You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Write a 5-day social media content plan for a hot-take opinion post for ${niche}.

**Inputs:**
- Hot Take: ${hot_take}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Hot Take" Post**
*   **Hook:** Open with the hot take in one blunt sentence.
*   **Problem:** Explain why this hot take is so important and what it means for ${niche}.
*   **Intrigue:** Hint at the reasoning behind the hot take.
*   **CTA:** Ask the audience for their initial reaction to the hot take.

**Day 2: The "Defense" Post**
*   **Hook:** A bold statement that defends the hot take.
*   **Defense:** Defend the hot take with sound and practical reasoning.
*   **Contrast:** Contrast the hot take with what "most people" believe.
*   **CTA:** Ask the audience to challenge your reasoning.

**Day 3: The "Example" Post**
*   **Hook:** A real-world example that proves the hot take.
*   **Example:** Share a story or a case study that illustrates the hot take in action.
*   **Lesson:** Teach a practical lesson from the example.
*   **CTA:** Ask the audience to share their own examples.

**Day 4: The "Implication" Post**
*   **Hook:** The biggest implication of the hot take.
*   **Implication:** Explain the long-term consequences of the hot take for ${niche}.
*   **Prediction:** Share a prediction based on the hot take.
*   **CTA:** Ask the audience if they agree with your prediction.

**Day 5: The "Debate" Post**
*   **Hook:** A provocative question that sparks a debate.
*   **Debate:** Encourage a healthy debate and discussion around the hot take.
*   **Community:** Create a sense of community by engaging with the comments and fostering a lively discussion.
*   **CTA:** A final call to action to rethink assumptions.

Tone: ${tone_of_voice}. Bold. Confident. Debate-starting.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildMotivationalPostPrompt = (variables: any) => {
  const { niche, target_audience, struggle, tone_of_voice } = variables;

  return `
You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Write a 5-day social media content plan for a motivational mindset post for ${target_audience} in ${niche}.

**Inputs:**
- Struggle: ${struggle}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Struggle" Post**
*   **Hook:** Open with a relatable description of the ${struggle}.
*   **Problem:** Dive deep into the emotional and mental toll of the struggle.
*   **Empathy:** Let the audience know that they are not alone in their struggle.
*   **CTA:** Ask the audience to share their own experiences with the struggle.

**Day 2: The "Mindset Shift" Post**
*   **Hook:** The mindset shift that changes everything.
*   **Mindset Shift:** Reveal the new perspective that helps to overcome the struggle.
*   **Story:** Share a story about how you or someone else made this mindset shift.
*   **CTA:** Ask the audience to share their own mindset shifts.

**Day 3: The "Action" Post**
*   **Hook:** A small, actionable step that the audience can take to overcome the struggle.
*   **Action:** Provide a practical tip or exercise that the audience can do right away.
*   **Benefit:** Explain the benefit of taking this action.
*   **CTA:** Encourage the audience to take action and share their results.

**Day 4: The "Inspiration" Post**
*   **Hook:** An inspiring quote or a success story.
*   **Inspiration:** Share a story of someone who has overcome the struggle and achieved great things.
*   **Motivation:** Motivate the audience to keep going and never give up.
*   **CTA:** Ask the audience to tag someone who inspires them.

**Day 5: The "Celebration" Post**
*   **Hook:** A celebration of the progress that has been made.
*   **Celebration:** Celebrate the small wins and the journey of overcoming the struggle.
*   **Community:** Create a sense of community by celebrating the progress of the audience.
*   **CTA:** A final call to action to keep going and to support each other.

Tone: ${tone_of_voice}. Uplifting. Direct. No clichés.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildOfferPostPrompt = (variables: any) => {
  const { niche, target_audience, offer_type, tone_of_voice } = variables;

  return `
You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Write a 5-day social media content plan for a high-converting offer post for ${target_audience} in ${niche}.

**Inputs:**
- Offer Type: ${offer_type}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Problem" Post**
*   **Hook:** Start with a painful problem that ${target_audience} face.
*   **Problem:** Dive deep into the emotional and financial cost of the problem.
*   **Intrigue:** Hint at a solution that you will be revealing soon.
*   **CTA:** Ask the audience if they can relate to this problem.

**Day 2: The "Solution" Post**
*   **Hook:** Introduce the ${offer_type} as the ultimate solution to the problem.
*   **Solution:** Present the ${offer_type} and its key benefits.
*   **Breakdown:** Break down the offer into 3-5 key features.
*   **CTA:** Ask the audience what they think of the offer.

**Day 3: The "Transformation" Post**
*   **Hook:** The incredible transformation that the offer provides.
*   **Transformation:** Paint a picture of the “after” state that the audience will experience.
*   **Story:** Share a story of someone who has been transformed by the offer.
*   **CTA:** Encourage the audience to imagine themselves experiencing the transformation.

**Day 4: The "Urgency" Post**
*   **Hook:** A limited-time offer or a bonus to create a sense of urgency.
*   **Urgency:** Emphasize that the offer is only available for a limited time.
*   **Scarcity:** Mention that there are limited spots or products available.
*   **CTA:** A strong and direct call to action to take advantage of the offer now.

**Day 5: The "Final Call" Post**
*   **Hook:** A final, urgent reminder that the offer is about to expire.
*   **Final Call:** Use strong and persuasive language to encourage immediate action.
*   **FOMO:** Create a strong sense of FOMO (fear of missing out).
*   **CTA:** The final and most direct call to action to get the offer before it’s gone.

Tone: ${tone_of_voice}. Persuasive. Direct. No fluff.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInFounderStoryPrompt = (vars: any) => {
  const { niche, milestone, struggle, tone_of_voice } = vars;

  return `
You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Write a 5-day LinkedIn content plan that shares a founder’s journey in ${niche}.

Inputs:
- Milestone: ${milestone}
- Struggle: ${struggle}}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Struggle" Post**
*   **Hook:** Start with a vulnerable or surprising detail about the ${struggle}.
*   **Problem:** Describe the ${struggle} in vivid, human terms, and how it impacted you.
*   **Story:** Share a specific anecdote about the struggle.
*   **CTA:** Ask a question to your audience if they have ever faced a similar struggle.

**Day 2: The "Turning Point" Post**
*   **Hook:** A moment of realization or a key decision that changed everything.
*   **Turning Point:** Share the turning point that led to the ${milestone}.
*   **Story:** Tell the story of the turning point and the emotions that came with it.
*   **CTA:** Ask your audience about a turning point in their own careers.

**Day 3: The "Milestone" Post**
*   **Hook:** The achievement of the ${milestone}.
*   **Milestone:** Celebrate the milestone and the hard work that went into it.
*   **Story:** Share the story of the milestone and what it means for you and your brand.
*   **CTA:** Encourage your audience to celebrate their own milestones, big or small.

**Day 4: The "Lesson" Post**
*   **Hook:** A key lesson learned from the journey.
*   **Lesson:** Teach a practical lesson in one or two punchy sentences.
*   **Example:** Share an example of how you applied this lesson in your business.
*   **CTA:** Ask your audience to share a lesson they’ve learned in their careers.

**Day 5: The "Future" Post**
*   **Hook:** A look ahead to the future of your brand and your vision.
*   **Future:** Share your vision for the future and what you’re excited about.
*   **Invitation:** Invite your audience to be a part of the journey.
*   **CTA:** Ask your audience what they are excited about for the future of the industry.

Tone: ${tone_of_voice}. Professional yet human. Relatable but authoritative.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInTrendPrompt = (vars: any) => {
  const { niche, trend, implication, tone_of_voice } = vars;

  return `
You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Write a 5-day LinkedIn content plan analyzing a trend in ${niche}.

Inputs:
- Trend: ${trend}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Trend Alert" Post**
*   **Hook:** Start with 2 surprising stats that grab attention about the ${trend}.
*   **Problem:** Explain why this trend is so important and what it means for ${niche}.
*   **Intrigue:** Hint at the implications of the trend and how it will change the game.
*   **CTA:** Ask your audience if they have heard of this trend.

**Day 2: The "Implication" Post**
*   **Hook:** A bold statement about the ${implication} of the trend.
*   **Implication:** Explain the ${implication} in practical terms for ${niche}.
*   **Story:** Share a story about a brand that is already capitalizing on the trend.
*   **CTA:** Ask your audience what they think of the implication.

**Day 3: The "Opportunity" Post**
*   **Hook:** The biggest opportunity that the trend presents.
*   **Opportunity:** Explain how your audience can take advantage of the trend.
*   **Example:** Share a real-world example or a case study that illustrates the opportunity.
*   **CTA:** Ask your audience to share their own ideas for capitalizing on the trend.

**Day 4: The "Threat" Post**
*   **Hook:** The biggest threat that the trend presents.
*   **Threat:** Explain the risks of ignoring the trend.
*   **Story:** Share a story about a brand that was disrupted by a similar trend.
*   **CTA:** Ask your audience how they are preparing for the trend.

**Day 5: The "Prediction" Post**
*   **Hook:** A bold prediction about the future of the trend.
*   **Prediction:** Share your vision for the future and how the trend will evolve.
*   **Challenge:** Challenge ${niche} leaders to adapt to the trend.
*   **CTA:** Ask your audience to share their own predictions.

Tone: ${tone_of_voice}. Analytical. Forward-looking. Engaging.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInContrarianPrompt = (vars: any) => {
  const { niche, contrarian_truth, reasoning, tone_of_voice } = vars;

  return `
You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Write a 5-day LinkedIn content plan for a contrarian thought-leadership post for ${niche}.

Inputs:
- Contrarian Truth: ${contrarian_truth}
- Reasoning: ${reasoning}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Contrarian Truth" Post**
*   **Hook:** Open with the contrarian truth in one blunt sentence.
*   **Problem:** Explain why this contrarian truth is so important and what it means for ${niche}.
*   **Intrigue:** Hint at the reasoning behind the contrarian truth.
*   **CTA:** Ask your audience for their initial reaction to the contrarian truth.

**Day 2: The "Defense" Post**
*   **Hook:** A bold statement that defends the contrarian truth.
*   **Defense:** Defend the contrarian truth with ${reasoning}.
*   **Proof:** Prove the truth with 1-2 practical examples.
*   **CTA:** Ask your audience to challenge your reasoning.

**Day 3: The "Implication" Post**
*   **Hook:** The biggest implication of the contrarian truth.
*   **Implication:** Explain the long-term consequences of the contrarian truth for ${niche}.
*   **Prediction:** Share a prediction based on the contrarian truth.
*   **CTA:** Ask your audience if they agree with your prediction.

**Day 4: The "Action" Post**
*   **Hook:** A clear and actionable tip to help your audience apply the contrarian truth.
*   **Action:** Provide a practical step that your audience can take to apply the truth in their own lives.
*   **Benefit:** Explain the benefit of taking this action.
*   **CTA:** Encourage your audience to take action and share their results.

**Day 5: The "Debate" Post**
*   **Hook:** A provocative question that sparks a debate.
*   **Debate:** Encourage a healthy debate and discussion around the contrarian truth.
*   **Community:** Create a sense of community by engaging with the comments and fostering a lively discussion.
*   **CTA:** A final call to action to rethink assumptions.

Tone: ${tone_of_voice}. Confident. Provocative. Respectful.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInCaseStudyPrompt = (vars: any) => {
  const { client_type, problem, solution, result, tone_of_voice } = vars;

  return `
You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Write a 5-day LinkedIn content plan for a case study post.

Inputs:
- Client Type: ${client_type}
- Problem: ${problem}
- Solution: ${solution}
- Result: ${result}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Problem" Post**
*   **Hook:** Start with the painful ${problem} the ${client_type} faced.
*   **Problem:** Dive deep into the emotional and financial cost of the problem.
*   **Story:** Tell a story about the client’s struggle before they found your solution.
*   **CTA:** Ask your audience if they can relate to this problem.

**Day 2: The "Solution" Post**
*   **Hook:** Introduce the simple but powerful ${solution} that changed everything.
*   **Solution:** Show the ${solution} applied.
*   **Breakdown:** Break down the solution into 3 simple steps.
*   **CTA:** Ask your audience what they think of the solution.

**Day 3: The "Result" Post**
*   **Hook:** The incredible, quantifiable ${result} that the client achieved.
*   **Result:** Quantify the ${result} with numbers (e.g., revenue, time saved, % growth).
*   **Story:** Tell the story of the client’s success and how it has changed their business.
*   **CTA:** Encourage your audience to imagine what they could achieve with similar results.

**Day 4: The "Testimonial" Post**
*   **Hook:** A powerful quote from the client.
*   **Testimonial:** Share a glowing testimonial from the client.
*   **Trust:** Build trust and credibility by letting your client do the talking.
*   **CTA:** Ask your audience to share a win of their own.

**Day 5: The "Offer" Post**
*   **Hook:** An invitation to get the same results as your client.
*   **Offer:** Present a clear and compelling offer for your product or service.
*   **Urgency:** Create a sense of urgency with a limited-time offer or a bonus.
*   **CTA:** A strong and direct call to action to book a call or learn more.

Tone: ${tone_of_voice}. Results-driven. Professional. Inspiring.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInHowToPrompt = (vars: any) => {
  const { niche, target_audience, tone_of_voice } = vars;

  return `
You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Write a 5-day LinkedIn content plan for a how-to post for ${target_audience} in ${niche}.

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Why" Post**
*   **Hook:** Start with a bold promise or a myth-busting statement about the topic.
*   **Problem:** Explain why this skill is so important and what problem it solves for ${target_audience}.
*   **Solution:** Briefly introduce the framework or system you will be teaching.
*   **CTA:** Ask a question to gauge the audience’s interest in the topic.

**Day 2: The "Framework" Post**
*   **Hook:** Introduce your unique framework with a punchy name (e.g., The $10K Noise Filter, The 3-Way Validator Test, The 5-Seller Magnet).
*   **Framework:** Break down the framework in 3-5 steps with specifics.
*   **Example:** Use a real-world example to illustrate the framework.
*   **CTA:** Ask the audience to share their biggest takeaway from the framework.

**Day 3: The "Deep Dive" Post**
*   **Hook:** Focus on one specific step of the framework.
*   **Deep Dive:** Go into more detail about that specific step and provide additional value.
*   **Story:** Share a story about how you learned this step and how it has helped you.
*   **CTA:** Ask the audience to share their own experiences with this step.

**Day 4: The "Common Mistakes" Post**
*   **Hook:** The most common mistakes people make when trying to apply this skill.
*   **Mistakes:** List the most common mistakes and explain how to avoid them.
*   **Tip:** Provide a pro-tip to help the audience get even better results.
*   **CTA:** Ask the audience to share a mistake they’ve made and what they learned from it.

**Day 5: The "Success Story" Post**
*   **Hook:** A success story of someone who has used your framework to achieve great results.
*   **Success Story:** Share a testimonial or a case study of a successful student.
*   **Inspiration:** Inspire the audience to take action and apply the framework themselves.
*   **CTA:** A final call to action to try it out today.

Tone: ${tone_of_voice}. Clear. Practical. Teacher-like.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInListiclePrompt = (vars: any) => {
  const { niche, list_topic, target_audience, tone_of_voice } = vars;

  return `
You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Write a 5-day LinkedIn content plan for a listicle post for ${niche}.

Inputs:
- Topic: ${list_topic}
- Audience: ${target_audience}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Hook" Post**
*   **Hook:** Start with a bold statement about why ${list_topic} matters for ${target_audience}.
*   **Problem:** Briefly touch on the problem that the listicle solves.
*   **Intrigue:** Tease the content of the listicle and create a sense of anticipation.
*   **CTA:** Ask a question to get the audience thinking about the topic.

**Day 2: The "First Look" Post**
*   **Hook:** Share the first item on the list and a compelling caption.
*   **First Look:** Give the audience a glimpse of the value they will get from the listicle.
*   **Story:** Tell a short story that relates to the first item on the list.
*   **CTA:** Encourage the audience to check out the full list.

**Day 3: The "Deep Dive" Post**
*   **Hook:** Focus on one key item from the list.
*   **Deep Dive:** Go into more detail about that specific item and provide additional value.
*   **Example:** Share a real-world example or a case study that illustrates the item.
*   **CTA:** Ask the audience to share their own experiences related to the item.

**Day 4: The "Bonus" Post**
*   **Hook:** A bonus item that didn’t make the original list.
*   **Bonus:** Provide an extra tip or resource that is related to the list topic.
*   **Value:** Give the audience even more value and show that you are a generous expert.
*   **CTA:** Ask the audience to share their own bonus tips.

**Day 5: The "Reminder" Post**
*   **Hook:** A gentle reminder to check out the listicle if they haven’t already.
*   **Reminder:** Briefly summarize the key benefits of the listicle.
*   **Community:** Share some of the best comments or insights from the previous posts.
*   **CTA:** A final call to action to read the full list and share it with others.

Tone: ${tone_of_voice}. Punchy. Skimmable. Shareable.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInHotTakePrompt = (vars: any) => {
  const { niche, hot_take, tone_of_voice } = vars;

  return `
You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Write a 5-day LinkedIn content plan for a hot-take post for ${niche}.

Inputs:
- Hot Take: ${hot_take}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Hot Take" Post**
*   **Hook:** Open with the ${hot_take} in one blunt sentence.
*   **Problem:** Explain why this hot take is so important and what it means for ${niche}.
*   **Intrigue:** Hint at the reasoning behind the hot take.
*   **CTA:** Ask your audience for their initial reaction to the hot take.

**Day 2: The "Defense" Post**
*   **Hook:** A bold statement that defends the hot take.
*   **Defense:** Defend the hot take with a systematic Logical reasoning.
*   **Contrast:** Contrast the hot take with what "most people" believe.
*   **CTA:** Ask your audience to challenge your reasoning.

**Day 3: The "Example" Post**
*   **Hook:** A real-world example that proves the hot take.
*   **Example:** Share a story or a case study that illustrates the hot take in action.
*   **Lesson:** Teach a practical lesson from the example.
*   **CTA:** Ask your audience to share their own examples.

**Day 4: The "Implication" Post**
*   **Hook:** The biggest implication of the hot take.
*   **Implication:** Explain the long-term consequences of the hot take for ${niche}.
*   **Prediction:** Share a prediction based on the hot take.
*   **CTA:** Ask your audience if they agree with your prediction.

**Day 5: The "Debate" Post**
*   **Hook:** A provocative question that sparks a debate.
*   **Debate:** Encourage a healthy debate and discussion around the hot take.
*   **Community:** Create a sense of community by engaging with the comments and fostering a lively discussion.
*   **CTA:** A final call to action to rethink assumptions.

Tone: ${tone_of_voice}. Bold. Debate-starting. Professional.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInMotivationPrompt = (vars: any) => {
  const { niche, struggle, target_audience, tone_of_voice } = vars;

  return `
You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Write a 5-day motivational LinkedIn content plan in ${niche}.

Inputs:
- Struggle: ${struggle}
- Audience: ${target_audience}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Struggle" Post**
*   **Hook:** Open with a relatable ${struggle} for ${target_audience}.
*   **Problem:** Dive deep into the emotional and mental toll of the struggle.
*   **Empathy:** Let the audience know that they are not alone in their struggle.
*   **CTA:** Ask the audience to share their own experiences with the struggle.

**Day 2: The "Mindset Shift" Post**
*   **Hook:** The mindset shift that changes everything.
*   **Mindset Shift:** Reveal the new perspective that helps to overcome the struggle.
*   **Story:** Share a story about how you or someone else made this mindset shift.
*   **CTA:** Ask the audience to share their own mindset shifts.

**Day 3: The "Action" Post**
*   **Hook:** A small, actionable step that the audience can take to overcome the struggle.
*   **Action:** Provide a practical tip or exercise that the audience can do right away.
*   **Benefit:** Explain the benefit of taking this action.
*   **CTA:** Encourage the audience to take action and share their results.

**Day 4: The "Inspiration" Post**
*   **Hook:** An inspiring quote or a success story.
*   **Inspiration:** Share a story of someone who has overcome the struggle and achieved great things.
*   **Motivation:** Motivate the audience to keep going and never give up.
*   **CTA:** Ask the audience to tag someone who inspires them.

**Day 5: The "Celebration" Post**
*   **Hook:** A celebration of the progress that has been made.
*   **Celebration:** Celebrate the small wins and the journey of overcoming the struggle.
*   **Community:** Create a sense of community by celebrating the progress of the audience.
*   **CTA:** A final call to action to keep going and to support each other.

Tone: ${tone_of_voice}. Uplifting. Direct. No clichés.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInHiringPrompt = (vars: any) => {
  const { role, company, mission, culture, tone_of_voice } = vars;

  return `
You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Write a 5-day LinkedIn hiring announcement.

Inputs:
- Role: ${role}
- Company: ${company}
- Mission: ${mission}
- Culture: ${culture}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Big News" Post**
*   **Hook:** Announce with excitement that you are hiring for a ${role}.
*   **Vision:** Share the big vision of the ${company} and why this role is so important.
*   **Intrigue:** Hint at the impact the new hire will have on the company.
*   **CTA:** Ask the audience to tag someone who would be a perfect fit for the role.

**Day 2: The "Ideal Candidate" Post**
*   **Hook:** A description of the ideal candidate for the role.
*   **Ideal Candidate:** Describe the skills, experience, and values you are looking for.
*   **Story:** Tell a story about a successful person in a similar role at the company.
*   **CTA:** Encourage potential candidates to apply.

**Day 3: The "Day in the Life" Post**
*   **Hook:** A behind-the-scenes look at a day in the life of someone in the ${role}.
*   **Day in the Life:** Show the exciting projects, challenges, and rewards of the job.
*   **Culture:** Highlight the ${culture} of the company.
*   **CTA:** Ask the audience what they are looking for in their next role.

**Day 4: The "Mission" Post**
*   **Hook:** The powerful ${mission} of the company.
*   **Mission:** Explain why the ${mission} is so important and how the new hire will contribute to it.
*   **Impact:** Show the real-world impact of the company’s work.
*   **CTA:** Ask the audience to share what missions they are passionate about.

**Day 5: The "Last Chance" Post**
*   **Hook:** A final reminder that you are hiring for a ${role}.
*   **Urgency:** Create a sense of urgency by mentioning that the application deadline is approaching.
*   **Invitation:** Invite qualified candidates to apply and join the team.
*   **CTA:** A strong and direct call to action to apply now.

Tone: ${tone_of_voice}. Professional. Warm. Inviting.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};
export const buildLinkedInOfferPrompt = (vars: any) => {
  const { event_name, offer_type, target_audience, tone_of_voice } = vars;

  return `
You are a world-class brand strategist and social media expert, with a deep understanding of emotional marketing and storytelling.
Write a 5-day LinkedIn promotional post.

Inputs:
- Event: ${event_name}
- Offer Type: ${offer_type}
- Audience: ${target_audience}

**The Meta-Prompt Framework (Your 5-Day Plan):**

**Day 1: The "Problem" Post**
*   **Hook:** Start with a painful problem that ${target_audience} face.
*   **Problem:** Dive deep into the emotional and financial cost of the problem.
*   **Intrigue:** Hint at a solution that you will be revealing soon.
*   **CTA:** Ask the audience if they can relate to this problem.

**Day 2: The "Solution" Post**
*   **Hook:** Introduce the ${offer_type} (${event_name}) as the ultimate solution to the problem.
*   **Solution:** Present the ${offer_type} and its key benefits.
*   **Breakdown:** Break down the offer into 3-5 key features.
*   **CTA:** Ask the audience what they think of the offer.

**Day 3: The "Transformation" Post**
*   **Hook:** The incredible transformation that the offer provides.
*   **Transformation:** Paint a picture of the “after” state that the audience will experience.
*   **Story:** Share a story of someone who has been transformed by the offer.
*   **CTA:** Encourage the audience to imagine themselves experiencing the transformation.

**Day 4: The "Urgency" Post**
*   **Hook:** A limited-time offer or a bonus to create a sense of urgency.
*   **Urgency:** Emphasize that the offer is only available for a limited time.
*   **Scarcity:** Mention that there are limited spots or products available.
*   **CTA:** A strong and direct call to action to take advantage of the offer now.

**Day 5: The "Final Call" Post**
*   **Hook:** A final, urgent reminder that the offer is about to expire.
*   **Final Call:** Use strong and persuasive language to encourage immediate action.
*   **FOMO:** Create a strong sense of FOMO (fear of missing out).
*   **CTA:** The final and most direct call to action to get the offer before it’s gone.

Tone: ${tone_of_voice}. Persuasive. Professional. No fluff.

**Output:**
Return a valid JSON array of 5 strings. Each string should be a complete social media post.
Ensure JSON is syntactically correct with no trailing commas.`;
};