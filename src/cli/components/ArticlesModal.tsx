'use client'
import type { Article } from '../data/articles'
import { getArticleContent, type Language } from '@/components/portfolio/content'
import { PortfolioDialog } from './PortfolioDialog'

export function ArticlesModal({ showArticlesModal, setShowArticlesModal, articles, language = 'en' }: {
  showArticlesModal: boolean; setShowArticlesModal: (show: boolean) => void; articles: Article[]; language?: Language
}) {
  const pt = language === 'pt-BR'
  return <PortfolioDialog open={showArticlesModal} onClose={() => setShowArticlesModal(false)} language={language} title={pt ? 'Artigos publicados' : 'Published articles'} description={pt ? 'Leitura aberta diretamente na plataforma de publicação.' : 'Read directly on the publishing platform.'}>
    <div className="grid gap-5 md:grid-cols-2">{articles.map(article => {
      const content = getArticleContent(article, language)
      return <article key={article.url} className="rounded-xl border border-white/10 p-5">
        <p className="text-xs text-emerald-300">{article.platform} / {article.year}</p>
        <h3 className="mt-3 text-lg font-medium">{content.title}</h3>
        <p className="mt-3 text-sm leading-7 text-gray-400">{content.description}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center text-sm text-emerald-300 underline underline-offset-4">{pt ? 'Ler artigo' : 'Read article'}</a>
      </article>
    })}</div>
  </PortfolioDialog>
}
