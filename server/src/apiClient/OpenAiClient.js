import dotenv from 'dotenv'
import OpenAiConfig from './OpenAiConfig.js'
import { OpenAIApi } from "openai"


class OpenAiClient {
  static async generatePrompt(promptText) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not found in environment variables')
    }

    const openai = new OpenAIApi(OpenAiConfig.configuration)
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": promptText}],
    });
    console.log(response.data.usage);

    return {
      content: response.data.choices[0].message.content,
      usage: response.data.usage.total_tokens,
    }
  }
}

export default OpenAiClient
