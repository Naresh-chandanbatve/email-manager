import axios from "axios";



export async function GET(Request, { params }) {

    const prompt = `
    Classify the following email into one of the categories: "Important", "Promotions", "Social", "Marketing", "Spam", or "General".
    Email: ${params.content}
    Label:
  `;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-3.5-turbo',
        prompt: prompt,
        max_tokens: 1,
        temperature: 0
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'OpenAI-Organization': process.env.ORGANIZATION_ID, 
          'X-Project-ID': process.env.PROJECT_ID
        }
      }
    );

    const label = response.data.choices[0].text.trim();
    return new Response(label); 
  } catch (error) {
    console.error('Error classifying email:', error.response ? error.response.data : error.message);
    return new Response(JSON.stringify({ message: error }), { status: 500 });
  }


  }