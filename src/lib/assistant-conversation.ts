export type AssistantSource = 'professional-profile' | 'professional-profile-ai'
export type AssistantTurn = { role: 'user' | 'assistant'; content: string }
export type AssistantLink = { label: string; url: string }
export type AssistantReply = { response: string; source: AssistantSource; links: AssistantLink[]; suggestions: string[] }
export const MAX_QUESTION_LENGTH = 2000
export const MAX_ANSWER_LENGTH = 4000
export const MAX_HISTORY_MESSAGES = 8
export const MAX_HISTORY_CHARACTERS = 12000

// Keep completed exchanges only. Errors and pending replies are not evidence.
export function conversationHistory(messages: (AssistantTurn & { error?: boolean })[]): AssistantTurn[] {
  const turns: AssistantTurn[] = []
  let user: AssistantTurn | undefined
  for (const message of messages) {
    if (message.role === 'user') user = { role: 'user', content: message.content.slice(0, MAX_QUESTION_LENGTH) }
    else {
      if (user && !message.error) turns.push(user, { role: 'assistant', content: message.content.slice(0, MAX_ANSWER_LENGTH) })
      user = undefined
    }
  }
  const recent = turns.slice(-MAX_HISTORY_MESSAGES)
  while (recent.reduce((sum, turn) => sum + turn.content.length, 0) > MAX_HISTORY_CHARACTERS) recent.splice(0, 2)
  return recent
}

export function parseConversationHistory(value: unknown): AssistantTurn[] | null {
  if (value === undefined) return []
  if (!Array.isArray(value) || value.length > MAX_HISTORY_MESSAGES || value.length % 2 !== 0) return null
  const turns: AssistantTurn[] = []
  let size = 0
  for (const [index, turn] of value.entries()) {
    const role = index % 2 === 0 ? 'user' : 'assistant'
    if (!turn || typeof turn !== 'object' || turn.role !== role || typeof turn.content !== 'string' || !turn.content.trim()) return null
    if (turn.content.length > (role === 'user' ? MAX_QUESTION_LENGTH : MAX_ANSWER_LENGTH)) return null
    size += turn.content.length
    if (size > MAX_HISTORY_CHARACTERS) return null
    turns.push({ role, content: turn.content.trim() })
  }
  return turns
}

export function isAssistantLink(value: unknown): value is AssistantLink {
  if (!value || typeof value !== 'object' || !('label' in value) || !('url' in value)) return false
  if (typeof value.label !== 'string' || typeof value.url !== 'string') return false
  if (value.url.startsWith('/') && !value.url.startsWith('//') && !value.url.includes('\\')) return true
  try { return new URL(value.url).protocol === 'https:' } catch { return false }
}
