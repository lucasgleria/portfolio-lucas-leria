import { productionProjects, type ProjectCategory } from './productionProjects'
import { getProjectContent, getProjectStatus, type Language } from '@/components/portfolio/content'

export type CatalogCategory = ProjectCategory | 'desktop' | 'systems'

// Entries retained from the earlier catalog, without unverified deployment or impact claims.
const archive: { name: string; category: CatalogCategory; en: string; pt: string; technologies: string[] }[] = [
  { name: 'LibraVoice', category: 'ai', en: 'Sign-language recognition study.', pt: 'Estudo de reconhecimento de linguagem de sinais.', technologies: ['Python', 'TensorFlow', 'OpenCV'] },
  { name: 'Signature Recognizer', category: 'ai', en: 'Signature verification study.', pt: 'Estudo de verificação de assinaturas.', technologies: ['Python', 'PyTorch'] },
  { name: 'Seamese Networks Algorithm', category: 'ai', en: 'Image similarity study.', pt: 'Estudo de similaridade de imagens.', technologies: ['Python', 'TensorFlow', 'Keras'] },
  { name: 'OverChat', category: 'web', en: 'Social-network interface project.', pt: 'Projeto de interface de rede social.', technologies: ['HTML', 'CSS', 'JavaScript'] },
  { name: 'Linktrell', category: 'web', en: 'Page for organizing links.', pt: 'Página para organizar links.', technologies: ['React', 'Node.js'] },
  { name: 'BlogApp', category: 'web', en: 'Blog application project.', pt: 'Projeto de aplicação de blog.', technologies: ['React', 'Node.js', 'MongoDB'] },
  { name: 'FinancialApp', category: 'web', en: 'Financial application study.', pt: 'Estudo de aplicação financeira.', technologies: ['React', 'Node.js', 'PostgreSQL'] },
  { name: 'Musicaller.ia', category: 'web', en: 'Music-course website project.', pt: 'Projeto de site de curso de música.', technologies: [] },
  { name: 'lleria-medinizer', category: 'desktop', en: 'Pharmaceutical inventory CRUD project.', pt: 'Projeto de CRUD de estoque farmacêutico.', technologies: ['Python', 'SQLite'] },
  { name: 'URL Shortener', category: 'desktop', en: 'Desktop URL-shortening project.', pt: 'Projeto desktop para encurtar URLs.', technologies: ['Python', 'PyQt6'] },
  { name: 'Virtual Agenda', category: 'desktop', en: 'Task organizer project.', pt: 'Projeto de organização de tarefas.', technologies: ['Python', 'Tkinter', 'SQLite'] },
  { name: 'Java Inventory Management System', category: 'desktop', en: 'Academic inventory-management project.', pt: 'Projeto acadêmico de gestão de estoque.', technologies: ['Java', 'Swing', 'MySQL'] },
  { name: 'Microservices Structure', category: 'systems', en: 'Microservices architecture study.', pt: 'Estudo de arquitetura de microsserviços.', technologies: ['Docker', 'Python', 'TypeScript'] },
  { name: "Structures'nAlgorithms", category: 'systems', en: 'Data structures and algorithms exercises.', pt: 'Exercícios de estruturas de dados e algoritmos.', technologies: ['Python'] },
  { name: 'FlappyZap', category: 'games', en: 'Game development study.', pt: 'Estudo de desenvolvimento de jogos.', technologies: ['Python', 'Pygame'] },
]

export function getCatalogEntries(language: Language = 'en') {
  return [
    ...productionProjects.map(project => ({
      id: project.seo, name: project.name, category: project.category as CatalogCategory,
      description: getProjectContent(project, language).description,
      technologies: project.technologies, status: getProjectStatus(project, language), selected: true,
    })),
    ...archive.map(project => ({
      id: project.name, name: project.name, category: project.category,
      description: language === 'pt-BR' ? project.pt : project.en, technologies: project.technologies,
      status: language === 'pt-BR' ? 'Arquivo; publicação não revalidada' : 'Archive; deployment not revalidated', selected: false,
    })),
  ]
}

export function formatProjectCatalog(language: Language = 'en', category?: CatalogCategory): string {
  const entries = getCatalogEntries(language).filter(project => !category || project.category === category)
  const title = language === 'pt-BR' ? 'Catálogo de projetos' : 'Project catalog'
  const stack = language === 'pt-BR' ? 'Tecnologias' : 'Technologies'
  return `${title} (${entries.length}):\n\n${entries.map(project =>
    `${project.name} — ${project.status}\n${project.description}${project.technologies.length ? `\n${stack}: ${project.technologies.join(', ')}` : ''}`,
  ).join('\n\n')}`
}
