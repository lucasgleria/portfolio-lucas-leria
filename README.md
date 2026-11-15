# Portfólio de Lucas Leria

Portfólio em Next.js, React e TypeScript, com escolha de idioma (English / Português brasileiro) e duas interfaces: Visual e Terminal. A identidade escura com destaque verde é compartilhada entre os caminhos.

- [Plano de melhorias e situação das entregas](docs/plano-de-melhorias.md)
- [Política da base profissional](docs/professional-data-policy.md)
- [Revisão dos projetos para publicação](docs/recent-projects-publication-review.md)

## Executar localmente

Use Node.js 24, conforme `.nvmrc`, e npm. A instalação limpa precisa de acesso ao registro npm ou de um cache completo das dependências.

```sh
npm ci
npm run dev
```

Abra `http://localhost:3000`. Para conferir a versão de produção:

```sh
npm run build:preview
npm start
```

No PowerShell, use `npm.cmd` se a política local impedir a execução de `npm.ps1`. Os scripts não dependem de atribuição de variáveis em sintaxe POSIX, nodemon, Socket.IO ou auxiliares de `tmp/`. `PORT` pode ser definido pelo ambiente de hospedagem; os comandos padrão também aceitam `-- -p 3001`.

## Rotas e idiomas

| Rota | Conteúdo |
|---|---|
| `/` | Seleção de idioma e interface |
| `/visual?lang=pt-BR` | Portfólio visual em português |
| `/terminal?lang=en` | Terminal em inglês |
| `/projects/<slug>?lang=pt-BR` | Página direta de um projeto |
| `/robots.txt` | Instruções de indexação |
| `/sitemap.xml` | URLs públicas do domínio oficial |
| `/opengraph-image` | Imagem de compartilhamento gerada pelo projeto |

A escolha de idioma é salva localmente quando o navegador permite. Links diretos preservam o idioma na URL. O seletor continua disponível; voltar, avançar e atualizar usam rotas reais. As páginas dos projetos são renderizadas no servidor.

No Terminal, `help` lista os comandos. Os nomes continuam em inglês, com apresentação em português ou inglês. `projects` e os comandos de categoria usam o mesmo catálogo. `production` apresenta produtos, cases e projetos selecionados; nem todo item possui demo hospedada. As setas percorrem os comandos e restauram o rascunho de entrada; `clear` limpa a saída.

## Assistente Ler

O assistente funciona **sem credenciais**, com respostas a partir da base profissional revisada. Para habilitar geração externa, copie `.env.example` para `.env.local` e configure os dois campos opcionais:

```dotenv
GOOGLE_API_KEY=
GOOGLE_MODEL=
```

Não inclua segredos no Git. A interface informa se a resposta é local ou gerada com IA. Perguntas privadas são recusadas antes de chamar o provedor. O limite é de 2000 caracteres; o servidor limita a geração a 8 segundos e o cliente espera no máximo 12 segundos. Erros do provedor usam a resposta local.

Há um orçamento de 12 gerações externas por minuto **por processo de servidor**, sem confiar em IPs fornecidos pelo cliente. Para hospedar várias instâncias, substituir esse orçamento por controle compartilhado ou do provedor antes de prometer uma cota global. O perfil local não consome esse orçamento.

## Verificações e publicação

```sh
npm test
npm run typecheck
npm run lint
npm run build:preview
npm run build
npm run check
npm run test:e2e
npm run security:framework
npm run release:check
```

`check` executa testes, tipos, lint sem avisos e build de prévia. Os builds não ignoram falhas de tipos ou lint; Strict Mode está ativo. O comando padrão `build` também executa o gate de segurança por `prebuild`, protegendo a publicação padrão no Vercel. `build:preview` permite revisar o artefato sem aprovar sua publicação. O workflow `.github/workflows/verify.yml` faz instalação limpa, audita dependências de produção, verifica o framework e executa `release:check`, incluindo as jornadas de navegador.

Next.js e `eslint-config-next` estão fixados em **15.5.29**, com lockfile atualizado. Essa versão atende à referência de segurança revisada em 15/11/2026 ([release oficial](https://github.com/vercel/next.js/releases/tag/v15.5.29)). O CI faz instalação limpa, verifica o framework, executa testes, tipos, lint, build e jornadas de navegador antes de promover a entrega. Os avisos vigentes devem ser conferidos novamente nas próximas atualizações. Ver [política de suporte](https://nextjs.org/support-policy).

Os `overrides` de PostCSS **8.5.33** e Sharp **0.35.5** corrigem alertas nas dependências transitivas, preservando o Next.js 15. A compatibilidade é conferida pelo build e pelas jornadas de navegador. Rever os overrides junto das próximas atualizações do framework; o CI bloqueia vulnerabilidades de produção classificadas como altas ou críticas pelo npm.

Canonical, sitemap e metadados absolutos usam o domínio oficial confirmado pelo proprietário. Para substituir esse endereço em outro ambiente, configure no build e na execução:

```dotenv
SITE_URL=https://portfolio-lucas-leria.vercel.app
```

Sem `SITE_URL`, o padrão é `https://portfolio-lucas-leria.vercel.app/`. A prévia local pode usar `http://127.0.0.1:3000`. A versão hospedada deve usar o endereço público definitivo.

A suíte `test:e2e` cobre desktop e celular com Playwright e usa respostas locais ou simuladas para a IA. Após instalar dependências, execute `npx playwright install chromium` uma vez. O CI instala o navegador e suas dependências. O ambiente precisa permitir processos filhos; uma falha `spawn EPERM` impede a execução da suíte e não conta como aprovação dos testes.

## Conteúdo e manutenção

- `src/cli/data/productionProjects.ts`: catálogo selecionado e categorias. `seo` é o identificador usado nas rotas.
- `src/components/portfolio/content.ts`: traduções e apresentação dos dados.
- `src/cli/data/project-catalog.ts`: catálogo compartilhado, incluindo entradas históricas sem afirmar publicação atual.
- `src/cli/data/professional-profile.ts`: fatos profissionais revisados.
- `src/cli/data/case-studies.ts`: problema, contribuição, decisões e próximo passo dos cases recentes.
- `src/lib/professional-knowledge.ts`: contexto e respostas locais do assistente.
- `tests/professional-knowledge.test.mjs`: privacidade, dados, API, catálogo, histórico e cliente do assistente.

Atualize fatos e fontes antes de alterar afirmações de experiência ou impacto. Preserve as exclusões definidas na política profissional. O produto público `vault-template` é separado do vault privado. Demonstrações e capturas devem usar dados fictícios. Relatórios privados de revisão ficam em `tmp/`, que é ignorado pelo Git.

Os diálogos usam o Radix já instalado, com fechamento por Escape e gestão de foco. Artigos e demonstrações abrem nas plataformas de origem; o site não carrega esses iframes durante a navegação. Fontes, modais e interfaces devem ser avaliados no ambiente real de publicação antes de afirmar resultados de desempenho ou acessibilidade.

## Licença

Distribuído sob licença MIT. Consulte [LICENSE](LICENSE).
