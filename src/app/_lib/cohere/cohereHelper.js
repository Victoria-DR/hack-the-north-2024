const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: process.env.NEXT_PUBLIC_COHERE_API_KEY,
});

export const generatePrompt = async () => {
  const response = await cohere.chat({
    message:
      "Generate a pro-con debate topic where each side will only speak once and for around 30 seconds each. Avoid controversial topics. Do not format with Markdown. Do not make a argument for the debate, only generate the topic. The topic should be 1 sentence.",
    stream: false,
    connectors: [{ id: "web-search" }],
  });

  return response.text;
};

export const generateArgument = async (prompt, agent, side) => {
  const response = await cohere.chat({
    message: `Pretend that you are participating in a debate as ${agent.name} with a ${agent.personality} personality. As ${agent.name} you must create a descriptive and convincing argument to the above prompt arguing for the ${side} side. Your debating skill level should be reflected in your difficulty rating of ${agent.difficulty} out of 10. If your rating is low you might say 'um' or similar pause words, state wrong information, or struggle to form a cohesive argument. If your difficulty is high you will make few to no mistakes. Do not make an introductory statement, jump straight into the argument. During the debate, you should write as the character you are portraying and their associated personality type. Your debate must end with a proper closing statement justifying why your ${side} stance on the argument is correct. It is not required to reintroduce your character and you may assume the opposition knows who you are. Rather, focus on maintaining your character through your argument. Your argument should be between 3 to 5 sentences and in 1 paragraph. Ensure that interactions are constructive, avoiding personal attacks. You should not avoid political, religious, and violent subjects in your argument. Do not format with Markdown. End with a complete sentence with a period.`,
    stream: false,
    chatHistory: [
      {
        role: "SYSTEM",
        message: prompt,
      },
    ],
    connectors: [{ id: "web-search" }],
    maxTokens: 150,
  });

  return response.text;
};

export const generateFeedback = async (prompt, userArgument, aiArgument) => {
  const response = await cohere.chat({
    message:
      "Now pretend that you are a judge mediating this debate and that you must have an objective and unbiased decision. Remember that the user and AI will be arguing for opposing stances and the accuracy and factual correctness of each stance should be considered. For the user's argument you will you will judge it on the following three categories: creativity, logic, and flow. The following is a description of each category and you must rate the user a score for each category between 0 and 100. Creativity: Did the user make a unique and compelling argument as to why their side was correct? Logic: Did what the user say relate to the topic and was it factual? Flow: Did the user make any grammatical mistakes or stutter? You will also provide a brief paragraph with feedback for the user's argument overall. The feedback must be in past tense. The feedback should be 3 to 5 sentences long and in 1 paragraph. Do not format with Markdown. End with a complete sentence with a period.",
    stream: false,
    chatHistory: [
      {
        role: "SYSTEM",
        message: prompt,
      },
      {
        role: "USER",
        message: userArgument,
      },
      {
        role: "CHATBOT",
        message: aiArgument,
      },
    ],
    responseFormat: {
      type: "json_object",
      schema: {
        type: "object",
        properties: {
          creativity: {
            type: "integer",
          },
          logic: {
            type: "integer",
          },
          flow: {
            type: "integer",
          },
          feedback: {
            type: "string",
          },
        },
        required: ["creativity", "logic", "flow", "feedback"],
      },
    },
  });

  return response.text;
};
