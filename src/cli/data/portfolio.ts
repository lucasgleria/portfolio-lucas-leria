import { professionalProfile } from './professional-profile'

export interface PortfolioData {
  name: string
  title: string
  about: string
  resume: string
  contact: {
    email: string
    github: string
    linkedin: string
  }
}

export const portfolioData: PortfolioData = {
  name: 'Lucas Gomes Leria',
  resume: 'https://lucasgleria.github.io/resume/',
  title: professionalProfile.title.en,
  about: professionalProfile.summary.en,
  contact: {
    email: 'lucasleria17@gmail.com',
    github: 'https://github.com/lucasgleria',
    linkedin: 'https://www.linkedin.com/in/lucasleria',
  },
}
