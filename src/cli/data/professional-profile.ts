export type ProfileLanguage = 'en' | 'pt-BR'
type LocalizedText = Record<ProfileLanguage, string>

// Curated professional facts only. Raw vault notes never belong in this module.
export const professionalProfile = {
  reviewedAt: '2026-11-17',
  title: {
    en: 'Full-stack Development | Automation | Databases',
    'pt-BR': 'Desenvolvimento Full Stack | Automação | Bancos de Dados',
  },
  intro: {
    en: 'I’m Lucas, a developer with a degree in databases. I build web applications and practical automation tools, with experience in foreign-trade operations and freelance development.',
    'pt-BR':
      'Sou Lucas, desenvolvedor com graduação em Banco de Dados. Desenvolvo aplicações web e ferramentas de automação, com atuação em comércio exterior e desenvolvimento freelance.',
  },
  summary: {
    en: 'Developer with a degree in databases from Estácio de Sá and technical training in IT from ENIAC. My professional work includes freelance web development and foreign-trade operations. Recent products and technical cases include the public, reusable vault-template repository, Rendller, a fixed-income tracking and simulation application, Treino IA, a PWA with a documented published implementation, and Classes Points, with documented classroom use. I also develop local tools, including a supervised development-agent prototype and a document generator. I teach English and prepare learning materials. My current studies follow the BIX Technology track in data analysis and business intelligence; this is ongoing training, not a completed certification.',
    'pt-BR':
      'Desenvolvedor graduado em Banco de Dados pela Estácio de Sá, com formação técnica em TI pelo ENIAC. Minha atuação profissional inclui desenvolvimento web freelance e operações de comércio exterior. Os produtos e cases recentes incluem o repositório público e reutilizável vault-template, Rendller, aplicação para controle e simulação de renda fixa, Treino IA, PWA com implementação publicada documentada, e Classes Points, com uso docente documentado. Também desenvolvo ferramentas locais, como um protótipo supervisionado de central de agentes e um gerador de documentos. Atuo no ensino de inglês e na preparação de materiais didáticos. Atualmente estudo análise de dados e Business Intelligence na trilha BIX Technology; trata-se de formação em andamento, não de certificação concluída.',
  },
  roles: [
    {
      title: { en: 'Freelance web development', 'pt-BR': 'Desenvolvimento web freelance' },
      description: {
        en: 'Web applications, offline-first interfaces and practical automation tools.',
        'pt-BR': 'Aplicações web, interfaces com funcionamento offline e ferramentas de automação.',
      },
    },
    {
      title: { en: 'Foreign-trade operations', 'pt-BR': 'Operações de comércio exterior' },
      description: {
        en: 'Professional work in foreign trade, alongside software development.',
        'pt-BR':
          'Atuação profissional em comércio exterior, em paralelo ao desenvolvimento de software.',
      },
    },
    {
      title: { en: 'English teaching', 'pt-BR': 'Ensino de inglês' },
      description: {
        en: 'Preparation of lessons, teaching materials and oral assessments.',
        'pt-BR': 'Preparação de aulas, materiais didáticos e avaliações orais.',
      },
    },
  ],
  education: [
    {
      program: { en: 'Degree in Databases', 'pt-BR': 'Graduação em Banco de Dados' },
      institution: 'Estácio de Sá',
      status: 'completed',
    },
    {
      program: {
        en: 'Technical training in Information Technology',
        'pt-BR': 'Formação técnica em Tecnologia da Informação',
      },
      institution: 'ENIAC',
      status: 'completed',
    },
  ],
  learning: {
    provider: 'BIX Technology / Udemy',
    status: 'in-progress',
    description: {
      en: 'Current learning track in data analysis and business intelligence. Course completion and certifications have not been verified.',
      'pt-BR':
        'Trilha de estudos em análise de dados e Business Intelligence. A conclusão dos cursos e as certificações não foram verificadas.',
    },
    topics: [
      'Data Analysis and Data Culture',
      'QlikView',
      'Pentaho',
      'Qlik Sense',
      'Qlik NPrinting',
      'Qlik GeoAnalytics',
    ],
  },
  workHighlights: [
    {
      id: 'vault-template',
      title: { en: 'vault-template', 'pt-BR': 'vault-template' },
      status: {
        en: 'Published reusable repository; MIT license',
        'pt-BR': 'Repositório reutilizável publicado; licença MIT',
      },
      summary: {
        en: 'Public template for organizing projects, tasks and knowledge with an AI agent. The repository is the product, with conversational setup, reusable templates, shared instructions, schemas and continuity files. It can be copied to environments where the chosen agent has compatible file access and project-instruction support.',
        'pt-BR':
          'Template público para organizar projetos, tarefas e conhecimento com um agente de IA. O repositório é o produto, com configuração por conversa, modelos reutilizáveis, instruções compartilhadas, esquemas e arquivos de continuidade. Pode ser copiado para ambientes nos quais o agente escolhido tenha acesso compatível aos arquivos e suporte às instruções de projeto.',
      },
      technologies: ['Markdown', 'JSON Schema', 'Python', 'Git'],
      sourceIds: ['P01', 'P02'],
    },
    {
      id: 'rendller',
      title: { en: 'Rendller', 'pt-BR': 'Rendller' },
      status: {
        en: 'Published implementation documented; current production not revalidated',
        'pt-BR': 'Implementação publicada documentada; produção atual não revalidada',
      },
      summary: {
        en: 'Fixed-income tracking and simulation application with a configurable calculation engine, liquidity and maturity views, local browser storage, backups and optional encrypted synchronization. This technical case includes no real financial records or external repository links.',
        'pt-BR': 'Aplicação para controle e simulação de renda fixa, com motor de cálculo configurável, visões de liquidez e vencimentos, armazenamento no navegador, backups e sincronização cifrada opcional. O case técnico não inclui registros financeiros reais nem links externos para o repositório.',
      },
      technologies: ['React 19', 'TypeScript', 'Vite', 'Supabase', 'Netlify', 'Recharts', 'Web Crypto'],
      sourceIds: ['P03', 'P04'],
    },
    {
      id: 'treino-ia',
      title: {
        en: 'Treino IA',
        'pt-BR': 'Treino IA',
      },
      status: {
        en: 'Published implementation documented in October 2026; current production not revalidated',
        'pt-BR': 'Implementação publicada documentada em outubro de 2026; produção atual não revalidada',
      },
      summary: {
        en: 'Workout-planning PWA with deterministic plans, session tracking, offline IndexedDB persistence and account synchronization. AI Coach changes require explicit user acceptance. This case describes software only, without real user records or a public demo.',
        'pt-BR':
          'PWA para planejamento de treinos com planos determinísticos, registro de sessões, persistência offline em IndexedDB e sincronização por conta. Alterações propostas pelo Coach IA exigem aceite explícito. O case descreve somente o software, sem registros reais nem demonstração pública.',
      },
      technologies: ['React 19', 'TypeScript', 'Vite', 'Supabase', 'IndexedDB', 'Vercel'],
      sourceIds: ['V11', 'V12'],
    },
    {
      id: 'classes-points',
      title: { en: 'Classes Points', 'pt-BR': 'Classes Points' },
      status: {
        en: 'Classroom use documented in October 2026; current production not revalidated',
        'pt-BR': 'Uso docente documentado em outubro de 2026; produção atual não revalidada',
      },
      summary: {
        en: 'Mobile-focused application for class management, points, written and weighted oral assessments, history and PDF reports. PDF presentation and operation latency remain open improvements. The public case excludes the teacher panel and real classroom records.',
        'pt-BR':
          'Aplicação com foco no celular para gestão de turmas, pontos, avaliações escritas e orais com pesos, histórico e relatórios PDF. Acabamento do PDF e lentidão nas operações seguem como melhorias pendentes. O case público exclui o painel do professor e registros reais de turmas.',
      },
      technologies: ['Node.js 24', 'Express 5', 'JavaScript', 'PostgreSQL', 'SQLite', 'Vercel'],
      sourceIds: ['V13', 'V14'],
    },
    {
      id: 'development-agent-coordinator',
      title: {
        en: 'Supervised development-agent coordinator',
        'pt-BR': 'Central supervisionada de agentes de desenvolvimento',
      },
      status: {
        en: 'Validated prototype; human supervision required',
        'pt-BR': 'Protótipo validado; requer supervisão humana',
      },
      summary: {
        en: 'Local task coordination for development agents using a supervised queue, quota and file-conflict checks, execution deadlines and evidence of delivery. Includes automated tests and a monitoring dashboard.',
        'pt-BR':
          'Coordenação local de agentes de desenvolvimento com fila supervisionada, checagem de cotas e conflitos de arquivos, prazos de execução e evidências de entrega. Inclui testes automatizados e painel de acompanhamento.',
      },
      technologies: ['Python', 'WSL', 'tmux', 'Claude Code', 'Codex'],
      sourceIds: ['V05'],
    },
    {
      id: 'local-document-generator',
      title: {
        en: 'Local freelance document generator',
        'pt-BR': 'Gerador local de documentos freelance',
      },
      status: { en: 'Local tool implemented', 'pt-BR': 'Ferramenta local implementada' },
      summary: {
        en: 'Offline browser tool that generates documents from a shared form, with live preview, print-to-PDF and JSON import/export. Real client records are not part of the portfolio.',
        'pt-BR':
          'Ferramenta offline no navegador que gera documentos a partir de um formulário, com prévia, impressão em PDF e importação/exportação em JSON. Registros reais de clientes não fazem parte do portfólio.',
      },
      technologies: ['HTML', 'CSS', 'JavaScript', 'JSON'],
      sourceIds: ['V06', 'V07'],
    },
  ],
  practices: {
    en: [
      'Choose native features before adding automation tools.',
      'Separate implemented functionality from prototypes and study plans.',
      'Use automated checks and evidence to review delivery.',
      'Keep client records, credentials and private operational details out of portfolio content.',
    ],
    'pt-BR': [
      'Priorizar recursos nativos antes de adicionar ferramentas de automação.',
      'Distinguir funcionalidades implementadas de protótipos e planos de estudo.',
      'Revisar entregas com verificações automatizadas e evidências.',
      'Manter registros de clientes, credenciais e detalhes operacionais privados fora do conteúdo do portfólio.',
    ],
  },
} satisfies {
  reviewedAt: string
  title: LocalizedText
  intro: LocalizedText
  summary: LocalizedText
  roles: { title: LocalizedText; description: LocalizedText }[]
  education: { program: LocalizedText; institution: string; status: 'completed' }[]
  learning: {
    provider: string
    status: 'in-progress'
    description: LocalizedText
    topics: string[]
  }
  workHighlights: {
    id: string
    title: LocalizedText
    status: LocalizedText
    summary: LocalizedText
    technologies: string[]
    sourceIds: string[]
  }[]
  practices: Record<ProfileLanguage, string[]>
}
