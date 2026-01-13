
export interface Section {
  id: string;
  title: string;
  icon: string;
  content?: string;
  sources?: Array<{ title: string; uri: string }>;
}

export interface DocumentationData {
  introduction: Section;
  installation: Section;
  authentication: Section;
  basicUsage: Section;
  advancedFeatures: Section;
  troubleshooting: Section;
}

export type SectionKey = keyof DocumentationData;

export interface SearchResult {
  title: string;
  snippet: string;
  sectionId: SectionKey;
  relevance: number;
}

export type Locale = "en" | "zh" | "ja" | "es" | "de" | "fr";
