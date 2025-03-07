require('dotenv').config();
const OpenAI = require('openai');

const openaiApiKey = process.env.OPENAI_API_KEY;

const client = new OpenAI({
  apiKey: openaiApiKey,
});

async function createTrip(cidade, categorias, dias) {
  const prompt = `
        Gere um roteiro turístico para ${dias} dia(s) em ${cidade}.
        Considere as seguintes categorias de interesse: ${categorias}.
        Liste os pontos turísticos e descreva cada um brevemente.
        Se houver algum custo, informe o preço estimado da entrada/ingresso.
        Como resultado, traga somente o roteiro separado por dias, 
        não escreva nada antes e nada depois.
        Na sua resposta, use um linguajar jovem e não use emojis.
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
