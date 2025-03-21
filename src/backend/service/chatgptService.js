require('dotenv').config();
const OpenAI = require('openai');
const logger = require('../logger/logger');
const createPrompt = require('./prompt');

const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  logger.error('OPENAI_API_KEY not found. Check your .env file.');
  process.exit(1); // Finish with error
}

const client = new OpenAI({
  apiKey: openaiApiKey,
});

async function createTrip(destination, days, categories) {
  if (!destination || !days || !categories) {
    throw new Error('Invalid parameters');
  }

  const model = getChatGPTModel();
  if (!model) {
    throw new Error('OPENAI_CHATGPT_MODEL not found');
  }

  const generatedPrompt = createPrompt(destination, days, categories);
  if (!generatedPrompt) {
    throw new Error('Received empty prompt');
  }

  try {
    const response = await client.chat.completions.create({
      messages: [{ role: 'user', content: generatedPrompt }],
      model,
    });

    const trip =
      response.choices[0]?.message?.content || 'No response generated.';

    return JSON.parse(cleanJSONResponse(trip));
  } catch (error) {
    logger.error('Error creating trip.', error);
    return '';
  }
}

const cleanJSONResponse = (response) => {
  return response.replace(/```json\n?/, '').replace(/\n?```/, '');
};

const getChatGPTModel = () => {
  return process.env.OPENAI_CHATGPT_MODEL;
};

module.exports = { createTrip };
