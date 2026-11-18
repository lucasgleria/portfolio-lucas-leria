'use client'
import { useEffect, useRef, useState, type FormEvent, type RefObject } from 'react'
import type { Language } from '@/components/portfolio/content'
import { AssistantAnswer } from '@/components/portfolio/AssistantAnswer'
import { askAssistant, assistantSourceLabel } from '@/lib/assistant-client'
import { conversationHistory, type AssistantLink, type AssistantSource, type AssistantTurn } from '@/lib/assistant-conversation'
import { PortfolioDialog } from './PortfolioDialog'

type Message = AssistantTurn & { id: number; source?: AssistantSource; links?: AssistantLink[]; suggestions?: string[]; error?: boolean }
export function LerChatModal({ isOpen, onClose, language = 'en', returnFocusRef }: { isOpen: boolean; onClose: () => void; language?: Language; returnFocusRef?: RefObject<HTMLElement | null> }) {
  const pt = language === 'pt-BR'
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const pending = useRef<AbortController | null>(null)
  const nextId = useRef(0)
  const end = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!isOpen) { pending.current?.abort(); setLoading(false) }
    return () => { pending.current?.abort() }
  }, [isOpen])
  useEffect(() => { end.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }) }, [messages])
  const send = async (question: string) => {
    const message = question.trim()
    if (!message || loading) return
    const history = conversationHistory(messages)
    const controller = new AbortController()
    pending.current = controller
    setMessages(previous => [...previous, { id: ++nextId.current, role: 'user', content: message }])
    setInput(''); setLoading(true)
    try {
      const reply = await askAssistant(message, language, controller.signal, history)
      if (!controller.signal.aborted && pending.current === controller) setMessages(previous => [...previous, { id: ++nextId.current, role: 'assistant', content: reply.response, source: reply.source, links: reply.links, suggestions: reply.suggestions }])
    } catch (error) {
      if (!controller.signal.aborted && pending.current === controller) setMessages(previous => [...previous, { id: ++nextId.current, role: 'assistant', error: true, content: error instanceof Error ? error.message : (pt ? 'Não foi possível responder.' : 'Unable to respond.') }])
    } finally { if (pending.current === controller) { pending.current = null; setLoading(false) } }
  }
  const submit = (event: FormEvent) => { event.preventDefault(); void send(input) }
  const reset = () => { pending.current?.abort(); pending.current = null; setMessages([]); setInput(''); setLoading(false) }
  const suggestions = messages.length ? messages.at(-1)?.suggestions ?? [] : pt ? ['Quais são os projetos de IA?', 'Como funciona o Rendller?', 'Qual é a formação do Lucas?'] : ['Which projects use AI?', 'How does Rendller work?', 'What is Lucas’s education?']
  return <PortfolioDialog open={isOpen} onClose={onClose} language={language} returnFocusRef={returnFocusRef} title={pt ? 'Converse com Ler' : 'Chat with Ler'} description={pt ? 'Conheça os projetos, tecnologias e a trajetória profissional do Lucas.' : 'Explore Lucas’s projects, technologies and professional background.'}>
    <div className="mb-4 flex justify-end"><button type="button" onClick={reset} disabled={!messages.length && !input} className="min-h-11 rounded px-3 text-xs text-emerald-200 hover:bg-white/5 disabled:opacity-40">{pt ? 'Nova conversa' : 'New conversation'}</button></div>
    <div role="log" aria-label={pt ? 'Conversa' : 'Conversation'} aria-live="polite" className="max-h-[45dvh] space-y-4 overflow-y-auto">
      {!messages.length && <p className="text-sm leading-7 text-gray-300">{pt ? 'Olá! Posso explicar como os projetos funcionam, mostrar suas tecnologias e indicar os links públicos. Sobre o que você quer conversar?' : 'Hi! I can explain how projects work, show their technologies and share public links. What would you like to explore?'}</p>}
      {messages.map(message => <div key={message.id} className="rounded-xl border border-white/10 p-4">
        <p className="mb-2 text-xs text-emerald-300">{message.role === 'user' ? (pt ? 'Você' : 'You') : 'Ler'}</p>
        <AssistantAnswer response={message.content} links={message.links} />
        {message.source && <p className="mt-2 text-xs text-emerald-300">{assistantSourceLabel(message.source, language)}</p>}
      </div>)}
      <div ref={end} />
    </div>
    {!loading && suggestions.length > 0 && <div className="mt-4 flex flex-wrap gap-2" aria-label={pt ? 'Sugestões de perguntas' : 'Suggested questions'}>{suggestions.map(question => <button key={question} type="button" onClick={() => void send(question)} className="min-h-11 rounded-lg border border-white/15 px-3 py-2 text-left text-xs text-emerald-200 hover:bg-white/5">{question}</button>)}</div>}
    <p role="status" className="my-3 text-xs text-gray-400">{loading ? (pt ? 'Consultando…' : 'Looking up…') : ''}</p>
    <form onSubmit={submit} className="flex flex-wrap gap-3 border-t border-white/10 pt-4">
      <label className="sr-only" htmlFor="ler-message">{pt ? 'Sua pergunta' : 'Your question'}</label>
      <input id="ler-message" value={input} onChange={event => setInput(event.target.value)} maxLength={2000} disabled={loading} className="min-h-11 min-w-0 flex-1 rounded-lg border border-white/20 bg-transparent px-3 text-sm outline-emerald-300" placeholder={pt ? 'Pergunte sobre o portfólio…' : 'Ask about the portfolio…'} />
      <button type="submit" disabled={loading || !input.trim()} className="min-h-11 rounded-lg bg-emerald-300 px-5 text-sm text-[#0b1710] disabled:opacity-40">{pt ? 'Enviar' : 'Send'}</button>
    </form>
  </PortfolioDialog>
}
