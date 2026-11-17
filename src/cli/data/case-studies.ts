import type { ProfileLanguage } from './professional-profile'

type CaseStudy = { problem: string; contribution: string; decisions: string[]; nextStep: string }

// Editorial summaries of reviewed professional facts, not new claims of delivery or impact.
const caseStudies: Record<string, Record<ProfileLanguage, CaseStudy>> = {
  'vault-template': {
    en: {
      problem: 'Organizing tasks, projects and knowledge while preserving context between AI-agent sessions.',
      contribution: 'Authored and maintain the public, reusable vault structure and its operating contracts.',
      decisions: ['Open Markdown and JSON files make the product portable.', 'Shared instructions, templates and continuity records support resuming work.', 'Progressive setup adapts the structure to the intended use.'],
      nextStep: 'Copy the repository and configure it with an agent whose file-access tools and project instructions are enabled.',
    },
    'pt-BR': {
      problem: 'Organizar tarefas, projetos e conhecimento preservando contexto entre sessões de agentes de IA.',
      contribution: 'Autoria e manutenção da estrutura pública e reutilizável do vault e de seus contratos de operação.',
      decisions: ['Arquivos abertos em Markdown e JSON facilitam a portabilidade.', 'Instruções, modelos e registros de continuidade apoiam a retomada do trabalho.', 'A configuração progressiva adapta a estrutura à finalidade escolhida.'],
      nextStep: 'Copiar o repositório e configurar com um agente que tenha ferramentas de acesso a arquivos e instruções de projeto habilitadas.',
    },
  },
  'Rendller': {
    en: {
      problem: 'Organizing fixed-income investment lots, liquidity and maturities while comparing scenarios with explicit assumptions.',
      contribution: 'Full-stack development of the calculation engine, dashboards, simulator, local storage and synchronization workflows.',
      decisions: ['Domain calculations are separated from the React interface and covered by source-project tests.', 'Public CDI history and a holiday calendar support business-day calculations; projected values remain estimates.', 'Browser persistence and JSON backups support local operation, with optional encrypted synchronization.'],
      nextStep: 'Prepare an isolated demonstration with fictional records and revalidate synchronization between devices.',
    },
    'pt-BR': {
      problem: 'Organizar lotes de renda fixa, liquidez e vencimentos e comparar cenários com premissas explícitas.',
      contribution: 'Desenvolvimento full stack do motor de cálculo, painéis, simulador, armazenamento local e fluxos de sincronização.',
      decisions: ['Cálculos de domínio ficam separados da interface React e têm testes no projeto de origem.', 'Histórico público do CDI e calendário de feriados apoiam os cálculos em dias úteis; valores projetados continuam sendo estimativas.', 'Persistência no navegador e backup JSON permitem operação local, com sincronização cifrada opcional.'],
      nextStep: 'Preparar uma demonstração isolada com registros fictícios e revalidar a sincronização entre aparelhos.',
    },
  },
  'Treino IA': {
    en: {
      problem: 'Planning workouts and keeping session records available through connectivity changes.',
      contribution: 'Full-stack development of planning, local persistence, synchronization and AI Coach workflows.',
      decisions: ['IndexedDB keeps records available offline.', 'Account isolation and incremental reconciliation organize synchronization.', 'AI proposals require explicit acceptance before changing a plan.'],
      nextStep: 'Revalidate the current deployment and prepare demonstration materials with fictional records.',
    },
    'pt-BR': {
      problem: 'Planejar treinos e manter registros de sessões disponíveis mesmo com mudanças de conectividade.',
      contribution: 'Desenvolvimento full stack dos fluxos de planejamento, persistência local, sincronização e Coach IA.',
      decisions: ['IndexedDB mantém registros disponíveis offline.', 'Isolamento por conta e reconciliação incremental organizam a sincronização.', 'Propostas da IA exigem aceite explícito antes de alterar um plano.'],
      nextStep: 'Revalidar o deploy atual e preparar materiais de demonstração com registros fictícios.',
    },
  },
  'Classes Points': {
    en: {
      problem: 'Supporting classroom administration, point records and written and oral assessments from a mobile device.',
      contribution: 'Full-stack development of class management, assessment history and PDF-report workflows.',
      decisions: ['Server-rendered HTML keeps the browser interface direct.', 'Separate SQLite and PostgreSQL adapters support local and hosted environments.', 'Assessment history and weighted oral assessments reflect teaching workflows.'],
      nextStep: 'Improve PDF presentation and measure operation latency in an isolated demonstration environment.',
    },
    'pt-BR': {
      problem: 'Apoiar a gestão de turmas, pontos e avaliações escritas e orais pelo celular.',
      contribution: 'Desenvolvimento full stack dos fluxos de gestão de turmas, histórico de avaliações e relatórios PDF.',
      decisions: ['HTML renderizado no servidor mantém a interface direta no navegador.', 'Adaptadores SQLite e PostgreSQL atendem os ambientes local e hospedado.', 'Histórico e provas orais com pesos refletem os fluxos de ensino.'],
      nextStep: 'Melhorar o acabamento do PDF e medir a lentidão das operações em ambiente isolado de demonstração.',
    },
  },
}

export const getCaseStudy = (name: string, language: ProfileLanguage) => caseStudies[name]?.[language]
