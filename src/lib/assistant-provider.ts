import type { ProfileLanguage } from '@/cli/data/professional-profile'
import { getProfessionalSystemInstruction, type ProfessionalAnswer } from './professional-knowledge'
import { MAX_ANSWER_LENGTH, type AssistantTurn } from './assistant-conversation'

// Stable model reviewed against Google's official model documentation in Nov 2026.
export const DEFAULT_GOOGLE_MODEL = 'gemini-3.1-flash-lite'

export async function generateProfessionalAnswer({ apiKey, model, message, language, history, answer, signal }: {
  apiKey: string; model: string; message: string; language: ProfileLanguage; history: AssistantTurn[]; answer: ProfessionalAnswer; signal: AbortSignal
}): Promise<string | undefined> {
  const modelId = model.replace(/^models\//, '')
  if (!/^[a-zA-Z0-9._-]{1,100}$/.test(modelId) || !answer.facts.length) return undefined
  const ids = answer.facts.map(fact => fact.id)
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent`, {
    method: 'POST', cache: 'no-store', signal: AbortSignal.any([signal, AbortSignal.timeout(8000)]),
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey, 'x-goog-api-client': 'lucas-portfolio/1.0' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: getProfessionalSystemInstruction(language, answer) }] },
      contents: [...history.map(turn => ({ role: turn.role === 'assistant' ? 'model' : 'user', parts: [{ text: turn.content }] })), { role: 'user', parts: [{ text: message }] }],
      generationConfig: {
        maxOutputTokens: 1000, responseMimeType: 'application/json',
        responseJsonSchema: { type: 'object', properties: { answer: { type: 'string' }, factIds: { type: 'array', items: { type: 'string', enum: ids } } }, required: ['answer', 'factIds'], additionalProperties: false },
      },
    }),
  })
  if (!response.ok) throw new Error(`provider-http-${response.status}`)
  const data = await response.json()
  const candidate = data.candidates?.[0]
  if (candidate?.finishReason !== 'STOP' || !Array.isArray(candidate.content?.parts)) return undefined
  const text = candidate.content.parts.filter((part: { thought?: boolean; text?: unknown }) => !part.thought && typeof part.text === 'string').map((part: { text: string }) => part.text).join('')
  let result: { answer?: unknown; factIds?: unknown }
  try { result = JSON.parse(text) } catch { return undefined }
  if (typeof result.answer !== 'string' || !result.answer.trim() || result.answer.length > MAX_ANSWER_LENGTH) return undefined
  if (!Array.isArray(result.factIds) || !result.factIds.length || result.factIds.some(id => typeof id !== 'string' || !ids.includes(id))) return undefined
  // Do not display generated contact data, credentials, unsupported career claims
  // or model-generated URLs. Navigation comes exclusively from curated data.
  if (/[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:\d[\s().+-]*){11,}|AIza[\w-]{20,}|https?:\/\//i.test(result.answer)) return undefined
  if (/\d+\s*(?:anos de experiencia|years of experience)|(?:trabalhou n[ao]|worked at|senioridade|seniority)/i.test(result.answer)) return undefined
  const knownNumbers = new Set(JSON.stringify(answer.facts).match(/\b\d+(?:[.,]\d+)*\b/g) ?? [])
  knownNumbers.add(String(answer.facts.length))
  if ((result.answer.match(/\b\d+(?:[.,]\d+)*\b/g) ?? []).some(number => !knownNumbers.has(number))) return undefined
  return result.answer.trim()
}
