'use client'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import type { Language } from '@/components/portfolio/content'
import { askAssistant, assistantSourceLabel, type AssistantSource } from '@/lib/assistant-client'
import { PortfolioDialog } from './PortfolioDialog'

type Message = { id: number; role: 'user' | 'assistant'; content: string; source?: AssistantSource }
export function LerChatModal({ isOpen, onClose, language = 'en' }: { isOpen: boolean; onClose: () => void; language?: Language }) {
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
  const send = async (event: FormEvent) => {
    event.preventDefault()
    const message = input.trim()
    if (!message || loading) return
    const controller = new AbortController()
    pending.current = controller
    setMessages(previous => [...previous, { id: ++nextId.current, role: 'user', content: message }])
    setInput(''); setLoading(true)
    try {
      const response = await askAssistant(message, language, controller.signal)
      if (!controller.signal.aborted) setMessages(previous => [...previous, { id: ++nextId.current, role: 'assistant', content: response.response, source: response.source }])
    } catch (error) {
      if (!controller.signal.aborted) setMessages(previous => [...previous, { id: ++nextId.current, role: 'assistant', content: error instanceof Error ? error.message : (pt ? 'Não foi possível responder.' : 'Unable to respond.') }])
    } finally { if (!controller.signal.aborted) setLoading(false) }
  }
  return <PortfolioDialog open={isOpen} onClose={onClose} language={language} title={pt ? 'Converse com Ler' : 'Chat with Ler'} description={pt ? 'Pergunte sobre projetos, tecnologias e trajetória profissional.' : 'Ask about projects, technologies and professional background.'}>
    <div role="log" aria-label={pt ? 'Conversa' : 'Conversation'} aria-live="polite" className="max-h-[45dvh] space-y-4 overflow-y-auto">
      {!messages.length && <p className="text-sm leading-7 text-gray-300">{pt ? 'Posso apresentar os trabalhos documentados, a formação e os estudos atuais do Lucas.' : 'I can describe Lucas’s documented work, education and current studies.'}</p>}
      {messages.map(message => <div key={message.id} className="rounded-xl border border-white/10 p-4">
        <p className="mb-2 text-xs text-emerald-300">{message.role === 'user' ? (pt ? 'Você' : 'You') : 'Ler'}</p>
        <p className="whitespace-pre-wrap text-sm leading-7 text-gray-300">{message.content}</p>
        {message.source && <p className="mt-2 text-xs text-emerald-300">{assistantSourceLabel(message.source, language)}</p>}
      </div>)}
      <div ref={end} />
    </div>
    <p role="status" className="my-3 text-xs text-gray-400">{loading ? (pt ? 'Consultando…' : 'Looking up…') : ''}</p>
    <form onSubmit={send} className="flex flex-wrap gap-3 border-t border-white/10 pt-4">
      <label className="sr-only" htmlFor="ler-message">{pt ? 'Sua pergunta' : 'Your question'}</label>
      <input id="ler-message" value={input} onChange={event => setInput(event.target.value)} maxLength={2000} disabled={loading} className="min-h-11 min-w-0 flex-1 rounded-lg border border-white/20 bg-transparent px-3 text-sm outline-emerald-300" placeholder={pt ? 'Pergunte sobre o portfólio…' : 'Ask about the portfolio…'} />
      <button type="submit" disabled={loading || !input.trim()} className="min-h-11 rounded-lg bg-emerald-300 px-5 text-sm text-[#0b1710] disabled:opacity-40">{pt ? 'Enviar' : 'Send'}</button>
    </form>
  </PortfolioDialog>
}
