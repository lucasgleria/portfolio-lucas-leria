import { NextRequest, NextResponse } from 'next/server'
import { createGenerationBudget } from '@/lib/assistant-limits'
import { MAX_QUESTION_LENGTH, parseConversationHistory } from '@/lib/assistant-conversation'
import { DEFAULT_GOOGLE_MODEL, generateProfessionalAnswer } from '@/lib/assistant-provider'
import { getResponseLanguage, professionalConversation, resolveProfessionalAnswer } from '@/lib/professional-knowledge'

const generationBudget = createGenerationBudget()

export async function POST(request: NextRequest) {
  let payload: { message?: unknown; language?: unknown; history?: unknown }
  try {
    const body = await request.json()
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Invalid body')
    payload = body
  } catch { return NextResponse.json({ error: 'A JSON object is required' }, { status: 400 }) }
  if (typeof payload.message !== 'string' || !payload.message.trim() || payload.message.length > MAX_QUESTION_LENGTH) return NextResponse.json({ error: 'A message between 1 and 2000 characters is required' }, { status: 400 })
  const parsedHistory = parseConversationHistory(payload.history)
  if (!parsedHistory) return NextResponse.json({ error: 'Invalid conversation history' }, { status: 400 })
  const history = professionalConversation(parsedHistory)
  const message = payload.message.trim()
  const language = getResponseLanguage(message, payload.language)
  const answer = resolveProfessionalAnswer(message, language, history)
  const localResponse = () => NextResponse.json({ response: answer.response, source: 'professional-profile', links: answer.links, suggestions: answer.suggestions })
  const apiKey = process.env.GOOGLE_API_KEY?.trim() || process.env.GEMINI_API_KEY?.trim()
  if (!apiKey || !answer.generate || !generationBudget().allowed) return localResponse()
  try {
    const response = await generateProfessionalAnswer({ apiKey, model: process.env.GOOGLE_MODEL?.trim() || DEFAULT_GOOGLE_MODEL, message, language, history, answer, signal: request.signal })
    if (response) return NextResponse.json({ response, source: 'professional-profile-ai', links: answer.links, suggestions: answer.suggestions })
  } catch (error) {
    // Never log user questions, conversation history, keys or provider payloads.
    console.warn('Portfolio assistant: generation unavailable.', error instanceof Error && /^provider-http-\d{3}$/.test(error.message) ? error.message : 'request-failed')
  }
  return localResponse()
}
