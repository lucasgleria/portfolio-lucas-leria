import PortfolioApp from '@/components/portfolio/PortfolioApp'
import { pageMetadata, parseLanguage } from '@/lib/site-metadata'

type Props = { searchParams: Promise<{ lang?: string }> }
export async function generateMetadata({ searchParams }: Props) { return pageMetadata(parseLanguage((await searchParams).lang) ?? 'en', '/visual') }
export default async function Page({ searchParams }: Props) { return <PortfolioApp initialMode="visual" initialLanguage={parseLanguage((await searchParams).lang) ?? 'en'} /> }
