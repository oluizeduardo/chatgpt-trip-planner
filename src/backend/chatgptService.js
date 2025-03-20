require('dotenv').config();
const OpenAI = require('openai');
const logger = require('./logger/logger');

const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  logger.error('Error: OPENAI_API_KEY not found. Check your .env file.');
  process.exit(1); // Finish with error
}

const client = new OpenAI({
  apiKey: openaiApiKey,
});

async function createTrip(destination, category, days) {
  if (!destination || !category || !days) {
    throw new Error(
      'Invalid parameters: destination, category and days are required.'
    );
  }

  const prompt = `
        Atue como um planejador de viagens e gere um roteiro turístico para ${days} dia(s) em ${destination}, 
        baseado nas seguintes categorias de interesse: ${category}. 
        Liste os pontos turísticos para cada dia, organizando-os de forma lógica: manhã, tarde e noite, 
        descreva cada um brevemente.
        Se houver custos de entrada, inclua a estimativa do valor. 
        A resposta deve conter somente o roteiro separado por dias, sem introdução ou conclusão. 
        Use um tom jovem e descontraído, mas evite emojis.
    `;

  try {
    const response = await client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4o-mini',
    });

    const trip =
      response.choices[0]?.message?.content || 'No response generated.';

    return JSON.stringify(trip);
  } catch (error) {
    logger.error(
      'Error calling OpenAI API: ',
      error.response?.data || error.message
    );
    return 'Error creating travel plan. Please try again later.';
  }
}

module.exports = { createTrip };
