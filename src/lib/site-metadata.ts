import type { Metadata } from 'next'
import type { Language } from '@/components/portfolio/content'

export function parseLanguage(value?: string): Language | undefined {
  return value === 'en' || value === 'pt-BR' ? value : undefined
}

export function siteOrigin(): URL | undefined {
  try {
    const url = new URL(process.env.SITE_URL || 'https://portfolio-lucas-leria.vercel.app')
    return /^https?:$/.test(url.protocol) ? new URL(url.origin) : undefined
  } catch { return undefined }
}

export function pageMetadata(language: Language, path: string, projectName?: string): Metadata {
  const origin = siteOrigin()
  const title = projectName ? `${projectName} | Lucas Leria` : language === 'pt-BR' ? 'Lucas Leria | Desenvolvimento Full Stack' : 'Lucas Leria | Full-stack Development'
  const description = language === 'pt-BR' ? 'Projetos, produtos reutilizáveis e trabalhos documentados em desenvolvimento web, automação e bancos de dados.' : 'Projects, reusable products and documented work in web development, automation and databases.'
  const localizedUrl = (locale: Language) => new URL(`${path}?lang=${locale}`, origin).toString()
  return {
    title, description,
    ...(origin ? { metadataBase: origin, alternates: { canonical: localizedUrl(language), languages: { en: localizedUrl('en'), 'pt-BR': localizedUrl('pt-BR') } } } : {}),
    openGraph: { title, description, type: 'website', siteName: 'Lucas Leria', locale: language === 'pt-BR' ? 'pt_BR' : 'en_US', ...(origin ? { url: localizedUrl(language), images: [{ url: new URL('/opengraph-image', origin).toString(), width: 1200, height: 630 }] } : {}) },
    twitter: { card: 'summary_large_image', title, description },
  }
}
