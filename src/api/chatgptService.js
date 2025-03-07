require('dotenv').config();
const OpenAI = require('openai');

const openaiApiKey = process.env.OPENAI_API_KEY;

const client = new OpenAI({
  apiKey: openaiApiKey,
});

async function createTrip(destino, categorias, dias) {
  const prompt = `
        Atue como um planejador de viagens e gere um roteiro turístico para ${dias} dia(s) em ${destino}, 
        baseado nas seguintes categorias de interesse: ${categorias}. 
        Liste os pontos turísticos para cada dia, organizando-os de forma lógica e 
        descrevendo brevemente cada um. 
        Se houver custos de entrada, inclua a estimativa do valor. 
        A resposta deve conter somente o roteiro separado por dias, sem introdução ou conclusão. 
        Use um tom jovem e descontraído, mas evite emojis.
    `;

  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4o-mini',
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error('Erro na API do ChatGPT:', error);
    return 'Erro ao gerar o roteiro.';
  }
}

module.exports = { createTrip };
