const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
    // organization: "org-3zVeYoohoUBNcRZ5dQo5TbqB",
    apiKey: process.env.CHAT_GPT,
});
const GPT_MODEL = process.env.GPT_MODEL || "text-davinci-003"
const openai = new OpenAIApi(configuration);
async function sendChatRequest(message) {
  try {
    const response = await openai.createCompletion({
      model: GPT_MODEL,
      prompt: message,
      temperature: 0.5,
      max_tokens: 45,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.log(error);
    throw new Error('Failed to send chat request');
  }
}

module.exports = { sendChatRequest };
