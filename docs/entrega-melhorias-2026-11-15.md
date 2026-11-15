# Entrega local das melhorias — 15/11/2026

Situação: implementação preparada para validação remota e publicação. Next.js e `eslint-config-next` foram fixados em 15.5.29, com lockfile correspondente. A instalação completa e as jornadas de navegador serão verificadas no CI antes da promoção para produção. O andamento de cada item está no [plano](plano-de-melhorias.md).

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

## Verificações realizadas

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

Os comandos de teste, tipos, lint e build foram conferidos individualmente. A execução agregada encontrou restrições de processos filhos neste ambiente e não foi contada como aprovação adicional. O workflow remoto ainda não foi executado.

O último controle do navegador foi interrompido pelo usuário com Escape; nenhuma outra interação com o computador foi realizada depois dessa interrupção.

## Redução medida

| Medida | Antes | Depois |
|---|---:|---:|
| Dependências diretas de produção no manifesto | 71 | 16 |
| JavaScript da entrada inicial, somado com gzip | 158.460 bytes | 124.892 bytes |

Redução de **21,2%** no JavaScript medido da entrada inicial. Método: soma do gzip dos arquivos JavaScript listados para `/page` em `.next/app-build-manifest.json`, no mesmo ambiente. A medida exclui fontes e chunks adiados. LCP, INP, CLS e Lighthouse continuam sem medição.

## Pendências que impedem encerrar o plano

1. **M01 — Homologar a atualização:** manifesto e lockfile agora fixam Next.js e `eslint-config-next` em [15.5.29](https://github.com/vercel/next.js/releases/tag/v15.5.29), usando metadados já armazenados pelo npm. Os módulos instalados no ambiente local ainda são 15.3.5; a instalação efetiva da versão corrigida será feita por `npm ci` no CI, com repetição de todas as verificações antes da promoção. O gate reprova a versão antiga e versões canary.
2. **M06/M12 — Homologar a jornada completa:** executar os 16 cenários de navegador em ambiente que permita workers; conferir a matriz móvel, zoom, leitor de tela e retorno de foco. A inspeção desktop não substitui essa homologação.
3. **M09 — Limite global de IA:** substituir o orçamento em memória por controle compartilhado ou do provedor para múltiplas instâncias. Não foi configurada infraestrutura externa nesta tarefa.
4. **M10/M11 — Evidências e desempenho:** preparar capturas/demonstrações com dados fictícios, revisar links externos e medir Core Web Vitals em condições definidas.
5. **M02/M03/M13 — Homologação externa:** executar CI remoto, instalação completa com scripts e recarga de desenvolvimento fora das restrições locais.

O produto público vault-template permanece separado do vault privado. Os trabalhos excluídos pelo usuário e Rendller continuam fora da seleção. A publicação em produção depende da aprovação da validação remota.
