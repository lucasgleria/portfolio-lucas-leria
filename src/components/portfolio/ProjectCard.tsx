'use client'

import { ArrowUpRight, BrainCircuit, Check, Gamepad2, Globe2, X } from 'lucide-react'
import type { ProductionProject } from '@/cli/data/productionProjects'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { getProjectCategory, getProjectContent, getProjectStatus, visualCopy, type Language } from './content'

const categoryIcons = { ai: BrainCircuit, games: Gamepad2, web: Globe2 }

export function ProjectCard({
  project,
  language,
  index,
}: {
  project: ProductionProject
  language: Language
  index: number
}) {
  const text = visualCopy[language]
  const content = getProjectContent(project, language)
  const category = getProjectCategory(project)
  const Icon = categoryIcons[category]
  const status = getProjectStatus(project, language)
  const primaryUrl = project.demo ?? project.link
  const primaryLabel = project.demo ? text.demo : text.repository

  return (
    <Dialog>
      <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-portfolio-surface transition-colors hover:border-emerald-400/40">
        <div
          aria-hidden="true"
          className="relative flex h-40 items-center justify-between overflow-hidden border-b border-white/10 bg-emerald-400/5 px-7"
        >
          <span className="font-mono text-7xl font-light tracking-tighter text-emerald-300/15">
            {String(index + 1).padStart(2, '0')}
          </span>
          <Icon className="size-16 stroke-1 text-emerald-300/75 transition-transform duration-300 motion-safe:group-hover:-rotate-6" />
          <span className="absolute bottom-4 left-7 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200/60">
            {text.categories[category]}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-gray-400">
            <span>{project.year}</span>
            <span className="flex items-center gap-2">
              <span
                className={`size-1.5 rounded-full ${project.status === 'Concluded' || project.status === 'Published' ? 'bg-emerald-300' : 'bg-amber-300'}`}
              />
              {status}
            </span>
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-white">{project.name}</h3>
          <a href={`/projects/${project.seo}?lang=${language}`} className="mt-2 w-fit rounded text-xs text-emerald-300 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-emerald-300">
            {language === 'pt-BR' ? 'Página do projeto' : 'Project page'}
          </a>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">{content.description}</p>
          <ul aria-label={text.stack} className="mt-5 flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((technology) => (
              <li
                key={technology}
                className="rounded-md bg-white/5 px-2 py-1 font-mono text-[10px] text-gray-300"
              >
                {technology}
              </li>
            ))}
            {project.technologies.length > 4 && (
              <li className="px-1 py-1 font-mono text-[10px] text-gray-400">
                +{project.technologies.length - 4}
              </li>
            )}
          </ul>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-7">
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-emerald-300 hover:bg-transparent hover:text-emerald-100"
                aria-label={`${text.details}: ${project.name}`}
              >
                {text.details}
                <ArrowUpRight aria-hidden="true" />
              </Button>
            </DialogTrigger>
            {primaryUrl && <a
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${primaryLabel}: ${project.name}`}
              className="rounded text-xs text-gray-400 underline decoration-white/20 underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-emerald-300"
            >
              {primaryLabel}
            </a>}
          </div>
        </div>
      </article>
      <DialogContent
        lang={language}
        showCloseButton={false}
        className="max-h-[85dvh] overflow-y-auto border-white/15 bg-portfolio-surface text-gray-100 sm:max-w-3xl"
      >
        <DialogClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 size-11 text-gray-400 hover:bg-white/10 hover:text-white"
            aria-label={text.close}
          >
            <X aria-hidden="true" />
          </Button>
        </DialogClose>
        <DialogHeader className="pr-10 text-left">
          <p className="mb-2 font-mono text-xs text-emerald-300">
            {text.categories[category]} / {project.year}
          </p>
          <DialogTitle className="text-2xl leading-tight">{project.name}</DialogTitle>
          <DialogDescription className="mt-2 text-sm leading-7 text-gray-300">
            {content.description}
          </DialogDescription>
        </DialogHeader>
        {content.publicationNote && (
          <p className="rounded-xl border border-emerald-300/15 bg-emerald-300/5 p-4 text-sm leading-6 text-gray-300">
            {content.publicationNote}
          </p>
        )}
        <dl className="my-2 grid gap-4 rounded-xl border border-white/10 bg-white/5 p-4 sm:grid-cols-3">
          {[
            [text.role, content.role],
            [text.team, project.team.join(', ')],
            [text.year, project.year],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="mb-1 font-mono text-[11px] text-gray-400">{label}</dt>
              <dd className="text-sm leading-6 text-gray-200">{value}</dd>
            </div>
          ))}
        </dl>
        <div>
          <h3 className="mb-3 text-sm font-semibold">{text.stack}</h3>
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-md bg-emerald-300/10 px-2 py-1 font-mono text-xs text-emerald-200"
              >
                {technology}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-3 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-semibold">{text.features}</h3>
            <ul className="list-disc space-y-2 pl-4 text-sm leading-6 text-gray-300 marker:text-emerald-300">
              {content.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">{text.results}</h3>
            <ul className="space-y-3 text-sm leading-6 text-gray-300">
              {content.results.map((result) => (
                <li key={result} className="flex items-start gap-2">
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-emerald-300" />
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {(project.demo || project.link || project.documentation) && <div className="mt-4 flex flex-wrap gap-3 border-t border-white/10 pt-5">
          {project.demo && <Button asChild className="bg-emerald-300 text-[#0b1710] hover:bg-emerald-200">
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              {text.demo}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>}
          {project.link && <Button
            asChild
            variant="ghost"
            className="text-gray-200 hover:bg-white/10 hover:text-white"
          >
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              {text.source}
            </a>
          </Button>}
          {project.documentation && <Button
            asChild
            variant="ghost"
            className="text-gray-200 hover:bg-white/10 hover:text-white"
          >
            <a href={project.documentation} target="_blank" rel="noopener noreferrer">
              {text.documentation}
            </a>
          </Button>}
        </div>}
      </DialogContent>
    </Dialog>
  )
}
