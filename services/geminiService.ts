
import { GoogleGenAI } from "@google/genai";
import { Section, SectionKey } from "../types";

// Get API key from environment variables
// Vite exposes env vars prefixed with VITE_ 
// Set VITE_GEMINI_API_KEY in your .env file or .env.local file
const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export async function fetchSectionContent(sectionId: string, sectionTitle: string): Promise<{ content: string; sources: any[] }> {
  try {
    const prompt = `Provide a detailed documentation guide for the "Claude Cowork" tool (the collaborative environment by Anthropic). 
    Focus specifically on the section: "${sectionTitle}". 
    Explain key features, collaborative workflows, and best practices. 
    Format the output in clean Markdown. 
    
    CRITICAL SEARCH INSTRUCTION: 
    1. Use Google Search to find OFFICIAL YouTube videos from "Anthropic" or reputable tech reviewers demonstrating "Claude Cowork" or "Claude Team/Enterprise" collaborative features. 
    2. Only provide links that are likely to be public and allow embedding. 
    3. If specific "Claude Cowork" videos are unavailable, search for "Claude 3.5 Sonnet Artifacts collaboration" or "Claude Teams feature overview".
    4. Ensure these YouTube links appear in the groundingMetadata/groundingChunks.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const content = response.text || "Content not available.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const formattedSources = sources
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title,
        uri: chunk.web.uri,
      }));

    return { content, sources: formattedSources };
  } catch (error) {
    console.error(`Error fetching section ${sectionId}:`, error);
    return { 
      content: `Failed to load information for ${sectionTitle}. Please check your connection or try again later.`, 
      sources: [] 
    };
  }
}

export async function searchDocumentation(query: string): Promise<string> {
  try {
    const prompt = `The user is searching for "${query}" in the Claude Cowork documentation. 
    Claude Cowork refers to the suite of collaborative features (like Teams, Artifacts, and shared chats) in Claude.
    Provide a concise, helpful answer based on current knowledge and search results.
    Format as Markdown.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    return response.text || "No relevant information found.";
  } catch (error) {
    console.error("Search error:", error);
    return "An error occurred while searching. Please try again.";
  }
}
