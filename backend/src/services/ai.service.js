import { ChatMistralAI } from "@langchain/mistralai";
import {
  AIMessage,
  createAgent,
  HumanMessage,
  SystemMessage,
  tool,
} from "langchain";
import { TavilySearch } from "@langchain/tavily";
import readline from "readline/promises";
import { sendMail } from "./mail.service.js";
import * as z from "zod";

const rl = new readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatMistralAI({
  model: "mistral-small-latest",
});

const tavilyTool = new TavilySearch({
  maxResults: 3,
});

const mailTool = tool(sendMail, {
  name: "emailTool",
  description: "Use this tool for sending mails",
  schema: z.object({
    to: z.string().describe("The recipient's email address"),
    html: z.string().describe("The html content of the email"),
    subject: z.string().describe("The subject of the email"),
  }),
});

const agent = new createAgent({
  model: model,
  tools: [mailTool, tavilyTool],
  systemPrompt:
    "You are a helpful assistent. If user ask about cuurent date, time, latest or latest information, weather Always use the Tavily search tool to get real-time data.",
});

// const messages = [];
// export async function testAi() {
//   while (true) {
//     const userInput = await rl.question("You: ");
//     messages.push(new HumanMessage(userInput + "use internet if needed"));

//     const response = await agent.invoke({
//       messages: messages,
//     });

//     const aiReply = response.messages.at(-1).content;
//     console.log("AI:", aiReply);
//     messages.push(new AIMessage(aiReply));
//   }
// }

export async function generateResponse(messages) {
  const formatedMessage = messages.map((msg) => {
    if (msg.role === "user") {
      return new HumanMessage(msg.content);
    } else if (msg.role === "ai") {
      return new AIMessage(msg.content);
    }
  });
  const response = await agent.invoke({ messages: formatedMessage });

  
  const aiReply = response.messages.at(-1).content;

  return aiReply;
}

export async function generateTitleChat(message) {
  const response = await model.invoke([
    new SystemMessage(`You are a helpful assistant that generates  concise and descriptive titles for chat conversation
      
      User will provide you with the first message of a chat conversation, and you will generate a title that capture the esence of the conversation in 2-4 words. the title should be clear, relevent, and engagin, giving users a quick understanding of the chat's topic 
      `),
    new HumanMessage(
      `Generate a title for a chat conversation based on the following first message: "${message}"`,
    ),
  ]);

  return response.content;
}
