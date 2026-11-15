import { productionProjects } from '../data/productionProjects'
import { articles } from '../data/articles'
import { professionalProfile } from '../data/professional-profile'
import { skillCategories } from '../data/skills'

export const stats = () => `Portfolio Data:
  • Selected projects and technical cases: ${productionProjects.length}
  • Documented professional work summaries: ${professionalProfile.workHighlights.length}
  • Published articles: ${articles.length}
  • Technologies listed: ${new Set(Object.values(skillCategories).flat()).size}
  • Education records: ${professionalProfile.education.length}
  • Professional profile reviewed: ${professionalProfile.reviewedAt}

Ongoing studies and prototypes are not counted as completed certifications or completed client deliveries.`
