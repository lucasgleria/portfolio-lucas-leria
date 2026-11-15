import type { MetadataRoute } from 'next'
import { productionProjects } from '@/cli/data/productionProjects'
import { siteOrigin } from '@/lib/site-metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin()
  if (!origin) return []
  return ['/', '/visual', '/terminal', ...productionProjects.map(project => `/projects/${project.seo}`)].flatMap(path =>
    (['en', 'pt-BR'] as const).map(language => ({ url: new URL(`${path}?lang=${language}`, origin).toString() })),
  )
}
