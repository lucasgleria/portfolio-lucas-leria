import { CommandContext } from "./types"
import { portugueseCommands } from './portuguese'

// import all commands
import { about } from "./about"
import { aiProjects } from "./ai-projects"
import { articles } from "./articles"
import { certifications } from "./certifications"
import { contact } from "./contact"
import { date } from "./date"
import { desktopApps } from "./desktop-apps"
import { education } from "./education"
import { experience } from "./experience"
import { gameProjects } from "./game-projects"
import { help } from "./help"
import { languages } from "./languages"
import { ler } from "./ler"
import { lerchat } from "./lerchat"
import { ls } from "./ls"
import { otherProjects } from "./other-projects"
import { production } from "./production"
import { projects } from "./projects"
import { resume } from "./resume"
import { skills } from "./skills"
import { stats } from "./stats"
import { webProjects } from "./web-projects"
import { whoami } from "./whoami"

export const createCommandHandlers = (context: CommandContext) => {
  const { setHistory, setShowProductionModal, setShowArticlesModal, setShowResumeModal, setShowLerChatModal } = context

  return {
    about: () => about(context),
    aiProjects: () => aiProjects(context),
    articles: () => articles(context),
    certifications: () => certifications(),
    clear: () => setHistory([]),
    contact: () => contact(),
    date: () => date(context),
    desktopApps: () => desktopApps(context),
    education: () => education(),
    experience: () => experience(),
    gameProjects: () => gameProjects(context),
    languages: () => languages(),
    ler: (args: string[]) => ler(context, args),
    lerchat: () => lerchat(context),
    ls: () => ls(context),
    otherProjects: () => otherProjects(context),
    production: () => production(context),
    resume: () => resume(context),
    stats: () => stats(),
    webProjects: () => webProjects(context),
    whoami: () => whoami(context),
    help: () => help(context),
    skills: () => skills(context),
    projects: () => projects(context),
    ...(context.language === 'pt-BR' ? portugueseCommands : {}),
  }
}
