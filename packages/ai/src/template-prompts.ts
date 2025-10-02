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
