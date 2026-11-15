'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Monitor, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { portfolioData } from '@/cli/data/portfolio'
import { professionalProfile } from '@/cli/data/professional-profile'
import { PortfolioShell } from '@/components/portfolio/PortfolioShell'
const VisualPortfolio = dynamic(() => import('./VisualPortfolio').then(module => module.VisualPortfolio), { loading: () => <p role="status" className="bg-portfolio-background p-8 text-emerald-300">Loading portfolio / Carregando portfólio…</p> })
const TerminalPortfolio = dynamic(() => import('./TerminalPortfolio').then(module => module.TerminalPortfolio), { loading: () => <p role="status" className="bg-portfolio-background p-8 text-emerald-300">Loading terminal / Carregando terminal…</p> })
import type { Language } from '@/components/portfolio/content'

const interfaceOptionClassName =
  'flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-portfolio-surface p-6 text-left text-gray-400 transition-colors hover:border-emerald-300/40 hover:bg-emerald-300/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300'
const languageOptionClassName =
  'border border-white/15 bg-transparent text-gray-400 hover:bg-white/5 hover:text-white aria-pressed:border-emerald-300 aria-pressed:bg-emerald-300 aria-pressed:text-[#0b1710] aria-pressed:hover:bg-emerald-200'

const translations = {
  en: {
    languageTitle: 'Choose your language',
    subtitle: portfolioData.title,
    email: 'Email',
    interfaceTitle: 'Choose your interface',
    visualTitle: 'Visual interface',
    terminalDescription: 'Explore the portfolio with commands, history and shortcuts.',
    visualDescription: 'Explore projects, skills and articles with a visual interface.',
  },
  'pt-BR': {
    languageTitle: 'Escolha seu idioma',
    subtitle: professionalProfile.title['pt-BR'],
    email: 'E-mail',
    interfaceTitle: 'Escolha sua interface',
    visualTitle: 'Interface visual',
    terminalDescription: 'Explore o portfólio com comandos, histórico e atalhos.',
    visualDescription: 'Explore projetos, habilidades e artigos em uma interface visual.',
  },
} as const

export default function PortfolioApp({ initialMode = null, initialLanguage }: { initialMode?: 'terminal' | 'visual' | null; initialLanguage?: Language }) {
  const router = useRouter()
  const [language, setLanguage] = useState<Language>(initialLanguage ?? 'en')
  const interfaceMode = initialMode
  const setInterfaceMode = (mode: 'terminal' | 'visual' | null) => router.push((mode ? '/' + mode : '/') + '?lang=' + language)
  const languageTitleRef = useRef<HTMLHeadingElement>(null)
  const text = translations[language]

  useEffect(() => {
    if (initialLanguage) { setLanguage(initialLanguage); return }
    try {
      const savedLanguage = window.localStorage.getItem('portfolio-language')
      if (savedLanguage === 'en' || savedLanguage === 'pt-BR') setLanguage(savedLanguage)
    } catch {
      // Language selection still works when browser storage is unavailable.
    }
  }, [initialLanguage])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    if (interfaceMode === null) languageTitleRef.current?.focus()
  }, [interfaceMode])

  const handleLanguageChange = (nextLanguage: Language) => {
    setLanguage(nextLanguage)
    const url = new URL(window.location.href)
    url.searchParams.set('lang', nextLanguage)
    window.history.replaceState(null, '', url)
    try {
      window.localStorage.setItem('portfolio-language', nextLanguage)
    } catch {
      // Keep the selected language for this visit if it cannot be saved.
    }
  }

  if (interfaceMode === 'visual') {
    return (
      <VisualPortfolio
        language={language}
        onLanguageChange={handleLanguageChange}
        onBack={() => setInterfaceMode(null)}
        onOpenTerminal={() => setInterfaceMode('terminal')}
      />
    )
  }

  if (interfaceMode === 'terminal') {
    return (
      <TerminalPortfolio
        language={language}
        onLanguageChange={handleLanguageChange}
        onBack={() => setInterfaceMode(null)}
        onOpenVisual={() => setInterfaceMode('visual')}
      />
    )
  }

  return (
    <PortfolioShell
      language={language}
      onLanguageChange={handleLanguageChange}
      topId="portfolio-top"
      mainId="chooser-content"
    >
      <div className="mx-auto max-w-3xl py-12 sm:py-16">
        <header className="mb-10">
          <p className="mb-4 font-mono text-[10px] tracking-[0.18em] text-emerald-300">
            LUCAS GOMES LERIA / PORTFOLIO
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Lucas Leria
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-gray-400">{text.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-emerald-200">
            <a
              href={portfolioData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded hover:text-white focus-visible:outline-2 focus-visible:outline-emerald-300"
            >
              GitHub
            </a>
            <a
              href={portfolioData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded hover:text-white focus-visible:outline-2 focus-visible:outline-emerald-300"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${portfolioData.contact.email}`}
              className="rounded hover:text-white focus-visible:outline-2 focus-visible:outline-emerald-300"
            >
              {text.email}
            </a>
          </div>
        </header>
        <section aria-labelledby="language-title" className="mb-10 border-t border-white/10 pt-8">
          <h2
            id="language-title"
            ref={languageTitleRef}
            tabIndex={-1}
            className="mb-4 text-lg font-medium text-gray-100 outline-none"
          >
            {text.languageTitle}
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="ghost"
              lang="en"
              aria-pressed={language === 'en'}
              className={languageOptionClassName}
              onClick={() => handleLanguageChange('en')}
            >
              English
            </Button>
            <Button
              type="button"
              variant="ghost"
              lang="pt-BR"
              aria-pressed={language === 'pt-BR'}
              className={languageOptionClassName}
              onClick={() => handleLanguageChange('pt-BR')}
            >
              Português (Brasil)
            </Button>
          </div>
        </section>
        <section aria-labelledby="interface-title">
          <h2 id="interface-title" className="mb-5 text-2xl font-medium tracking-tight text-white">
            {text.interfaceTitle}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <button
              type="button"
              className={interfaceOptionClassName}
              onClick={() => setInterfaceMode('terminal')}
              aria-labelledby="terminal-title"
              aria-describedby="terminal-description"
            >
              <Terminal aria-hidden="true" className="size-8 stroke-1 text-emerald-300" />
              <span id="terminal-title" className="text-xl font-semibold text-gray-100">
                Terminal
              </span>
              <span id="terminal-description" className="text-sm leading-7">
                {text.terminalDescription}
              </span>
            </button>
            <button
              type="button"
              className={interfaceOptionClassName}
              onClick={() => setInterfaceMode('visual')}
              aria-labelledby="visual-title"
              aria-describedby="visual-description"
            >
              <Monitor aria-hidden="true" className="size-8 stroke-1 text-emerald-300" />
              <span id="visual-title" className="text-xl font-semibold text-gray-100">
                {text.visualTitle}
              </span>
              <span id="visual-description" className="text-sm leading-7">
                {text.visualDescription}
              </span>
            </button>
          </div>
        </section>
      </div>
    </PortfolioShell>
  )
}
