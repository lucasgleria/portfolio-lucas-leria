import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { createGenerationBudget } from '@/lib/assistant-limits'
import {
  answerProfessionalQuestion,
  getProfessionalSystemInstruction,
  getResponseLanguage,
  isPrivateInformationRequest,
  privateInformationResponse,
} from '@/lib/professional-knowledge'

const generationBudget = createGenerationBudget()

export async function POST(request: NextRequest) {
  let payload: { message?: unknown; language?: unknown }
  try {
    const body = await request.json()
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Invalid body')
    payload = body
  } catch {
    return NextResponse.json({ error: 'A JSON object is required' }, { status: 400 })
  }

  if (
    typeof payload.message !== 'string' ||
    !payload.message.trim() ||
    payload.message.length > 2000
  ) {
    return NextResponse.json(
      { error: 'A message between 1 and 2000 characters is required' },
      { status: 400 },
    )
  }

  const message = payload.message.trim()
  const language = getResponseLanguage(message, payload.language)
  if (isPrivateInformationRequest(message)) {
    return NextResponse.json({
      response: privateInformationResponse(language),
      source: 'professional-profile',
    })
  }

  const localResponse = () =>
    NextResponse.json({
      response: answerProfessionalQuestion(message, language),
      source: 'professional-profile',
    })
  const apiKey = process.env.GOOGLE_API_KEY
  const modelId = process.env.GOOGLE_MODEL
  if (!apiKey || !modelId) return localResponse()

  const budget = generationBudget()
  if (!budget.allowed) {
    return NextResponse.json({ error: 'Please try again shortly' }, { status: 429, headers: { 'Retry-After': String(budget.retryAfter) } })
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: modelId,
      systemInstruction: getProfessionalSystemInstruction(),
    })
    const result = await model.generateContent(message, { timeout: 8000, signal: request.signal })
    const response = result.response.text().trim()
    return response
      ? NextResponse.json({ response, source: 'professional-profile-ai' })
      : localResponse()
  } catch {
    // Avoid logging questions, credentials or provider payloads.
    console.error('Professional portfolio assistant: remote generation unavailable.')
    return localResponse()
  }
}
