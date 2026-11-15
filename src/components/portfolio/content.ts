import { portfolioData } from '@/cli/data/portfolio'
import { professionalProfile } from '@/cli/data/professional-profile'
import type { ProductionProject } from '@/cli/data/productionProjects'
export type { ProjectCategory } from '@/cli/data/productionProjects'
import type { Article } from '@/cli/data/articles'

export type Language = 'en' | 'pt-BR'

export const visualCopy = {
  en: {
    skip: 'Skip to content',
    navigation: 'Portfolio navigation',
    language: 'Language',
    interfaces: 'Choose interface',
    terminal: 'Open terminal',
    about: 'About',
    projects: 'Projects',
    stack: 'Technologies',
    articles: 'Articles',
    contact: 'Contact',
    eyebrow: 'FULL-STACK DEVELOPMENT · DATA · AI',
    headline: 'Ideas into software.',
    headlineAccent: 'Data into possibilities.',
    intro: professionalProfile.intro.en,
    explore: 'Explore my work',
    resume: 'View resume',
    projectCount: 'selected projects',
    articleCount: 'published article',
    focus: 'My focus',
    focusText: 'From the database to the interface.',
    aboutTitle: 'Curiosity, with a practical purpose.',
    aboutText: portfolioData.about,
    projectsTitle: 'Selected work.',
    projectsIntro: 'A collection of web experiences, AI experiments and collaborative projects.',
    search: 'Search projects',
    searchPlaceholder: 'Search by name, technology or topic…',
    categories: { all: 'All projects', web: 'Web', ai: 'Artificial intelligence', games: 'Games' },
    resultCount: 'projects shown',
    emptyTitle: 'No projects found.',
    emptyText: 'Try another search or choose a different category.',
    clear: 'Clear filters',
    details: 'View details',
    demo: 'Open demo',
    source: 'Source code',
    repository: 'Open repository',
    documentation: 'Documentation',
    completed: 'Completed',
    inProgress: 'In progress',
    published: 'Published',
    documentedUse: 'Documented use',
    role: 'Role',
    team: 'Team',
    year: 'Year',
    features: 'What it does',
    results: 'Results',
    close: 'Close project details',
    stackTitle: 'A toolkit for turning ideas into reality.',
    stackIntro: 'Languages, frameworks and tools that support my work.',
    skillCategories: {
      'Programming Languages': 'Programming languages',
      'AI/ML & Data Science': 'AI & data science',
      'Web Development': 'Web development',
      Databases: 'Databases',
      'DevOps & Cloud': 'DevOps & cloud',
      'Tools & Others': 'Tools & collaboration',
    },
    articlesTitle: 'Thinking out loud.',
    articlesIntro: 'Notes and perspectives on technology and data.',
    readArticle: 'Read article',
    contactEyebrow: 'LET’S CONNECT',
    contactTitle: 'Have an idea in mind?',
    contactText:
      'Let’s talk about your project, share ideas or explore what we can build together.',
    email: 'Send an email',
    backToTop: 'Back to top',
    footer: 'Built with curiosity. Powered by code.',
  },
  'pt-BR': {
    skip: 'Pular para o conteúdo',
    navigation: 'Navegação do portfólio',
    language: 'Idioma',
    interfaces: 'Escolher interface',
    terminal: 'Abrir terminal',
    about: 'Sobre',
    projects: 'Projetos',
    stack: 'Tecnologias',
    articles: 'Artigos',
    contact: 'Contato',
    eyebrow: 'DESENVOLVIMENTO FULL STACK · DADOS · IA',
    headline: 'Ideias em software.',
    headlineAccent: 'Dados em possibilidades.',
    intro: professionalProfile.intro['pt-BR'],
    explore: 'Conheça meus projetos',
    resume: 'Ver currículo',
    projectCount: 'projetos selecionados',
    articleCount: 'artigo publicado',
    focus: 'Meu foco',
    focusText: 'Do banco de dados à interface.',
    aboutTitle: 'Curiosidade com propósito.',
    aboutText: professionalProfile.summary['pt-BR'],
    projectsTitle: 'Projetos em destaque.',
    projectsIntro:
      'Uma seleção de experiências web, experimentos com IA e projetos em colaboração.',
    search: 'Buscar projetos',
    searchPlaceholder: 'Busque por nome, tecnologia ou assunto…',
    categories: {
      all: 'Todos os projetos',
      web: 'Web',
      ai: 'Inteligência artificial',
      games: 'Jogos',
    },
    resultCount: 'projetos exibidos',
    emptyTitle: 'Nenhum projeto encontrado.',
    emptyText: 'Tente outra busca ou escolha uma categoria diferente.',
    clear: 'Limpar filtros',
    details: 'Ver detalhes',
    demo: 'Abrir demonstração',
    source: 'Código-fonte',
    repository: 'Abrir repositório',
    documentation: 'Documentação',
    completed: 'Concluído',
    inProgress: 'Em desenvolvimento',
    published: 'Publicado',
    documentedUse: 'Uso documentado',
    role: 'Atuação',
    team: 'Equipe',
    year: 'Ano',
    features: 'Funcionalidades',
    results: 'Resultados',
    close: 'Fechar detalhes do projeto',
    stackTitle: 'Ferramentas para dar vida às ideias.',
    stackIntro: 'Linguagens, frameworks e ferramentas que fazem parte do meu trabalho.',
    skillCategories: {
      'Programming Languages': 'Linguagens de programação',
      'AI/ML & Data Science': 'IA e Ciência de Dados',
      'Web Development': 'Desenvolvimento web',
      Databases: 'Bancos de dados',
      'DevOps & Cloud': 'DevOps e nuvem',
      'Tools & Others': 'Ferramentas e colaboração',
    },
    articlesTitle: 'Ideias compartilhadas.',
    articlesIntro: 'Reflexões e perspectivas sobre tecnologia e dados.',
    readArticle: 'Ler artigo',
    contactEyebrow: 'VAMOS CONVERSAR',
    contactTitle: 'Tem uma ideia em mente?',
    contactText:
      'Vamos conversar sobre seu projeto, trocar ideias ou descobrir o que podemos construir juntos.',
    email: 'Enviar e-mail',
    backToTop: 'Voltar ao topo',
    footer: 'Feito com curiosidade. Movido a código.',
  },
} as const

