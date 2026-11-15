'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Code2,
  Github,
  Linkedin,
  Mail,
  Search,
} from 'lucide-react'
import { portfolioData } from '@/cli/data/portfolio'
import { productionProjects } from '@/cli/data/productionProjects'
import { articles } from '@/cli/data/articles'
import { skillCategories } from '@/cli/data/skills'
import { professionalProfile } from '@/cli/data/professional-profile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProjectCard } from './ProjectCard'
import { PortfolioShell } from './PortfolioShell'
import {
  getArticleContent,
  getProjectCategory,
  getProjectContent,
  visualCopy,
  type Language,
  type ProjectCategory,
} from './content'

type Filter = ProjectCategory | 'all'
type VisualPortfolioProps = {
  language: Language
  onLanguageChange: (language: Language) => void
  onBack: () => void
  onOpenTerminal: () => void
}

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
const linkClassName =
  'rounded text-gray-400 transition-colors hover:text-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300'
const actionClassName = 'bg-emerald-300 text-[#0b1710] hover:bg-emerald-200'

export function VisualPortfolio({
  language,
  onLanguageChange,
  onBack,
  onOpenTerminal,
}: VisualPortfolioProps) {
  const [category, setCategory] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const headingRef = useRef<HTMLHeadingElement>(null)
  const text = visualCopy[language]
  const navigation = [
    ['about', text.about],
    ['projects', text.projects],
    ['stack', text.stack],
    ['articles', text.articles],
    ['contact', text.contact],
  ]
  const search = normalize(query.trim())
  const filteredProjects = productionProjects.filter((project) => {
    const content = getProjectContent(project, language)
    const projectCategory = getProjectCategory(project)
    return (
      (category === 'all' || projectCategory === category) &&
      normalize(
        [
          project.name,
          content.description,
          text.categories[projectCategory],
          ...project.technologies,
        ].join(' '),
      ).includes(search)
    )
  })

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <PortfolioShell
      language={language}
      onLanguageChange={onLanguageChange}
      mode="visual"
      onSwitchMode={onOpenTerminal}
      onBack={onBack}
      topId="visual-top"
      mainId="visual-content"
      navigation={navigation}
    >
      <section
        aria-labelledby="visual-title"
        className="grid items-center gap-12 border-b border-white/10 py-14 md:py-20 lg:grid-cols-[1.4fr_0.8fr] lg:gap-16"
      >
        <div>
          <p className="mb-6 font-mono text-[10px] leading-6 tracking-[0.18em] text-emerald-300">
            {text.eyebrow}
          </p>
          <h1
            id="visual-title"
            ref={headingRef}
            tabIndex={-1}
            className="max-w-3xl text-4xl leading-[1.1] font-semibold tracking-[-0.045em] outline-none sm:text-5xl lg:text-6xl"
          >
            {text.headline}
            <span className="mt-2 block text-emerald-300">{text.headlineAccent}</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-gray-400">{text.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className={actionClassName}>
              <a href="#projects">
                {text.explore}
                <ArrowDown aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-gray-300 hover:bg-white/5 hover:text-white"
            >
              <a href={portfolioData.resume} target="_blank" rel="noopener noreferrer">
                {text.resume}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
        <aside
          aria-label={text.focus}
          className="relative overflow-hidden rounded-2xl border border-emerald-300/20 bg-emerald-300/5 p-7 sm:p-9"
        >
          <Code2 aria-hidden="true" className="mb-7 size-9 stroke-1 text-emerald-300" />
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300/70">
            {portfolioData.name}
          </p>
          <p className="mt-3 text-2xl leading-9 font-medium tracking-tight">{text.focusText}</p>
          <div className="mt-10 grid grid-cols-2 gap-5 border-t border-emerald-300/15 pt-6">
            <div>
              <p className="text-4xl font-light tracking-tight text-emerald-200">
                {String(productionProjects.length).padStart(2, '0')}
              </p>
              <p className="mt-2 text-xs leading-5 text-gray-400">{text.projectCount}</p>
            </div>
            <div>
              <p className="text-4xl font-light tracking-tight text-emerald-200">
                {String(articles.length).padStart(2, '0')}
              </p>
              <p className="mt-2 text-xs leading-5 text-gray-400">{text.articleCount}</p>
            </div>
          </div>
        </aside>
      </section>

      <section
        id="about"
        aria-labelledby="about-title"
        className="scroll-mt-36 grid gap-8 border-b border-white/10 py-16 lg:scroll-mt-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
      >
        <div>
          <SectionLabel number="01" label={text.about} />
          <h2
            id="about-title"
            className="mt-5 max-w-sm text-3xl leading-tight font-medium tracking-tight"
          >
            {text.aboutTitle}
          </h2>
        </div>
        <div>
          <p className="text-sm leading-8 text-gray-400 sm:text-base">{text.aboutText}</p>
          <h3 className="mt-7 text-sm font-medium text-emerald-200">
            {language === 'pt-BR' ? 'Trabalhos documentados' : 'Documented work'}
          </h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {professionalProfile.workHighlights.map((work) => (
              <li key={work.id} className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                <p className="text-sm leading-6 text-gray-200">{work.title[language]}</p>
                <p className="mt-2 text-xs leading-6 text-gray-500">{work.status[language]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="projects"
        aria-labelledby="projects-title"
        className="scroll-mt-36 border-b border-white/10 py-16 lg:scroll-mt-24"
      >
        <SectionLabel number="02" label={text.projects} />
        <div className="mt-5 flex flex-wrap items-end justify-between gap-5">
          <div>
            <h2 id="projects-title" className="text-3xl font-medium tracking-tight sm:text-4xl">
              {text.projectsTitle}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-400">{text.projectsIntro}</p>
          </div>
          <span className="font-mono text-xs text-gray-500">
            {String(productionProjects.length).padStart(2, '0')} / {text.projects}
          </span>
        </div>
        <div className="mt-8 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div role="group" aria-label={text.projects} className="flex flex-wrap gap-2">
            {(Object.keys(text.categories) as Filter[]).map((filter) => (
              <button
                type="button"
                key={filter}
                onClick={() => setCategory(filter)}
                aria-pressed={category === filter}
                className="rounded-full border border-white/15 px-4 py-2 text-xs text-gray-400 transition-colors hover:border-emerald-300/50 hover:text-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 aria-pressed:border-emerald-300 aria-pressed:bg-emerald-300 aria-pressed:text-[#0b1710]"
              >
                {text.categories[filter]}
              </button>
            ))}
          </div>
          <div className="relative w-full xl:max-w-xs">
            <label htmlFor="project-search" className="sr-only">
              {text.search}
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-3 left-3 size-4 text-gray-500"
            />
            <Input
              id="project-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={text.searchPlaceholder}
              className="h-10 border-white/15 bg-white/5 pl-10 text-gray-100 placeholder:text-gray-500 focus-visible:ring-emerald-300/30"
            />
          </div>
        </div>
        <p
          aria-live="polite"
          aria-atomic="true"
          className="my-5 font-mono text-[11px] text-gray-500"
        >
          {filteredProjects.length} / {productionProjects.length} {text.resultCount}
        </p>
        {filteredProjects.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.seo}
                project={project}
                language={language}
                index={productionProjects.indexOf(project)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 px-5 py-14 text-center">
            <Search aria-hidden="true" className="mx-auto mb-4 size-7 text-emerald-300/60" />
            <h3 className="text-xl font-medium">{text.emptyTitle}</h3>
            <p className="mt-3 text-sm text-gray-400">{text.emptyText}</p>
            <Button
              variant="ghost"
              className="mt-5 text-emerald-300 hover:bg-white/5 hover:text-emerald-200"
              onClick={() => {
                setQuery('')
                setCategory('all')
              }}
            >
              {text.clear}
            </Button>
          </div>
        )}
      </section>

      <section
        id="stack"
        aria-labelledby="stack-title"
        className="scroll-mt-36 border-b border-white/10 py-16 lg:scroll-mt-24"
      >
        <SectionLabel number="03" label={text.stack} />
        <h2
          id="stack-title"
          className="mt-5 max-w-2xl text-3xl leading-tight font-medium tracking-tight sm:text-4xl"
        >
          {text.stackTitle}
        </h2>
        <p className="mt-4 text-sm leading-7 text-gray-400">{text.stackIntro}</p>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skillCategories).map(([name, skills]) => (
            <div key={name} className="border-t border-white/10 pt-5">
              <h3 className="mb-4 text-sm font-medium text-emerald-200">
                {text.skillCategories[name as keyof typeof text.skillCategories]}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md bg-white/5 px-2.5 py-1.5 font-mono text-[11px] text-gray-400"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section
        id="articles"
        aria-labelledby="articles-title"
        className="scroll-mt-36 py-16 lg:scroll-mt-24"
      >
        <SectionLabel number="04" label={text.articles} />
        <h2 id="articles-title" className="mt-5 text-3xl font-medium tracking-tight sm:text-4xl">
          {text.articlesTitle}
        </h2>
        <p className="mt-4 text-sm text-gray-400">{text.articlesIntro}</p>
        <div className="mt-8 space-y-4">
          {articles.map((article) => {
            const content = getArticleContent(article, language)
            return (
              <article
                key={article.url}
                className="flex flex-col gap-6 rounded-2xl border border-white/10 p-6 sm:flex-row sm:items-start sm:p-8"
              >
                <div
                  aria-hidden="true"
                  className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-300/10 text-emerald-300"
                >
                  <BookOpen className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[10px] leading-6 text-gray-500">
                    {article.platform} / {article.year} / {content.readTime}
                  </p>
                  <h3 className="mt-2 max-w-3xl text-xl leading-8 font-medium tracking-tight">
                    {content.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-400">
                    {content.description}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded text-sm text-emerald-300 hover:text-emerald-100 focus-visible:outline-2 focus-visible:outline-emerald-300"
                  >
                    {text.readArticle}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                    <span className="sr-only">: {content.title}</span>
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-title"
        className="mb-14 scroll-mt-36 rounded-2xl bg-[#ccf5d8] p-7 text-[#0b2114] sm:p-12 lg:scroll-mt-24"
      >
        <p className="font-mono text-[10px] tracking-[0.2em] text-[#396447]">
          {text.contactEyebrow}
        </p>
        <h2
          id="contact-title"
          className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl"
        >
          {text.contactTitle}
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-7 text-[#396447]">{text.contactText}</p>
        <a
          href={`mailto:${portfolioData.contact.email}`}
          className="mt-7 inline-flex max-w-full items-center gap-3 rounded text-base font-medium underline decoration-[#0b2114]/25 underline-offset-8 hover:decoration-[#0b2114] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#0b2114] sm:text-2xl"
        >
          <span className="break-all">{portfolioData.contact.email}</span>
          <ArrowUpRight aria-hidden="true" className="size-5 shrink-0" />
        </a>
        <div className="mt-10 flex flex-wrap gap-6 border-t border-[#0b2114]/15 pt-6 text-sm">
          <a
            href={portfolioData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded hover:underline focus-visible:outline-2 focus-visible:outline-[#0b2114]"
          >
            <Github aria-hidden="true" className="size-4" />
            GitHub
          </a>
          <a
            href={portfolioData.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded hover:underline focus-visible:outline-2 focus-visible:outline-[#0b2114]"
          >
            <Linkedin aria-hidden="true" className="size-4" />
            LinkedIn
          </a>
          <a
            href={`mailto:${portfolioData.contact.email}`}
            className="flex items-center gap-2 rounded hover:underline focus-visible:outline-2 focus-visible:outline-[#0b2114]"
          >
            <Mail aria-hidden="true" className="size-4" />
            {text.email}
          </a>
        </div>
      </section>
    </PortfolioShell>
  )
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em]">
      <span className="text-emerald-300">{number}</span>
      <span aria-hidden="true" className="h-px w-6 bg-emerald-300/30" />
      <span className="text-gray-500">{label}</span>
    </p>
  )
}
