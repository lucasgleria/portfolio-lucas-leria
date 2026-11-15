import PortfolioApp from '@/components/portfolio/PortfolioApp'
import { pageMetadata, parseLanguage } from '@/lib/site-metadata'

type Props = { searchParams: Promise<{ lang?: string }> }
export async function generateMetadata({ searchParams }: Props) { return pageMetadata(parseLanguage((await searchParams).lang) ?? 'en', '/') }
export default async function Home({ searchParams }: Props) { return <PortfolioApp initialLanguage={parseLanguage((await searchParams).lang)} /> }