export const getProjectCategory = (project: ProductionProject) => project.category

export function getProjectStatus(project: ProductionProject, language: Language): string {
  const text = visualCopy[language]
  const labels: Record<ProductionProject['status'], string> = {
    Concluded: text.completed,
    'In Progress': text.inProgress,
    Published: text.published,
    'Documented use': text.documentedUse,
  }
  return labels[project.status]
}

const portugueseProjects: Record<
  string,
  Pick<ProductionProject, 'description' | 'role' | 'features' | 'results'> &
    Partial<Pick<ProductionProject, 'publicationNote'>>
> = {
  'vault-template': {
    description:
      'Vault reutilizável para organizar projetos, tarefas e conhecimento com orientação de agentes de IA. O repositório público é o produto: basta copiar ou clonar para o ambiente escolhido e configurar com um agente que tenha acesso aos arquivos.',
    role: 'Autor e mantenedor',
    features: [
      'Configuração progressiva por conversa com estado salvo para retomada',
      'Instruções compartilhadas para Codex, Cursor, Claude Code, Gemini CLI e GitHub Copilot',
      'Modelos reutilizáveis de projetos, tarefas, conhecimento e rotinas',
      'Arquivos de continuidade para retomar o trabalho entre sessões e agentes',
      'Configuração versionada, esquemas JSON e validadores estruturais em Python',
    ],
    results: [
      'Repositório público com licença MIT publicado em novembro de 2026',
      'Configuração e instruções reutilizáveis em ambientes com ferramentas compatíveis de acesso a arquivos',
    ],
    publicationNote:
      'Publicado como repositório reutilizável sob licença MIT. O funcionamento depende do acesso a arquivos e do suporte a instruções de projeto pelo agente escolhido.',
  },
  'Treino IA': {
    description:
      'PWA para planejar treinos, registrar sessões e consultar um Coach IA cujas propostas exigem aceite. Combina planejamento determinístico, armazenamento offline e sincronização por conta.',
    role: 'Desenvolvedor Full Stack',
    features: [
      'Planejamento de treinos, planos versionados e registro de sessões',
      'Persistência offline com IndexedDB',
      'Isolamento por conta e sincronização incremental com reenvio',
      'Propostas do Coach IA com aceite explícito do usuário',
      'Agenda gerada no aparelho após concluir a sincronização pendente',
    ],
    results: [
      'Implementação publicada documentada na revisão de outubro de 2026',
      'Planejamento, histórico e sincronização implementados; os fluxos atuais de produção não foram revalidados nesta revisão do portfólio',
    ],
    publicationNote:
      'Case técnico. O repositório da aplicação é privado; não há demonstração pública vinculada aqui.',
  },
  'Classes Points': {
    description:
      'Aplicação de gestão de turmas com foco no celular: pontos, avaliações escritas e orais, fichas e relatórios PDF. O case apresenta os fluxos implementados e o uso docente documentado.',
    role: 'Desenvolvedor Full Stack',
    features: [
      'Gestão de turmas e registro de pontos individuais ou em lote',
      'Avaliações escritas e provas orais com pesos',
      'Histórico de avaliações, revisões e relatórios PDF',
      'HTML renderizado no servidor com JavaScript e CSS',
      'Suporte a PostgreSQL/Neon na hospedagem e SQLite no desenvolvimento local',
    ],
    results: [
      'Uso em sala de aula documentado em outubro de 2026',
      'Acabamento do PDF e melhorias de desempenho seguem pendentes; a configuração atual de produção não foi revalidada',
    ],
    publicationNote:
      'Case técnico. O painel do professor e os registros reais de turmas não fazem parte de uma demonstração pública.',
  },
  'chat-lleria': {
    description:
      'Chatbot com inteligência artificial usando a API Google Gemini 1.5 Flash. Possui quatro perfis de interação — recrutador, desenvolvedor, cliente e estudante — com respostas personalizadas sobre o currículo.',
    role: 'Desenvolvedor Full Stack',
    features: [
      'Chatbot inteligente com a API Gemini',
      'Sistema de perfis personalizados',
      'Interface em tempo real com histórico',
      'Design responsivo e animações',
      'API RESTful com prompts personalizados',
    ],
    results: [
      'Chatbot funcional para apresentação do currículo',
      'Documentação publicada',
      'Uso planejado no portfólio',
    ],
  },
  'Mystical Number Castle': {
    description:
      'Jogo web interativo em que o jogador desafia um gênio em um castelo místico para adivinhar um número secreto. Uma evolução colaborativa de um jogo de terminal feito em C, agora com interface gráfica responsiva.',
    role: 'Desenvolvedor Full Stack (colaboração)',
    features: [
      'Jogo interativo de adivinhação',
      'Níveis de dificuldade: fácil, médio e difícil',
      'Ranking para acompanhar o desempenho',
      'Feedback visual com animações e sprites personalizados',
      'Design responsivo',
      'Temas e fontes personalizados',
      'Navegação por teclado e acessibilidade',
    ],
    results: [
      'Jogo funcional e publicado para todos os públicos',
      'Documentação publicada',
      'Demonstração de desenvolvimento frontend moderno e colaboração',
    ],
  },
  'The Forca': {
    description:
      'Uma releitura moderna do clássico jogo da forca para jogar no navegador. O projeto colaborativo combina um backend em Python com FastAPI e um frontend em JavaScript, Tailwind CSS e SCSS.',
    role: 'Desenvolvedor Full Stack (colaboração)',
    features: [
      'Seleção de dificuldade: fácil, médio e difícil',
      'Teclado virtual interativo',
      'Desenho progressivo da forca',
      'Feedback visual e sonoro',
      'Ranking local',
      'Interface responsiva e acessível',
    ],
    results: [
      'Jogo web funcional e publicado',
      'Documentação para facilitar contribuições',
      'Demonstração de desenvolvimento full stack e trabalho colaborativo',
    ],
  },
  LerCode: {
    description:
      'Aplicação web gratuita e intuitiva para gerar QR codes instantaneamente, com tamanhos personalizáveis e download em alta qualidade.',
    role: 'Desenvolvedor Full Stack',
    features: [
      'Geração instantânea',
      'Vários formatos: URLs, textos e outros',
      'Tamanhos personalizáveis: 200×200, 300×300 e 400×400',
      'Download em PNG de alta qualidade',
      'Interface responsiva',
      'Detecção automática de idioma',
    ],
    results: [
      'Gerador de QR codes funcional e fácil de usar',
      'Interface moderna e responsiva',
      'Tamanhos personalizáveis e downloads em alta qualidade',
    ],
  },
  'Portfolio Nathalye Vitoria': {
    description:
      'Portfólio profissional moderno e responsivo para apresentar projetos, certificações e habilidades técnicas, desenvolvido com Next.js, TypeScript e Tailwind CSS.',
    role: 'Desenvolvedor Full Stack',
    features: [
      'Tema claro e escuro',
      'Design responsivo',
      'Animações com Framer Motion',
      'Janelas interativas de projetos',
      'Visualização detalhada de certificações',
      'SEO otimizado',
    ],
    results: [
      'Portfólio profissional e moderno desenvolvido',
      'Apresentação de habilidades técnicas e projetos',
      'Aplicação organizada, escalável e de fácil manutenção',
    ],
  },
}

export function getProjectContent(
  project: ProductionProject,
  language: Language,
): ProductionProject {
  return language === 'pt-BR' ? { ...project, ...portugueseProjects[project.name] } : project
}

export function getArticleContent(article: Article, language: Language): Article {
  if (language !== 'pt-BR' || !article.url.includes('7361434341228392448')) return article
  return {
    ...article,
    title: 'Ciência de Dados: como empresas transformam dados em vantagem competitiva — ilustrado',
    description:
      'Uma exploração de como empresas usam a Ciência de Dados para conquistar vantagens competitivas, com exemplos reais e aplicações práticas.',
    category: 'Ciência de Dados',
    readTime: '8 min de leitura',
  }
}
