import type { Language } from '@/components/portfolio/content'

export type AssistantSource = 'professional-profile' | 'professional-profile-ai'

export function assistantSourceLabel(source: AssistantSource, language: Language) {
  if (language === 'pt-BR') return source === 'professional-profile-ai' ? 'Resposta com IA' : 'Base profissional local'
  return source === 'professional-profile-ai' ? 'AI-assisted response' : 'Local professional profile'
}

export async function askAssistant(message: string, language: Language, signal?: AbortSignal): Promise<{ response: string; source: AssistantSource }> {
  const controller = new AbortController()
  const abort = () => controller.abort()
  if (signal?.aborted) abort()
  signal?.addEventListener('abort', abort, { once: true })
  const timer = setTimeout(abort, 12000)
  try {
    const response = await fetch('/api/ler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, language }),
      signal: controller.signal,
    })
    const data = await response.json()
    if (!response.ok || typeof data.response !== 'string') {
      throw new Error(language === 'pt-BR'
        ? response.status === 429 ? 'Muitas solicitações. Tente novamente em instantes.' : 'Não foi possível responder. Use os comandos do portfólio ou tente novamente.'
        : response.status === 429 ? 'Too many requests. Please try again shortly.' : 'Unable to respond. Use the portfolio commands or try again.')
    }
    return { response: data.response, source: data.source === 'professional-profile-ai' ? data.source : 'professional-profile' }
  } catch (error) {
    if (controller.signal.aborted) throw new Error(language === 'pt-BR' ? 'Tempo de espera encerrado. Tente novamente.' : 'The request timed out. Please try again.')
    if (error instanceof TypeError || error instanceof SyntaxError) throw new Error(language === 'pt-BR' ? 'O assistente não pôde ser alcançado. Tente novamente ou use os comandos do portfólio.' : 'The assistant could not be reached. Try again or use the portfolio commands.')
    throw error
  } finally {
    clearTimeout(timer)
    signal?.removeEventListener('abort', abort)
  }
}
