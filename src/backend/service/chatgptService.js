require('dotenv').config();
const OpenAI = require('openai');
const logger = require('../logger/logger');
const createPrompt = require('./prompt');

const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  logger.error('Error: OPENAI_API_KEY not found. Check your .env file.');
  process.exit(1); // Finish with error
}

const client = new OpenAI({
  apiKey: openaiApiKey,
});

async function createTrip(destination, days, categories) {
  if (!destination || !days || !categories) {
    throw new Error('Invalid parameters');
  }

  const generatedPrompt = createPrompt(destination, days, categories);

  try {
    const response = await client.chat.completions.create({
      messages: [{ role: 'user', content: generatedPrompt }],
      model: 'gpt-4o-mini',
    });

    const trip =
      response.choices[0]?.message?.content || 'No response generated.';

    return JSON.parse(trip);
  } catch (error) {
    logger.error(
      'Error calling OpenAI API: ',
      error.response?.data || error.message
    );
    return 'Error creating travel plan. Please try again later.';
  }
}

module.exports = { createTrip };
