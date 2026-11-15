import { CommandContext } from "./types"
import { getCatalogEntries } from '../data/project-catalog'

export const ls = (context: CommandContext) => {
    return `Portfolio Contents:
  about.txt          - About Lucas
  ai-projects.txt    - AI/ML projects only
  articles           - Published articles and writings
  certifications.txt - Certifications and courses
  contact.txt        - Contact information
  education.txt      - Academic background
  experience.txt     - Professional experience
  languages.txt      - Language proficiency
  ler.ai             - AI Assistant
  lerchat            - Ler Chat desktop application
  production         - Selected projects, products and technical cases
  projects/          - Project catalog (${getCatalogEntries(context.language).length} entries)
  resume             - Full resume browser viewer
  stats.txt          - Project statistics
  skills.txt         - Technical skills by category
  web-projects.txt   - Web development projects`
}
