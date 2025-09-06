The AI features of the application are not working because the required environment variables are not set. To fix this, you need to create a `.env` file in the `packages/api` directory and add the following variables:

```
AI_API_URL=https://api.openai.com/v1
AI_API_KEY=your_openai_api_key_here
```

You need to replace `your_openai_api_key_here` with your actual OpenAI API key.

Once you have added these variables, you need to restart the backend server for the changes to take effect.
