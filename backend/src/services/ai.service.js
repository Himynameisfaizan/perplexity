import { ChatMistralAI } from "@langchain/mistralai";
import { AIMessage, createAgent, HumanMessage } from "langchain";
import { TavilySearch } from "@langchain/tavily";
import readline from "readline/promises";

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

const agent = new createAgent({
  model: model,
  tools: [tavilyTool]
});

const messages = [];
export async function testAi() {
  while (true) {
    const userInput = await rl.question("You: ");

    // user message store
    messages.push(new HumanMessage(userInput));

    const response = await agent.invoke({
      messages: messages,
    });

    const aiReply = response.messages.at(-1).content;

    console.log("AI:", aiReply);

    // AI reply bhi store
    messages.push(new AIMessage(aiReply));
  }
}
