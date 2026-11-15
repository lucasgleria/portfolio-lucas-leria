'use client'

import { CLI } from '@/cli/components/CLI'
import { PortfolioShell } from './PortfolioShell'
import type { Language } from './content'

type TerminalPortfolioProps = {
  language: Language
  onLanguageChange: (language: Language) => void
  onBack: () => void
  onOpenVisual: () => void
}

export function TerminalPortfolio({
  language,
  onLanguageChange,
  onBack,
  onOpenVisual,
}: TerminalPortfolioProps) {
  const portuguese = language === 'pt-BR'
  return (
    <PortfolioShell
      language={language}
      onLanguageChange={onLanguageChange}
      mode="terminal"
      onSwitchMode={onOpenVisual}
      onBack={onBack}
      topId="terminal-top"
      mainId="terminal-content"
    >
      <section aria-labelledby="terminal-title" className="py-10 sm:py-12">
        <div className="mb-7">
          <p className="mb-3 font-mono text-[10px] tracking-[0.18em] text-emerald-300">
            PORTFOLIO / TERMINAL
          </p>
          <h1 id="terminal-title" className="text-3xl font-medium tracking-tight sm:text-4xl">
            {portuguese
              ? 'O mesmo portfólio. Pela linha de comando.'
              : 'The same portfolio. From the command line.'}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400">
            {portuguese
              ? 'Digite um comando ou use os atalhos abaixo. Os nomes dos comandos permanecem em inglês.'
              : 'Type a command or use the shortcuts below to explore projects, skills and more.'}
          </p>
        </div>
        <div className="h-[75dvh] min-h-[38rem] max-h-[56rem]">
          <CLI language={language} />
        </div>
      </section>
    </PortfolioShell>
  )
}
