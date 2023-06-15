const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
    // organization: "org-3zVeYoohoUBNcRZ5dQo5TbqB",
    apiKey: process.env.CHAT_GPT,
});
const GPT_MODEL = [
  "text-davinci-003",
  "gpt-3.5-turbo"
]
const openai = new OpenAIApi(configuration);

async function sendChatRequest(message) {
  try {
    const response = await responseByModel(GPT_MODEL[0], message);
    return response;
  } catch (error) {
    console.log(error.message);
    console.log(error.response);
    throw new Error('Failed to send chat request');
  }
}

async function responseByModel(openAiModel, message) {
  let response=`${openAiModel} model is not supported`;
  switch (openAiModel) {
    case 'text-davinci-003': {
      const response = await openai.createCompletion({
        model: openAiModel,
        prompt: message.trim(),
        temperature: 0.5,
        max_tokens: 45,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0
      });
      return response.data.choices[0].text.trim();
    }
    default: {
      return response;
    }
  }
}
module.exports = { sendChatRequest };
