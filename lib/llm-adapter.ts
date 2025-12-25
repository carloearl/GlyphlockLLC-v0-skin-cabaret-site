// LLM Adapter with fallback support (No API keys generated)
// Supports multiple providers via environment variables only

export interface LLMConfig {
  provider?: string
  apiKey?: string
  model?: string
  fallbackMode: boolean
}

export interface LLMResponse {
  text: string
  source: "llm" | "fallback" | "knowledge"
  confidence: number
}

export function getLLMConfig(): LLMConfig {
  return {
    provider: process.env.LLM_PROVIDER,
    apiKey: process.env.LLM_API_KEY,
    model: process.env.LLM_MODEL,
    fallbackMode: process.env.LLM_FALLBACK_MODE === "on" || !process.env.LLM_API_KEY,
  }
}

export async function generateResponse(query: string, context?: string): Promise<LLMResponse> {
  const config = getLLMConfig()

  // Fallback mode - use knowledge base only
  if (config.fallbackMode || !config.apiKey) {
    return {
      text: "Our team is here to help! Please call us at (480) 425-7546 for immediate assistance, or check our website for more information.",
      source: "fallback",
      confidence: 0.7,
    }
  }

  // Placeholder for future LLM integration when keys are provided
  // This will be implemented when env vars are populated by user
  return {
    text: "LLM provider not configured. Please set LLM_PROVIDER and LLM_API_KEY environment variables.",
    source: "fallback",
    confidence: 0.5,
  }
}

export function isLLMConfigured(): boolean {
  const config = getLLMConfig()
  return !!(config.provider && config.apiKey && config.model)
}
