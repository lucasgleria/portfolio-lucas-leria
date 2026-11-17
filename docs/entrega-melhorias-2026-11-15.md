# Entrega das melhorias — 15/11/2026

Situação conferida em 17/11/2026: implementação e dependências de produção aprovadas na validação remota. Next.js e `eslint-config-next` estão fixados em 15.5.29, com lockfile correspondente. O domínio de publicação é [portfolio-lucas-leria.vercel.app](https://portfolio-lucas-leria.vercel.app/), conectado à branch `main` pelo Vercel. O andamento de cada item está no [plano](plano-de-melhorias.md).

## Alterações implementadas

- Servidor padrão do Next.js, com `dev` e `start` portáveis. Removidos o servidor personalizado, o echo Socket.IO e dependências sem uso confirmado.
- Tipos estritos, incluindo `noImplicitAny`, Strict Mode, lint sem avisos, regra de dependências dos hooks e build sem ignorar erros. Lockfile e Node 24 definidos; workflow de CI preparado.
- Catálogo compartilhado pelos comandos, com categorias na fonte e entradas históricas diferenciadas. Os oito itens selecionados e seus estágios continuam preservados; nenhum projeto foi acrescentado como produção sem evidência.
- Histórico do Terminal corrigido: navegação por setas, restauração do rascunho, registro de `ler`, `clear` sem entrada residual e identificação individual de respostas assíncronas.
- Diálogos do Terminal migrados para o Radix existente, com título, descrição, fechamento por Escape, gestão de foco e controle de fechamento maior. Conteúdo sem a antiga barra lateral fixa; artigos e demonstrações não carregam em iframes.
- Português e inglês propagados a comandos, diálogos, solicitações do assistente e mensagens de erro. A origem local ou gerada com IA é identificada.
- Rotas `/visual`, `/terminal` e `/projects/<slug>`, com idioma na URL e HTML dos cases renderizado no servidor. O seletor inicial e a ordem idioma → interface foram mantidos.
- Canonical, idiomas alternativos, sitemap, robots e imagem PNG de compartilhamento. Domínio oficial confirmado pelo proprietário: `https://portfolio-lucas-leria.vercel.app/`.
- Cases recentes com problema, contribuição, decisões e próximo passo, sem inventar capturas, métricas ou demonstrações de produção.
- Cliente do assistente com prazo de 12 segundos, cancelamento, mensagens de erro e limite de entrada. Provedor com prazo de 8 segundos e orçamento de 12 gerações por minuto por processo. O modo local continua disponível sem credenciais.
- Interfaces e modais carregados sob demanda, tokens de fundo compartilhados, preferência por movimento reduzido e README atualizado.

## Verificações locais anteriores à atualização do framework

| Verificação | Resultado |
|---|---|
| `npm test` | **19 testes aprovados** |
| `npm run typecheck` | Aprovado, com tipos estritos |
| `npm run lint` | Aprovado, sem avisos |
| Build Next.js do artefato de prévia | Aprovado com tipos e lint ativos; executado separadamente |
| Início de produção no Windows | `npm start -- --hostname 127.0.0.1` aprovado, sem auxiliares de `tmp/` |
| Instalação limpa isolada | `npm ci --offline --ignore-scripts` aprovado com cache local; 379 pacotes instalados. Scripts de instalação não foram homologados por esse teste |
| HTTP em páginas localizadas | 18 verificações com HTTP 200: Visual e oito cases, em ambos os idiomas |
| Página inicial e Terminal | HTTP 200; ordem do seletor preservada |
| Canonical | Conferido com o domínio público oficial |
| Sitemap | HTTP 200; 22 URLs no domínio oficial |
| Robots e imagem social | HTTP 200; PNG válido |
| Assistente | Resposta local em EN/PT-BR; entrada acima do limite retorna 400 |
| Case inexistente | HTTP 404 |
| Navegador desktop | Visual, navegação até Terminal e abertura/fechamento do perfil com Escape observados |
| Suíte Playwright | 16 cenários de desktop/celular preparados e listados; **execução não aprovada**, bloqueada por `spawn EPERM` ao criar workers |
| Desenvolvimento com `next dev` | Bloqueado por `spawn EPERM`; recarga de desenvolvimento não homologada |
| Build padrão de publicação | Reprovado intencionalmente por `prebuild` enquanto o framework permanecer desatualizado |

Os comandos de teste, tipos, lint e build foram conferidos individualmente. A execução agregada encontrou restrições de processos filhos neste ambiente e não foi contada como aprovação adicional. A homologação posterior no CI está registrada abaixo.

O último controle do navegador foi interrompido pelo usuário com Escape; nenhuma outra interação com o computador foi realizada depois dessa interrupção.

## Validação remota em 15/11/2026

O [GitHub Actions](https://github.com/lucasgleria/portfolio-lucas-leria/actions/runs/43696484370) aprovou o conjunto final, commit `cbf2d6dbf03cfd61e565c0ff16c826e2430b47fb`, com:

- Instalação limpa completa por `npm ci`, incluindo scripts.
- `npm audit --omit=dev --audit-level=high`: **zero vulnerabilidades nas dependências de produção**.
- Next.js 15.5.29 aprovado pelo gate de segurança.
- 19 testes de base profissional, privacidade, API, catálogo, histórico e cliente do assistente.
- Tipos estritos e lint sem avisos.
- Build otimizado com o framework atualizado.
- 16 cenários Playwright aprovados: desktop e celular, idioma, navegação, filtros, modais, histórico, assistente, erros HTTP e rotas diretas.

A primeira execução identificou falha no retorno de foco do diálogo de projetos do Terminal. A correção passa a referência do campo de comando aos diálogos; a regressão também verifica artigos, perfil e chat. A prévia no Vercel foi construída com sucesso. Leitor de tela, zoom e Core Web Vitals continuam sem homologação específica.

A auditoria levou à fixação de PostCSS 8.5.33 e Sharp 0.35.5 por overrides, preservando o Next.js 15. O lockfile inclui o runtime opcional de WebAssembly do Sharp, conferido pela instalação limpa no Linux. As seis ocorrências moderadas restantes na auditoria completa pertencem às dependências de desenvolvimento e continuam como manutenção separada; não estão incluídas no resultado da auditoria de produção.

## Redução medida

| Medida | Antes | Depois |
|---|---:|---:|
| Dependências diretas de produção no manifesto | 71 | 16 |
| JavaScript da entrada inicial, somado com gzip | 158.460 bytes | 124.892 bytes |

Redução de **21,2%** no JavaScript medido da entrada inicial. Método: soma do gzip dos arquivos JavaScript listados para `/page` em `.next/app-build-manifest.json`, no mesmo ambiente. A medida exclui fontes e chunks adiados. LCP, INP, CLS e Lighthouse continuam sem medição.

## Pendências que impedem encerrar o plano

1. **Dependências de desenvolvimento:** revisar as seis ocorrências moderadas da auditoria completa. A auditoria de produção está aprovada; manter a verificação no CI e revisar os overrides junto das próximas atualizações do framework.
2. **M06 — Acessibilidade complementar:** os 16 cenários automatizados, incluindo retorno de foco e viewport móvel, foram aprovados. Zoom e leitor de tela continuam pendentes de inspeção específica.
3. **M09 — Limite global de IA:** substituir o orçamento em memória por controle compartilhado ou do provedor para múltiplas instâncias. Não foi configurada infraestrutura externa nesta tarefa.
4. **M10/M11 — Evidências e desempenho:** preparar capturas/demonstrações com dados fictícios, revisar links externos e medir Core Web Vitals em condições definidas.
5. **M03 — Desenvolvimento:** a instalação completa e o servidor de produção passaram no CI; recarga de desenvolvimento continua pendente de homologação fora das restrições locais.

O produto público vault-template permanece separado do vault privado. Os trabalhos excluídos pelo usuário continuam fora da seleção. Após esta entrega, Rendller foi incluído por solicitação de 17/11/2026, com seus links públicos autorizados pelo proprietário, sem importar registros financeiros; ver [revisão dos projetos](recent-projects-publication-review.md). Credenciais, arquivos temporários e relatórios privados de auditoria não integram a entrega.
