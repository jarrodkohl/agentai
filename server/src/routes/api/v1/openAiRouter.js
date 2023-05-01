import express from 'express';
import OpenAiClient from '../../../apiClient/OpenAiClient.js';
import dotenv from 'dotenv';

dotenv.config()

const openAiRouter = express.Router()

openAiRouter.get('/generate-prompt', async (req, res) => {
  console.log(req.query)
  const { promptText } = req.query
  try {
    const {content, usage } = await OpenAiClient.generatePrompt(promptText)
    res.json({ prompt: content, usage: usage })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred' })
  }
})

openAiRouter.post('/generate-image', async (req, res) => {
  const { prompt } = req.body;

    try {
        const openai = new OpenAIApi(OpenAiConfig.configuration);
        const response = await openai.createImage({
            model: "image-alpha-001",
            prompt: prompt,
            n: 1,
            size: "512x512"
        });
        const imageUrl = response.data.data[0].url
        res.json({ imageUrl })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

export default openAiRouter;

