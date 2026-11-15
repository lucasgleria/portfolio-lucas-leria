'use client'
import { professionalProfile } from '../data/professional-profile'
import { portfolioData } from '../data/portfolio'
import type { Language } from '@/components/portfolio/content'
import { PortfolioDialog } from './PortfolioDialog'

export function ResumeModal({ showResumeModal, setShowResumeModal, language = 'en' }: {
  showResumeModal: boolean; setShowResumeModal: (show: boolean) => void; language?: Language
}) {
  const pt = language === 'pt-BR'
  return <PortfolioDialog open={showResumeModal} onClose={() => setShowResumeModal(false)} language={language} title={pt ? 'Perfil profissional' : 'Professional profile'} description={professionalProfile.title[language]}>
    <p className="text-sm leading-8 text-gray-300">{professionalProfile.summary[language]}</p>
    <h3 className="mt-7 text-base font-medium text-emerald-300">{pt ? 'Formação' : 'Education'}</h3>
    <ul className="mt-3 space-y-3 text-sm text-gray-300">{professionalProfile.education.map(item => <li key={item.institution}>{item.program[language]} — {item.institution}</li>)}</ul>
    <h3 className="mt-7 text-base font-medium text-emerald-300">{pt ? 'Atuação' : 'Experience'}</h3>
    <ul className="mt-3 space-y-4">{professionalProfile.roles.map(role => <li key={role.title.en}><p className="text-sm font-medium">{role.title[language]}</p><p className="mt-1 text-sm leading-7 text-gray-400">{role.description[language]}</p></li>)}</ul>
    <a href={portfolioData.resume} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-11 items-center text-sm text-emerald-300 underline underline-offset-4">{pt ? 'Abrir currículo externo' : 'Open external resume'}</a>
  </PortfolioDialog>
}
