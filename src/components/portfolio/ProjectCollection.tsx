import { productionProjects, type ProductionProject } from '@/cli/data/productionProjects'
import { ProjectCard } from './ProjectCard'
import type { Language } from './content'

export function ProjectCollection({ language, projects = productionProjects }: { language: Language; projects?: ProductionProject[] }) {
  return <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{projects.map((project, index) => <ProjectCard key={project.seo} project={project} language={language} index={index} />)}</div>
}
