'use client'
import type { RefObject } from 'react'
import type { ProductionProject } from '../data/productionProjects'
import type { Language } from '@/components/portfolio/content'
import { ProjectCollection } from '@/components/portfolio/ProjectCollection'
import { PortfolioDialog } from './PortfolioDialog'

export function ProductionProjectsModal({ showProductionModal, setShowProductionModal, productionProjects, language = 'en', returnFocusRef }: {
  showProductionModal: boolean; setShowProductionModal: (show: boolean) => void; productionProjects: ProductionProject[]; language?: Language; returnFocusRef?: RefObject<HTMLElement | null>
}) {
  const pt = language === 'pt-BR'
  return <PortfolioDialog open={showProductionModal} onClose={() => setShowProductionModal(false)} language={language} returnFocusRef={returnFocusRef} title={pt ? 'Projetos, produtos e cases' : 'Projects, products and technical cases'} description={pt ? 'Consulte os detalhes ou abra os links públicos disponíveis.' : 'Explore details or open available public links.'}>
    <ProjectCollection projects={productionProjects} language={language} />
  </PortfolioDialog>
}
