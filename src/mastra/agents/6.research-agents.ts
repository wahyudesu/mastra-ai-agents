import { Agent } from "@mastra/core/agent";
import { createVectorQueryTool, createGraphRAGTool } from "@mastra/rag";
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

// Create a tool for semantic search over our paper embeddings
const vectorQueryTool = createVectorQueryTool({
  vectorStoreName: "pgVector",
  indexName: "papers",
  model: google.textEmbeddingModel('text-embedding-004'),
});
 
export const ragAgent = new Agent({
  name: "RAG Agent",
  instructions:
    "You are a helpful assistant that answers questions based on the provided context. Keep your answers concise and relevant.",
  model: google('gemini-2.5-flash-lite'),
  tools: {
    vectorQueryTool,
  },
});