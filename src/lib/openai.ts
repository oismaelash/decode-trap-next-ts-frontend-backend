import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface LyricAnalysis {
  part: string;
  decode: string;
}

export async function analyzeLyrics(lyrics: string): Promise<LyricAnalysis[]> {
  const prompt = `Você é um especialista em cultura urbana e trap brasileiro. Abaixo está a letra de uma música. Identifique até 5 trechos com figuras de linguagem (como metáforas, gírias, hipérboles, etc) e explique o que cada trecho quer dizer de forma simples para quem não conhece o estilo.

Para cada trecho, retorne um objeto JSON com a seguinte estrutura:
{
  "part": "trecho da música",
  "decode": "explicação do significado"
}

Retorne um array [{"part": "X", "decode": "Y"}] de até 5 objetos no formato acima. A resposta deve ser apenas o JSON, sem texto adicional.

Letra da música:
${lyrics}`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: process.env.MODEL || 'gpt-4o-mini',
    response_format: { type: "json_object" }
  });

  const response = completion.choices[0].message.content;
  if (!response) {
    throw new Error('No response from OpenAI');
  }
  
  const parsedResponse = JSON.parse(response);
  console.log(parsedResponse);
  
  // Extract the array from the response object, regardless of its property name
  const analysisArray = Object.values(parsedResponse).find(value => Array.isArray(value));
  if (!analysisArray) {
    throw new Error('No analysis array found in the response');
  }
  
  return analysisArray;
} 

// {
//     "lyrics": "original lyrics here...",
//     "analysis": [
//       {
//         "part": "Tô voando na nuvem",
//         "decode": "Expressão que significa estar chapado ou sob efeito de drogas"
//       },
//       {
//         "part": "Minha grana tá voando",
//         "decode": "Metáfora para indicar que está ganhando muito dinheiro"
//       }
//       // ... up to 5 analyses
//     ]
//   }