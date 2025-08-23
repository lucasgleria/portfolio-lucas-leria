import { CommandContext } from "./types"

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
  production         - Production projects (Live Demos!)
  projects/          - Projects portfolio (19 projects)
  resume             - Full resume browser viewer
  stats.txt          - Project statistics
  skills.txt         - Technical skills by category
  web-projects.txt   - Web development projects`
}