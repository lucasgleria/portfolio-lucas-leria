'use client'

import type { ReactNode } from 'react'
import { ArrowLeft, ArrowUp, Monitor, Terminal } from 'lucide-react'
import { portfolioData } from '@/cli/data/portfolio'
import { Button } from '@/components/ui/button'
import { visualCopy, type Language } from './content'

type PortfolioShellProps = {
  language: Language
  onLanguageChange: (language: Language) => void
  mode?: 'visual' | 'terminal'
  onSwitchMode?: () => void
  onBack?: () => void
  topId: string
  mainId: string
  navigation?: string[][]
  children: ReactNode
}

export function PortfolioShell({
  language,
  onLanguageChange,
  mode,
  onSwitchMode,
  onBack,
  topId,
  mainId,
  navigation,
  children,
}: PortfolioShellProps) {
  const text = visualCopy[language]
  const switchLabel =
    mode === 'visual' ? text.terminal : language === 'en' ? 'Visual interface' : 'Interface visual'
  const SwitchIcon = mode === 'visual' ? Terminal : Monitor

  return (
    <div
      id={topId}
      lang={language}
      className="flex min-h-screen flex-col bg-portfolio-background font-sans text-gray-100 selection:bg-emerald-300 selection:text-[#080e0b]"
    >
      <a
        href={`#${mainId}`}
        className="sr-only fixed top-2 left-2 z-50 rounded bg-emerald-300 p-3 text-black focus:not-sr-only"
      >
        {text.skip}
      </a>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-portfolio-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-4 px-5 py-4 sm:px-8">
          <a
            href={`#${topId}`}
            className="flex items-center gap-3 rounded focus-visible:outline-2 focus-visible:outline-emerald-300"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-300 font-mono text-sm font-bold text-[#0b1710]">
              LL.
            </span>
            <span className="text-sm font-semibold tracking-tight">Lucas Leria</span>
          </a>
          {navigation && (
            <nav
              aria-label={text.navigation}
              className="order-last flex w-full flex-wrap gap-x-5 gap-y-2 text-xs lg:order-none lg:w-auto"
            >
              {navigation.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="rounded text-gray-400 transition-colors hover:text-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
                >
                  {label}
                </a>
              ))}
            </nav>
          )}
          <div className="flex items-center gap-3">
            <div
              role="group"
              aria-label={text.language}
              className="flex rounded-md border border-white/15 p-1 font-mono text-[10px]"
            >
              {(['en', 'pt-BR'] as const).map((locale) => (
                <button
                  key={locale}
                  type="button"
                  lang={locale}
                  aria-label={locale === 'en' ? 'English' : 'Português (Brasil)'}
                  aria-pressed={language === locale}
                  onClick={() => onLanguageChange(locale)}
                  className="rounded px-2 py-1.5 text-gray-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-emerald-300 aria-pressed:bg-emerald-300 aria-pressed:text-[#0b1710]"
                >
                  {locale === 'en' ? 'EN' : 'PT-BR'}
                </button>
              ))}
            </div>
            {onSwitchMode && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onSwitchMode}
                aria-label={switchLabel}
                title={switchLabel}
                className="text-gray-400 hover:bg-white/5 hover:text-emerald-200"
              >
                <SwitchIcon aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>
      </header>
      <main id={mainId} className="mx-auto w-full max-w-6xl flex-1 px-5 sm:px-8">
        {onBack && (
          <div className="pt-6">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 rounded font-mono text-[11px] text-gray-400 transition-colors hover:text-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
            >
              <ArrowLeft aria-hidden="true" className="size-3" />
              {text.interfaces}
            </button>
          </div>
        )}
        {children}
      </main>
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-7 font-mono text-[10px] leading-6 text-gray-500 sm:px-8">
          <p>
            © {new Date().getFullYear()} {portfolioData.name}
            <span className="block sm:inline"> · {text.footer}</span>
          </p>
          <a
            href={`#${topId}`}
            className="flex items-center gap-2 rounded text-gray-400 transition-colors hover:text-emerald-200 focus-visible:outline-2 focus-visible:outline-emerald-300"
          >
            {text.backToTop}
            <ArrowUp aria-hidden="true" className="size-3" />
          </a>
        </div>
      </footer>
    </div>
  )
}
