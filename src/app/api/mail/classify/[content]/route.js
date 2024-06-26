import axios from "axios";
import { GoogleGenerativeAI } from '@google/generative-ai';

const gemini_api_key = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};
 
const geminiModel = googleAI.getGenerativeModel({
  model: 'gemini-pro',
  geminiConfig,
});


export async function GET(Request, { params }) {

      const prompt = `
    Classify the following email into one of the categories: "Important", "Promotions", "Social", "Marketing", "Spam", or "General".
    Email: ${params.content}
    Label:
  `;

  try {
    // const prompt = 'Tell me about google.';
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
  
    return new Response(response.text()); 
  } catch (error) {
    console.log('response error', error);
  }
}




// export async function GET(Request, { params }) {

//     const prompt = `
//     Classify the following email into one of the categories: "Important", "Promotions", "Social", "Marketing", "Spam", or "General".
//     Email: ${params.content}
//     Label:
//   `;

//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/completions',
//       {
//         model: 'gpt-3.5-turbo',
//         prompt: prompt,
//         max_tokens: 1,
//         temperature: 0
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//           'OpenAI-Organization': process.env.ORGANIZATION_ID, 
//           'X-Project-ID': process.env.PROJECT_ID
//         }
//       }
//     );

//     const label = response.data.choices[0].text.trim();
//     return new Response(label); 
//   } catch (error) {
//     console.error('Error classifying email:', error.response ? error.response.data : error.message);
//     return new Response(JSON.stringify({ message: error }), { status: 500 });
//   }


//   }