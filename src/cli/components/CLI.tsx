'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Terminal, Command, HelpCircle, MessageSquare, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Language } from '@/components/portfolio/content'
import { terminalCopy, quickQuestions } from '../data/terminal-copy'
import type { CommandHistory } from '../commands/types'
import { createCommandHandlers } from '../commands/handlers'
import { productionProjects } from '../data/productionProjects'
import { articles } from '../data/articles'
import { professionalProfile } from '../data/professional-profile'
import { askAssistant, assistantSourceLabel } from '@/lib/assistant-client'
import { navigateHistory, rememberCommand } from '@/lib/terminal-history'

const ProductionProjectsModal = dynamic(() => import('./ProductionProjectsModal').then(module => module.ProductionProjectsModal))
const ArticlesModal = dynamic(() => import('./ArticlesModal').then(module => module.ArticlesModal))
const ResumeModal = dynamic(() => import('./ResumeModal').then(module => module.ResumeModal))
const LerChatModal = dynamic(() => import('./LerChatModal').then(module => module.LerChatModal))

interface CLIProps { language?: Language; onLerMessage?: (message: string) => void }
const welcome = (language: Language): CommandHistory => ({
  id: 'welcome', command: '', type: 'success',
  output: language === 'pt-BR'
    ? 'Bem-vindo ao portfólio profissional de Lucas Leria!\n' + professionalProfile.title[language] + '\n' + productionProjects.length + ' projetos e cases selecionados. Digite "help" para explorar.'
    : 'Welcome to Lucas Leria’s professional portfolio!\n' + professionalProfile.title[language] + '\n' + productionProjects.length + ' selected projects and technical cases. Type "help" to explore.',
})

