import { professionalProfile as profile } from '../data/professional-profile'
import { portfolioData } from '../data/portfolio'
import { productionProjects } from '../data/productionProjects'
import { articles } from '../data/articles'
import { skillCategories } from '../data/skills'
import { visualCopy } from '@/components/portfolio/content'

export const portugueseCommands = {
  about: () => profile.summary['pt-BR'],
  experience: () => ['Atuação profissional:', ...profile.roles.map(role => `${role.title['pt-BR']}\n${role.description['pt-BR']}`), 'Trabalhos documentados:', ...profile.workHighlights.map(work => `${work.title['pt-BR']} — ${work.status['pt-BR']}\n${work.summary['pt-BR']}`)].join('\n\n'),
  education: () => ['Formação:', ...profile.education.map(item => `${item.program['pt-BR']} — ${item.institution} (concluído)`), 'Estudos atuais:', profile.learning.description['pt-BR']].join('\n\n'),
  certifications: () => `Estudos e certificações:\nNenhuma certificação concluída foi verificada nesta revisão.\n${profile.learning.provider} — em andamento\n${profile.learning.description['pt-BR']}\n${profile.learning.topics.join(', ')}`,
  languages: () => 'Uso profissional de idiomas:\nEnsino de inglês, preparação de aulas, materiais e avaliações orais.\nNão foi verificado nível CEFR nem certificação concluída.\nInterface disponível em português brasileiro e inglês.',
  contact: () => `Canais profissionais publicados:\nGitHub: ${portfolioData.contact.github}\nLinkedIn: ${portfolioData.contact.linkedin}\nDemais canais: seção Contato do portfólio.`,
  stats: () => `Dados do portfólio:\nProjetos e cases selecionados: ${productionProjects.length}\nTrabalhos documentados: ${profile.workHighlights.length}\nArtigos: ${articles.length}\nFormações: ${profile.education.length}\nPerfil revisado em: ${profile.reviewedAt}`,
  skills: () => Object.entries(skillCategories).map(([category, skills]) => `${visualCopy['pt-BR'].skillCategories[category as keyof typeof visualCopy['pt-BR']['skillCategories']]}:\n${skills.join(', ')}`).join('\n\n'),
  whoami: () => 'Visitante do portfólio profissional de Lucas Leria.',
  ls: () => 'Seções: about, projects, production, skills, experience, education, certifications, languages, articles, contact, resume.\nUse help para ver os comandos.',
  help: () => 'Comandos disponíveis (os nomes permanecem em inglês):\nabout — perfil\nprojects — catálogo completo\naiProjects / webProjects / gameProjects / desktopApps / otherProjects — categorias\nproduction — projetos, produtos e cases selecionados\nskills — tecnologias\nexperience — atuação e trabalhos\neducation — formação\ncertifications — estudos e certificações\nlanguages — idiomas\narticles — artigos\ncontact — canais profissionais\nresume — perfil e currículo\nler <pergunta> — assistente\nlerchat — abrir conversa\nclear — limpar saída\nwhoami — visitante\ndate — data\nls — seções',
}
