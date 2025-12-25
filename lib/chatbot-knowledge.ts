// Chatbot Knowledge Base (Additive only, no external API keys)
// This module provides read-only access to site knowledge for chatbot enhancement

export interface KnowledgeEntry {
  id: string
  category: string
  question: string
  answer: string
  keywords: string[]
  priority: number
}

export const siteKnowledge: KnowledgeEntry[] = [
  {
    id: "hours",
    category: "hours",
    question: "What are your hours of operation?",
    answer:
      "Skin Cabaret is open daily from 8:00 PM to 6:00 AM. We provide world-class adult entertainment throughout the night.",
    keywords: ["hours", "open", "time", "schedule", "when"],
    priority: 10,
  },
  {
    id: "location",
    category: "location",
    question: "Where are you located?",
    answer:
      "We are located at 1137 N Scottsdale Rd, Scottsdale, AZ 85251. We are in the heart of Scottsdale nightlife district.",
    keywords: ["location", "address", "where", "directions"],
    priority: 10,
  },
  {
    id: "phone",
    category: "contact",
    question: "How do I contact you?",
    answer: "Call us at (480) 425-7546 for reservations, VIP packages, or any questions. Our staff is ready to help.",
    keywords: ["phone", "contact", "call", "number"],
    priority: 10,
  },
  {
    id: "vip",
    category: "services",
    question: "What VIP services do you offer?",
    answer:
      "We offer premium VIP packages including bottle service, private seating, bachelor party packages, and exclusive entertainment experiences.",
    keywords: ["vip", "bottle service", "premium", "exclusive"],
    priority: 9,
  },
  {
    id: "bachelor",
    category: "services",
    question: "Do you host bachelor parties?",
    answer:
      "Yes! Skin Cabaret is Scottsdale premier destination for bachelor parties. We offer custom packages with VIP treatment, bottle service, and unforgettable entertainment.",
    keywords: ["bachelor", "party", "celebration", "group"],
    priority: 9,
  },
  {
    id: "age",
    category: "policies",
    question: "What is the age requirement?",
    answer: "Skin Cabaret is strictly 21+ years old. Valid government-issued ID is required for entry.",
    keywords: ["age", "21", "id", "requirement"],
    priority: 8,
  },
  {
    id: "dress",
    category: "policies",
    question: "Is there a dress code?",
    answer:
      "We maintain an upscale atmosphere. Business casual or better is recommended. No athletic wear, tank tops, or overly casual attire.",
    keywords: ["dress", "attire", "code", "clothing"],
    priority: 7,
  },
  {
    id: "parking",
    category: "amenities",
    question: "Is parking available?",
    answer: "Yes, we offer convenient parking options near the venue. Valet service is also available for VIP guests.",
    keywords: ["parking", "valet", "car"],
    priority: 6,
  },
]

export function searchKnowledge(query: string): KnowledgeEntry[] {
  const lowercaseQuery = query.toLowerCase()

  return siteKnowledge
    .filter(
      (entry) =>
        entry.keywords.some((keyword) => lowercaseQuery.includes(keyword)) ||
        entry.question.toLowerCase().includes(lowercaseQuery) ||
        entry.answer.toLowerCase().includes(lowercaseQuery),
    )
    .sort((a, b) => b.priority - a.priority)
}

export function getKnowledgeByCategory(category: string): KnowledgeEntry[] {
  return siteKnowledge.filter((entry) => entry.category === category).sort((a, b) => b.priority - a.priority)
}

export function getAllKnowledge(): KnowledgeEntry[] {
  return siteKnowledge.sort((a, b) => b.priority - a.priority)
}
