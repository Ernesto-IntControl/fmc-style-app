const OpenAI = require("openai");

const creerClientOpenAI = () => {
  if (!process.env.OPENAI_API_KEY) return null;
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
};

module.exports = { creerClientOpenAI };
