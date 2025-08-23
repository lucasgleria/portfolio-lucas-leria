import { CommandContext } from "./types"

export const help = (context: CommandContext) => {
  return `Available Commands:
  about          - Learn about Lucas
  aiProjects    - AI/ML projects only
  articles       - View published articles and writings
  certifications - Certifications and courses
  clear          - Clear the terminal
  contact        - Get contact information
  date           - Show current date and time
  desktopApps   - Desktop application projects only
  education      - Academic background
  experience     - Professional experience
  gameProjects  - Game development projects only
  ler <msg>      - Chat with Ler AI assistant
  lerchat        - Open Ler Chat desktop app
  help           - Show this help message
  languages      - Language proficiency
  ls             - List portfolio sections
  otherProjects - Architecture & Systems projects only
  production     - View production projects (Live Demos!)
  projects       - See projects portfolio
  resume         - View Lucas's full resume in browser
  skills         - View technical skills
  stats          - Project statistics
  webProjects   - Web development projects only
  whoami         - Show current user info`
}
