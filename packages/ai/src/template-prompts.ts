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