export const CLI: React.FC<CLIProps> = ({ onLerMessage, language = 'en' }) => {
  const text = terminalCopy[language]
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<CommandHistory[]>(() => [welcome(language)])
  const [showLer, setShowLer] = useState(true)
  const [lerMessage, setLerMessage] = useState(professionalProfile.intro[language])
  const [isLerThinking, setIsLerThinking] = useState(false)
  const [showProductionModal, setShowProductionModal] = useState(false)
  const [showArticlesModal, setShowArticlesModal] = useState(false)
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [showLerChatModal, setShowLerChatModal] = useState(false)
  const [chatLoaded, setChatLoaded] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [tempInput, setTempInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(0)
  const requests = useRef(new Map<string, AbortController>())
  const mounted = useRef(true)
  const commands = useMemo(() => createCommandHandlers({ language, setHistory, setShowProductionModal, setShowArticlesModal, setShowResumeModal, setShowLerChatModal }), [language])

  useEffect(() => {
    mounted.current = true
    const pending = requests.current
    return () => { mounted.current = false; pending.forEach(controller => controller.abort()); pending.clear() }
  }, [])
  useEffect(() => {
    setHistory(previous => previous.map(item => item.id === 'welcome' ? welcome(language) : item))
    setLerMessage(professionalProfile.intro[language])
  }, [language])
  useEffect(() => { terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }) }, [history])
  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => { if (showLerChatModal) setChatLoaded(true) }, [showLerChatModal])

  const executeCommand = async (cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) return
    setCommandHistory(previous => rememberCommand(previous, trimmed))
    setHistoryIndex(-1)
    setTempInput('')
    setInput('')
    const [command, ...args] = trimmed.split(/\s+/)
    if (command === 'clear') { setHistory([]); return }
    const id = String(++nextId.current)
    if (command === 'ler' && args.length) {
      const controller = new AbortController()
      requests.current.set(id, controller)
      setIsLerThinking(true)
      setHistory(previous => [...previous, { id, command: trimmed, output: text.thinking, type: 'success' }])
      onLerMessage?.(args.join(' '))
      try {
        const result = await askAssistant(args.join(' '), language, controller.signal)
        if (mounted.current) setHistory(previous => previous.map(item => item.id === id ? { ...item, output: result.response, source: result.source } : item))
      } catch (error) {
        if (mounted.current && !controller.signal.aborted) setHistory(previous => previous.map(item => item.id === id ? { ...item, output: error instanceof Error ? error.message : text.ready, type: 'error' } : item))
      } finally {
        requests.current.delete(id)
        if (mounted.current) setIsLerThinking(requests.current.size > 0)
      }
      return
    }
    try {
      const handler = commands[command as keyof typeof commands]
      const output = command === 'ler'
        ? (language === 'pt-BR' ? 'Use ler seguido da sua pergunta.' : 'Use ler followed by your question.')
        : handler ? (handler as () => string | void)() : (language === 'pt-BR' ? 'Comando não encontrado. Digite help.' : 'Command not found. Type help.')
      if (typeof output === 'string' && output) setHistory(previous => [...previous, { id, command: trimmed, output, type: 'success' }])
    } catch {
      setHistory(previous => [...previous, { id, command: trimmed, output: language === 'pt-BR' ? 'Não foi possível executar este comando.' : 'Unable to execute this command.', type: 'error' }])
    }
  }
  const handleSubmit = (event: React.FormEvent) => { event.preventDefault(); void executeCommand(input) }
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return
    event.preventDefault()
    const next = navigateHistory(commandHistory, input, historyIndex, tempInput, event.key === 'ArrowUp' ? 'up' : 'down')
    setInput(next.input); setHistoryIndex(next.index); setTempInput(next.draft)
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1510]">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-portfolio-surface px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-300/10">
            <Terminal aria-hidden="true" className="size-4 text-emerald-300" />
          </span>
          <span className="font-mono text-xs text-gray-300">
            portfolio<span className="mx-2 text-gray-600">/</span>terminal
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowLer(!showLer)}
            aria-label={showLer ? text.hideAssistant : text.showAssistant}
            title={showLer ? text.hideAssistant : text.showAssistant}
            aria-expanded={showLer}
            aria-controls="ler-assistant"
            className="size-8 text-gray-400 hover:bg-white/5 hover:text-emerald-200"
          >
            <MessageSquare aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setHistory([])}
            aria-label={text.clear}
            title={text.clear}
            className="size-8 text-gray-400 hover:bg-white/5 hover:text-emerald-200"
          >
            <Command aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => executeCommand('help')}
            aria-label={text.help}
            title={text.help}
            className="size-8 text-gray-400 hover:bg-white/5 hover:text-emerald-200"
          >
            <HelpCircle aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div
        role="group"
        aria-label={text.shortcuts}
        className="flex shrink-0 flex-wrap gap-2 border-b border-white/10 px-4 py-3 sm:px-5"
      >
        {['help', 'projects', 'skills', 'contact', 'resume'].map((command) => (
          <button
            key={command}
            type="button"
            onClick={() => executeCommand(command)}
            aria-label={`${text.run}: ${command}`}
            className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] text-gray-400 transition-colors hover:border-emerald-300/30 hover:text-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            {command}
          </button>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div
            ref={terminalRef}
            className="terminal-container flex-1 space-y-5 overflow-y-auto overflow-x-hidden p-4 font-mono text-xs leading-7 sm:p-6 sm:text-sm"
          >
            <div
              role="log"
              aria-label={text.output}
              aria-live="polite"
              aria-relevant="additions text"
              lang={language}
              className="space-y-5"
            >
              {history.map((item, index) => (
                <div key={index} className="max-w-full space-y-2">
                  {item.command && (
                    <div className="flex min-w-0 items-start gap-3">
                      <span aria-hidden="true" className="shrink-0 text-emerald-300">
                        $
                      </span>
                      <span className="terminal-text min-w-0 flex-1 text-emerald-200">
                        {item.command}
                      </span>
                    </div>
                  )}
                  {item.output && (
                    <div
                      className={`terminal-output max-w-full ${item.type === 'error' ? 'text-rose-300' : 'text-gray-300'}`}
                    >
                      {item.output}
                      {item.source && <p className="mt-2 text-xs text-emerald-300">{assistantSourceLabel(item.source, language)}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-5 flex w-full min-w-0 items-start gap-3 rounded-lg border border-white/10 bg-white/[0.025] p-3 transition-colors focus-within:border-emerald-300/40"
            >
              <span aria-hidden="true" className="shrink-0 text-emerald-300">
                $
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => { setInput(event.target.value); setHistoryIndex(-1); setTempInput('') }}
                onKeyDown={handleKeyDown}
                aria-label={text.input}
                aria-describedby="terminal-input-hint"
                maxLength={2004}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                className="terminal-input min-w-0 flex-1 bg-transparent text-emerald-100 caret-emerald-300 outline-none placeholder:text-gray-600"
                placeholder={text.placeholder}
                autoFocus
              />
            </form>
          </div>
          <div className="shrink-0 border-t border-white/10 bg-portfolio-surface px-4 py-3 sm:px-5">
            <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] text-gray-500">
              <span id="terminal-input-hint">{text.hint}</span>
              <span className="hidden sm:inline">{text.history}</span>
              <span className="hidden items-center gap-2 lg:flex">
                <User aria-hidden="true" className="size-3" />
                portfolio-visitor
              </span>
            </div>
          </div>
        </div>

        {showLer && (
          <aside
            id="ler-assistant"
            aria-labelledby="ler-assistant-title"
            className="flex h-56 w-full shrink-0 flex-col border-t border-white/10 bg-portfolio-surface p-4 lg:h-auto lg:w-80 lg:border-t-0 lg:border-l lg:p-5"
          >
            <div className="mb-4 flex shrink-0 items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <MessageSquare aria-hidden="true" className="size-4 text-emerald-300" />
                <h2 id="ler-assistant-title" className="text-sm font-medium text-gray-100">
                  {text.assistant}
                </h2>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowLer(false)}
                aria-label={text.closeAssistant}
                className="size-7 text-gray-500 hover:bg-white/5 hover:text-white"
              >
                <X aria-hidden="true" />
              </Button>
            </div>
            <div className="terminal-scrollbar min-h-0 min-w-0 flex-1 overflow-y-auto">
              <div className="mb-5 rounded-xl border border-white/10 bg-[#0d1510] p-4">
                <p lang="en" className="terminal-text text-xs leading-7 text-gray-400">
                  {lerMessage}
                </p>
                {isLerThinking && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-emerald-200">
                    <span className="size-1.5 rounded-full bg-emerald-300 motion-safe:animate-pulse" />
                    {text.thinking}
                  </div>
                )}
              </div>
              <h3 className="mb-3 font-mono text-[10px] uppercase tracking-wider text-gray-500">
                {text.questions}
              </h3>
              <div className="space-y-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question.key}
                    type="button"
                    onClick={() => executeCommand(question.command)}
                    disabled={isLerThinking}
                    className="block w-full rounded-lg border border-white/10 p-3 text-left text-xs leading-6 text-gray-400 transition-colors hover:border-emerald-300/30 hover:bg-white/5 hover:text-gray-100 focus-visible:outline-2 focus-visible:outline-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {text[question.key]}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 flex shrink-0 items-center justify-between border-t border-white/10 pt-4 font-mono text-[10px] text-gray-500">
              <span>Ler</span>
              <span className="flex items-center gap-2">
                <span
                  className={`size-1.5 rounded-full ${isLerThinking ? 'bg-amber-300 motion-safe:animate-pulse' : 'bg-emerald-300'}`}
                />
                {isLerThinking ? text.thinking : text.ready}
              </span>
            </div>
          </aside>
        )}
      </div>

      {showProductionModal && <ProductionProjectsModal
        showProductionModal={showProductionModal}
        setShowProductionModal={setShowProductionModal}
        productionProjects={productionProjects}
        language={language}
      />}
      {showArticlesModal && <ArticlesModal
        showArticlesModal={showArticlesModal}
        setShowArticlesModal={setShowArticlesModal}
        articles={articles}
        language={language}
      />}
      {showResumeModal && <ResumeModal showResumeModal={showResumeModal} setShowResumeModal={setShowResumeModal} language={language} />}
      {(showLerChatModal || chatLoaded) && <LerChatModal isOpen={showLerChatModal} onClose={() => setShowLerChatModal(false)} language={language} />}
    </div>
  )
}
