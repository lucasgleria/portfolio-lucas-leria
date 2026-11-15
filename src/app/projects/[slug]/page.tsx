import Link from 'next/link'
import { notFound } from 'next/navigation'
import { productionProjects } from '@/cli/data/productionProjects'
import { getCaseStudy } from '@/cli/data/case-studies'
import { getProjectContent, getProjectStatus } from '@/components/portfolio/content'
import { pageMetadata, parseLanguage } from '@/lib/site-metadata'

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }

export function generateStaticParams() { return productionProjects.map(project => ({ slug: project.seo })) }

export async function generateMetadata({ params, searchParams }: Props) {
  const { slug } = await params
  const project = productionProjects.find(item => item.seo === slug)
  return pageMetadata(parseLanguage((await searchParams).lang) ?? 'en', `/projects/${slug}`, project?.name)
}

export default async function ProjectPage({ params, searchParams }: Props) {
  const { slug } = await params
  const project = productionProjects.find(item => item.seo === slug)
  if (!project) notFound()
  const language = parseLanguage((await searchParams).lang) ?? 'en'
  const pt = language === 'pt-BR'
  const content = getProjectContent(project, language)
  const study = getCaseStudy(project.name, language)
  const linkStyle = 'rounded text-emerald-300 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-emerald-300'
  return <main lang={language} className="min-h-screen bg-portfolio-background px-5 py-10 text-gray-100 sm:px-8">
    <article className="mx-auto max-w-3xl">
      <nav aria-label={pt ? 'Navegação do case' : 'Case navigation'} className="mb-10 flex flex-wrap justify-between gap-5 text-sm">
        <Link href={`/visual?lang=${language}#projects`} className={linkStyle}>{pt ? 'Voltar aos projetos' : 'Back to projects'}</Link>
        <div className="flex gap-4"><Link href={`?lang=en`} hrefLang="en" lang="en" className={linkStyle} aria-current={language === 'en' ? 'page' : undefined}>English</Link><Link href={`?lang=pt-BR`} hrefLang="pt-BR" lang="pt-BR" className={linkStyle} aria-current={pt ? 'page' : undefined}>Português</Link></div>
      </nav>
      <p className="font-mono text-xs text-emerald-300">{project.year} / {getProjectStatus(project, language)}</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">{project.name}</h1>
      <p className="mt-6 text-base leading-8 text-gray-300">{content.description}</p>
      <p className="mt-5 text-sm text-gray-400">{pt ? 'Atuação' : 'Role'}: {content.role}</p>
      {study && <div className="mt-10 space-y-8 border-t border-white/10 pt-8">
        {[[pt ? 'Problema' : 'Problem', study.problem], [pt ? 'Minha contribuição' : 'My contribution', study.contribution]].map(([title, body]) => <section key={title}><h2 className="text-xl font-medium">{title}</h2><p className="mt-3 text-sm leading-8 text-gray-300">{body}</p></section>)}
        <section><h2 className="text-xl font-medium">{pt ? 'Decisões de implementação' : 'Implementation decisions'}</h2><ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-gray-300">{study.decisions.map(decision => <li key={decision}>{decision}</li>)}</ul></section>
      </div>}
      <section className="mt-10"><h2 className="text-xl font-medium">{pt ? 'Tecnologias' : 'Technologies'}</h2><ul className="mt-4 flex flex-wrap gap-2">{project.technologies.map(technology => <li key={technology} className="rounded bg-emerald-300/10 px-3 py-2 font-mono text-xs text-emerald-200">{technology}</li>)}</ul></section>
      <section className="mt-10"><h2 className="text-xl font-medium">{pt ? 'Funcionalidades' : 'Features'}</h2><ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-gray-300">{content.features.map(feature => <li key={feature}>{feature}</li>)}</ul></section>
      <section className="mt-10"><h2 className="text-xl font-medium">{pt ? 'Resultados e estágio' : 'Results and current scope'}</h2><ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-gray-300">{content.results.map(result => <li key={result}>{result}</li>)}</ul></section>
      {study && <section className="mt-10"><h2 className="text-xl font-medium">{pt ? 'Próximo passo' : 'Next step'}</h2><p className="mt-3 text-sm leading-8 text-gray-300">{study.nextStep}</p></section>}
      {content.publicationNote && <p className="mt-8 rounded-xl border border-white/15 p-5 text-sm leading-7 text-gray-400">{content.publicationNote}</p>}
      <div className="mt-8 flex flex-wrap gap-6 border-t border-white/10 py-6 text-sm">{[[project.demo, pt ? 'Demonstração' : 'Demo'], [project.link, pt ? 'Repositório' : 'Repository'], [project.documentation, pt ? 'Documentação' : 'Documentation']].filter(([url]) => url).map(([url, label]) => <a key={label} href={url} target="_blank" rel="noopener noreferrer" className={linkStyle}>{label}</a>)}</div>
    </article>
  </main>
}
