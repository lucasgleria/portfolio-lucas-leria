# Análise e plano de melhorias do portfólio

Análise inicial: **14/11/2026**. Implementação local: **15/11/2026**. Estado: **em execução, com pendências de ambiente e segurança**. Consulte [a entrega e as verificações](entrega-melhorias-2026-11-15.md).

Objetivo: tornar o portfólio mais confiável para quem avalia o trabalho de Lucas, mais fácil de navegar e mais simples de manter. Preservar a escolha de idioma antes das interfaces, os caminhos Visual e Terminal e a identidade escura com destaque verde.

## Base da análise inicial (antes das alterações)

Foram revisados o código local, a configuração, os dados profissionais, os comandos, os modais, a API do assistente, os testes e a documentação. Foram feitas requisições à versão local de produção em `localhost:3000` e consultadas fontes oficiais do Next.js.

Ambiente observado: Node **24.18.0**, Next.js **15.3.5**, React instalado **19.3.1**. O catálogo selecionado tem **8 projetos/produtos/cases**, incluindo vault-template, Treino IA e Classes Points.

| Verificação executada nesta revisão | Resultado |
|---|---|
| `npm.cmd run test:profile` | 12 testes aprovados |
| `node node_modules/typescript/bin/tsc --noEmit --incremental false` | Aprovado |
| `npm.cmd run lint -- --dir src` | Sem erros; um aviso preexistente em `src/hooks/use-toast.ts:21` |
| `GET /` e `GET /api/health` | HTTP 200 |
| HTML inicial de `/` | Contém a escolha de interface; não contém Treino IA nem a seção de projetos |
| Canonical e imagem Open Graph no HTML inicial | Ausentes |
| `GET /robots.txt` e `GET /sitemap.xml` | HTTP 404 |
| Pergunta `vault-template` à API sem `language` | HTTP 200, resposta local em inglês |
| `npm.cmd start` no Windows | Falha: `NODE_ENV` não é reconhecido como comando |

O build da implementação anterior foi aprovado; não foi repetido nesta revisão documental. O servidor local já estava iniciado pelo auxiliar de execução usado no desenvolvimento anterior. Isso não comprova que o script oficial de início funciona.

**Limites:** o acesso automatizado ao navegador estava indisponível. Não foram realizados testes visuais interativos, em celular real, leitor de tela, Lighthouse ou medições de Core Web Vitals. A análise de layout e de teclado abaixo parte do código; os critérios de aceite incluem a validação prática pendente. Não foi auditado o deploy externo nem executado qualquer teste de exploração de vulnerabilidades.

## O que preservar

- `PortfolioShell` compartilha estrutura, navegação, idioma e identidade entre as interfaces.
- A interface visual já tem busca normalizada, filtros, contagem anunciada e detalhes de projeto com Radix Dialog.
- A base profissional revisada distingue publicação documentada, uso, protótipos e estudos em andamento.
- O assistente tem resposta local, validação de entrada e proteção de informações privadas antes de chamar o provedor.
- Links opcionais permitem apresentar cases sem inventar demonstrações; vault-template está corretamente apresentado como produto distribuído pelo repositório público.
- Os testes atuais protegem a curadoria e as exclusões de projetos. Devem acompanhar as mudanças futuras.

## Prioridades e ordem de execução

P0: corrigir antes de uma nova publicação. P1: confiabilidade e jornada principal. P2: clareza, manutenção e otimização. Esforços relativos: **P** pequeno, **M** médio, **G** grande; não são compromissos de prazo.

| ID | Prioridade | Melhoria | Esforço | Dependência |
|---|---|---|---|---|
| M01 | P0 | Atualizar Next.js para uma versão corrigida e suportada | M | Nenhuma |
| M02 | P1 | Restaurar verificações obrigatórias e instalação reproduzível | M | M01 |
| M03 | P1 | Corrigir início local e simplificar o servidor | M | M01 |
| M04 | P1 | Unificar catálogo, descrições e contatos | M | Nenhuma |
| M05 | P1 | Corrigir histórico e execução dos comandos | P | Nenhuma |
| M06 | P1 | Tornar modais acessíveis e utilizáveis no celular | M | Nenhuma |
| M07 | P1 | Completar idioma da jornada e do assistente | M | M04 |
| M08 | P1 | Criar URLs compartilháveis e conteúdo indexável | G | M01, M04 |
| M09 | P1 | Limitar espera e consumo da API do assistente | M | M01 |
| M10 | P2 | Transformar projetos recentes em cases demonstráveis | M | M04 |
| M11 | P2 | Medir e reduzir o carregamento inicial | M | M03, M08 |
| M12 | P2 | Cobrir as jornadas principais com testes de navegador | M | M02; acompanhar M05–M09 |
| M13 | P2 | Atualizar documentação e consolidar estilos | M | M03, M04, M06 |

### M01 — Atualização de segurança do framework

**Evidência:** `package.json` fixa Next.js 15.3.5, também instalado localmente. Essa versão antecede as correções indicadas no [aviso oficial CVE-2025-66478](https://nextjs.org/blog/CVE-2025-66478), relativo ao App Router/RSC. Há correções posteriores no [aviso de dezembro de 2025](https://nextjs.org/blog/security-update-2025-12-11); aplicar somente o primeiro patch histórico não define um alvo atualizado. A inclusão na faixa afetada vem da versão e do aviso, sem comprovar incidente neste ambiente.

**Ação:** escolher uma release corrigida de uma linha atualmente suportada, verificando os avisos vigentes na execução; alinhar `eslint-config-next` e a compatibilidade com React e Node. Separar a correção de segurança de uma eventual migração maior. Consultar a [política oficial de suporte](https://nextjs.org/support-policy).

**Aceite:** dependências resolvidas registradas; análise dos avisos aplicáveis; testes, tipos, lint e build aprovados; escolha de idioma, interfaces e API funcionando em uma prévia. A publicação final deve usar o artefato corrigido.

### M02 — Verificações que realmente bloqueiem regressões

**Evidência:** [next.config.ts](../next.config.ts) usa `ignoreBuildErrors: true`, `ignoreDuringBuilds: true` e desliga Strict Mode. O [ESLint](../eslint.config.mjs) desativa várias regras, incluindo dependências de hooks. A cópia local não contém workflow de CI; `.gitignore` ignora `package-lock.json`, embora exista um lockfile local.

**Ação:** criar um comando de verificação com testes, tipos, lint e build; remover os bypasses após corrigir os problemas encontrados; reativar regras gradualmente. Definir uma versão de Node e versionar o lockfile do gerenciador escolhido. Preparar CI que execute instalação reproduzível e verificações.

**Aceite:** instalação limpa com `npm ci`; um erro de tipo ou teste impede a aprovação; aviso atual removido; CI verifica os mesmos comandos usados localmente. Reativação de Strict Mode acompanhada de teste dos efeitos, sem apenas esconder avisos.

### M03 — Execução local e hospedagem previsíveis

**Evidência da análise inicial:** `npm.cmd start` falhou no Windows por usar `NODE_ENV=production` como comando. Os antigos `server.ts` e `src/lib/socket.ts` fixavam a porta 3000 e forneciam um echo Socket.IO, sem consumidor encontrado no frontend. Esses arquivos foram removidos na implementação de M03. A configuração inicial também ignorava os arquivos no watcher e usava nodemon. O Next.js já fornece servidor integrado; um [servidor personalizado](https://nextjs.org/docs/app/guides/custom-server) precisa de uma necessidade concreta.

**Ação:** avaliar a remoção do servidor de echo e adotar os comandos padrão do Next.js se não houver funcionalidade que dependa dele. Se o servidor personalizado permanecer, tornar os scripts portáveis, respeitar `PORT` e documentar sua necessidade. Confirmar atualização automática de código no desenvolvimento.

**Aceite:** instalação, desenvolvimento, build e início de produção funcionam pelos scripts oficiais no Windows e no ambiente de hospedagem escolhido, sem arquivos em `tmp/`; edição de componente atualiza a página; porta configurável. Não remover integrações usadas sem verificar suas referências.

### M04 — Um catálogo coerente em todas as superfícies

**Evidência:** [productionProjects.ts](../src/cli/data/productionProjects.ts) e [professional-profile.ts](../src/cli/data/professional-profile.ts) já usam fatos revisados. Porém [ai-projects.ts](../src/cli/commands/ai-projects.ts), [web-projects.ts](../src/cli/commands/web-projects.ts) e outros comandos mantêm listas e afirmações próprias, sem os produtos recentes. O help ainda promete somente demos no comando `production`. Há contatos repetidos nos rodapés dos modais que divergem da fonte compartilhada.

**Ação:** definir IDs estáveis e uma fonte para categoria, estágio, conteúdo traduzido, links e data de revisão. Gerar a visualização e os comandos a partir dela; manter projetos antigos válidos sem tratá-los automaticamente como produção. Centralizar os canais profissionais em `portfolioData`.

**Aceite:** nomes, tecnologias, estágios e contagens concordam entre interface, comandos e assistente; vault-template é encontrado como produto publicado; Treino IA e Classes Points mantêm seus limites documentados; todo contato usa a mesma fonte. Novos projetos não exigem atualizar várias listas manualmente.

### M05 — Histórico e comportamento do Terminal

**Evidência:** em [CLI.tsx](../src/cli/components/CLI.tsx), o efeito nas linhas 239–244 reinicia `historyIndex` quando o próprio atalho muda o índice e o input. O caminho assíncrono de `ler` retorna antes do registro em `commandHistory`. O comando `clear` esvazia a saída pelo handler, mas o executor acrescenta outra entrada em seguida. São problemas identificados no fluxo do código, com reprodução visual ainda pendente.

**Ação:** separar digitação manual de navegação do histórico, registrar comandos por um único caminho e definir como `clear` deve funcionar. Preservar o texto temporário e a ordem de respostas de pedidos assíncronos.

**Aceite:** executar `about`, `skills` e `projects`; subir e descer percorre todos em ordem e recupera o rascunho inicial. `ler` entra no histórico; `clear` deixa a área sem entrada residual; pedidos simultâneos não trocam suas respostas. Implementar autocomplete somente se for mantido como promessa no README.

### M06 — Modais acessíveis e layout móvel

**Evidência:** os quatro modais do Terminal são overlays manuais, sem a estrutura de diálogo e gestão de foco já usada no [ProjectCard](../src/components/portfolio/ProjectCard.tsx). Fechar depende de pequenos botões `w-3 h-3`. Há barras laterais `w-72 sm:w-80` ao lado da área principal mesmo em telas pequenas. Em ArticlesModal, cards clicáveis ainda são `div`.

**Ação:** reutilizar o Dialog existente para foco inicial, contenção de foco, Escape, título e retorno ao acionador. Dar nomes acessíveis aos controles e tornar cards operáveis por teclado. No celular, empilhar ou recolher detalhes, garantindo espaço ao conteúdo. Respeitar preferência por movimento reduzido nas rolagens e animações; medir contraste dos textos menores.

**Aceite:** abrir, navegar e fechar todos os modais só com teclado; o fundo não recebe foco; o foco retorna ao botão de origem. Conferir 320, 390, 768 e 1280 px, zoom de 200% e leitor de tela. Conteúdo sem corte ou rolagem horizontal inesperada; controles de fechamento com área de toque confortável, buscando 44 × 44 px como alvo de design.

### M07 — Idioma consistente até a resposta

**Evidência:** [CLI.tsx](../src/cli/components/CLI.tsx) e [LerChatModal.tsx](../src/cli/components/LerChatModal.tsx) enviam somente `message`, embora a API aceite `language`. A pergunta neutra `vault-template` sem idioma recebeu resposta em inglês. Os modais não recebem o idioma selecionado e vários textos permanecem fixos em inglês; a interface já informa essa limitação dos comandos.

**Ação:** propagar o idioma para requests e modais e centralizar mensagens de espera, erro e ajuda. Os identificadores dos comandos podem continuar em inglês; traduzir sua apresentação e resultados progressivamente. Mostrar se a resposta vem da base local ou de geração por IA, aproveitando `source` retornado pela API.

**Aceite:** selecionar PT-BR e perguntar `vault-template` ou `Classes Points` mantém a resposta em português; selecionar EN mantém inglês. Estados de erro, carregamento e modais usam o idioma escolhido. O modo local não é anunciado como geração por IA. Preservar funcionamento sem localStorage.

### M08 — Links diretos, descoberta e compartilhamento

**Evidência:** [page.tsx](../src/app/page.tsx) guarda a interface apenas em estado React. O HTML inicial contém a escolha, sem projetos; recarregar uma interface volta ao seletor. [layout.tsx](../src/app/layout.tsx) tem descrição genérica e URL Open Graph vazia. No servidor local não há canonical, imagem social, robots ou sitemap.

**Ação:** manter o seletor e oferecer rotas diretas para as interfaces e os projetos. Renderizar no servidor o conteúdo público necessário à leitura e descoberta. Definir metadados por página/idioma, URL canônica, imagem social e sitemap com o domínio real configurado, sem inventá-lo. Usar o campo `seo` ou IDs estáveis para URLs.

**Aceite:** abrir um link de projeto numa nova aba mostra o case correto; atualizar e usar voltar/avançar preserva a navegação esperada. Projetos selecionados aparecem no HTML da rota pública correspondente. Canonical, título, descrição, idioma e prévia social são coerentes; robots e sitemap respondem corretamente. Não é necessário eliminar a tela de escolha para alcançar esses resultados.

### M09 — Assistente com limites e falhas compreensíveis

**Evidência:** a [API](../src/app/api/ler/route.ts) já valida mensagem e recusa dados privados, mas não implementa um limite de frequência nem um prazo explícito para o provedor. Os clientes não verificam `response.ok`, não limitam o input a 2000 caracteres e não cancelam a espera ao fechar. Isso importa especialmente quando o provedor pago está configurado; não foi observado abuso real.

**Ação:** definir prazo máximo de geração e de espera do cliente, tratar cancelamento e erros HTTP, alinhar limites do input e controlar frequência/custo por mecanismo adequado à hospedagem. Manter resposta local e recusa de informação privada. Não registrar perguntas ou payloads do provedor.

**Aceite:** testar entrada inválida, limite de tamanho, excesso de chamadas, erro HTTP, provedor lento e indisponível. A interface sai do carregamento em tempo limitado; retornos de limitação têm mensagem útil e `Retry-After` quando aplicável; recusa de dados privados ocorre antes do provedor; funcionamento sem credenciais preservado.

### M10 — Cases com evidência do trabalho

**Evidência:** os cards usam numeração e ícones de categoria, e os recentes apresentam descrições técnicas sem demonstração pública. Isso é uma base correta, mas oferece pouco material para avaliar a experiência e as decisões do produto.

**Ação:** preparar para os três projetos recentes uma apresentação curta com problema, contribuição de Lucas, decisões, resultado verificável e próximo passo. Adicionar capturas ou uma demonstração curta com dados fictícios, quando apropriado; para vault-template, ilustrar configuração e retomada. Verificar o currículo externo, as demos antigas e os links de artigos antes de promovê-los. Separar link de leitura do artigo e URL de incorporação.

**Aceite:** cada case recente permite entender o valor em poucos parágrafos e tem pelo menos uma evidência sanitizada ou acesso ao produto público. Links conferidos com data de revisão. Não publicar métricas de desempenho, conclusão ou impacto sem medição/evidência. Materiais nunca incluem usuários reais, registros de turma ou dados de contas.

### M11 — Carregamento proporcional à interface escolhida

**Evidência:** [page.tsx](../src/app/page.tsx) importa estaticamente as duas interfaces; o CLI importa os modais de forma estática. Isso sugere uma oportunidade de divisão de código, não uma lentidão medida. O pacote declara várias dependências sem uso encontrado nas superfícies revisadas; presença no `package.json` não comprova inclusão no bundle.

**Ação:** medir bundle e Core Web Vitals antes de otimizar; carregar Terminal, chat e conteúdo pesado sob demanda quando adequado. Rever dependências realmente não usadas após análise completa e tornar a política de iframes explícita, com acesso externo como alternativa. Não carregar demos de terceiros antes da escolha do visitante.

**Aceite:** registrar comparação antes/depois no mesmo ambiente e perfil de rede; demonstrar a retirada de código adiado do caminho inicial; nenhuma regressão de navegação, layout ou foco. Medir LCP, INP e CLS; não atribuir nota Lighthouse ou ganho percentual sem executar a medição.

### M12 — Testes das jornadas, além da base de conteúdo

**Evidência:** os 12 testes existentes cobrem dados, privacidade, API, handlers e parte do HTML renderizado. Não há suíte de navegador na cópia local para verificar foco, histórico, troca de interface, idioma e uso móvel.

**Ação:** manter a suíte atual e acrescentar testes das jornadas que podem quebrar com M05–M09. Rodar localmente e no CI; isolar chamadas externas e testar o fallback do assistente sem credenciais.

**Aceite:** cobertura de escolha de idioma/interface, busca por acentos, filtros e estado vazio, abrir/fechar detalhes por teclado, histórico do Terminal, recarga de URL direta e erros do chat. Ao menos um tamanho móvel e um desktop. A regressão correspondente faz o teste falhar; evitar testes que apenas repetem a implementação.

### M13 — Documentação e estilos sustentáveis

**Evidência:** o [README](../README.md) ainda descreve somente o Terminal, promete autocomplete, exige chave Gemini e manda copiar `.env.example`, que não existe localmente. Há scripts Prisma sem schema encontrado. A pasta inteira `public` é ignorada. As cores reais do portfólio são repetidas em componentes, enquanto os tokens globais continuam genéricos.

**Ação:** documentar os fluxos atuais, instalação limpa, scripts portáveis, idioma, modos e uso opcional da IA. Oferecer exemplo de configuração sem segredos. Rever scripts e regras do `.gitignore`; permitir os assets públicos necessários sem expor arquivos privados. Consolidar tokens da paleta e componentes comuns sem redesenhar a identidade já adotada.

**Aceite:** outra pessoa consegue seguir o README em uma cópia limpa; todos os comandos e arquivos citados existem. Dependências e scripts têm finalidade confirmada. Novos componentes usam as mesmas cores, estados de foco e espaçamentos. Assets previstos são incluídos na entrega; arquivos privados continuam excluídos.

## Sequência sugerida de entregas

1. **Base confiável:** M01 → M02 → M03. Concluir atualização de segurança, verificações e execução oficial antes da próxima publicação.
2. **Jornada coerente:** M04, M05 e M06; depois M07 e M09. Iniciar M12 junto das correções para registrar regressões concretas.
3. **Apresentação pública:** M08 → M10 → M11; concluir M12 e M13 antes de divulgar a versão revisada.

## Restrições que acompanham todas as entregas

- [ ] Manter o produto público vault-template separado do vault privado.
- [ ] Preservar a exclusão dos trabalhos da Ricco, incluindo versões anônimas.
- [ ] Preservar a inclusão do Rendller como case técnico solicitada em 17/11/2026, sem registros financeiros. Links externos dependem de revisão separada de privacidade; não copiar evidências privadas para o portfólio ou seu plano.
- [ ] Usar somente informações profissionais verificáveis e materiais de demonstração sanitizados.
- [ ] Diferenciar produto publicado, publicação documentada, uso documentado, ferramenta local e protótipo.
- [ ] Preservar resposta local do assistente e os testes atuais de privacidade.

## Critério para concluir uma entrega

Registrar o ID do item atendido, arquivos alterados, critérios de aceite cumpridos, verificações executadas e limitações remanescentes. Conferir o escopo do diff. Publicar apenas o conjunto validado; não marcar itens deste plano como concluídos somente por estarem descritos ou parcialmente implementados.

## Execução em 15/11/2026, revisada em 17/11/2026

Os diagnósticos e as referências de linhas acima descrevem a revisão inicial, não o código após a implementação.

| Item | Situação atual | Evidência / restante |
|---|---|---|
| M01 | Implementado e verificado no CI | Next.js e `eslint-config-next` fixados em 15.5.29, com lockfile correspondente. Instalação limpa, gate, testes e build aprovados no CI. O `prebuild` continua protegendo a publicação contra versões antigas. |
| M02 | Implementado e verificado no CI | Tipos estritos, lint sem avisos, build sem bypasses, lockfile e CI. Instalação limpa completa e `release:check` aprovados no GitHub Actions. |
| M03 | Implementado; desenvolvimento pendente de ambiente | `npm start` funciona no Windows, com servidor padrão. Servidor de echo, dependências e scripts sem uso removidos. `next dev` é bloqueado por `spawn EPERM` neste ambiente; recarga de desenvolvimento não homologada. |
| M04 | Implementado e verificado localmente | Catálogo compartilhado, categorias na fonte, arquivo histórico explícito, contagens e contatos coerentes. |
| M05 | Implementado e verificado por regressão | Navegação do histórico e rascunho, `ler` registrado, `clear` sem resíduo e respostas associadas a IDs próprios. Histórico conferido no navegador em desktop e celular. |
| M06 | Implementado; acessibilidade complementar pendente | Radix compartilhado, alvo de fechamento maior e estrutura móvel sem barras laterais fixas. Abertura, Escape, retorno de foco e viewport móvel aprovados no CI; zoom e leitor de tela ainda sem inspeção específica. |
| M07 | Implementado e verificado localmente | Idioma propagado ao assistente, comandos, diálogos e erros; resposta local identificada. |
| M08 | Implementado e verificado por HTTP | Rotas diretas e HTML dos cases, metadados e domínio oficial confirmado pelo usuário, robots, sitemap e imagem social. |
| M09 | Parcial | Prazo máximo, cancelamento, erros HTTP, limites de entrada e orçamento de IA por processo. Controle global para múltiplas instâncias continua pendente. |
| M10 | Parcial | Cases recentes com problema, contribuição, decisões e próximo passo. Capturas/demonstrações sanitizadas e revalidação das demos externas continuam pendentes. |
| M11 | Parcial, com redução de JS medida | Interfaces e modais sob demanda, dependências sem uso removidas. Core Web Vitals e Lighthouse não foram medidos. |
| M12 | Implementado e verificado no CI | 16 cenários Playwright aprovados em desktop/celular, além de 19 testes de base/API/renderização. Corrigido o retorno de foco ao campo do Terminal após fechar os diálogos. |
| M13 | Implementado e verificado no CI | README, Node, exemplo de configuração, scripts e tokens compartilhados revisados; instalação limpa completa aprovada. |

Os trabalhos excluídos pelo usuário permanecem fora da seleção. Rendller foi acrescentado em 17/11/2026 como case técnico, sem registros financeiros ou links externos. A [validação da entrega anterior](https://github.com/lucasgleria/portfolio-lucas-leria/actions/runs/43696484370), conferida em 17/11/2026, aprovou instalação limpa, `release:check` e auditoria com zero vulnerabilidades nas dependências de produção. PostCSS 8.5.33 e Sharp 0.35.5 são fixados por overrides; seis ocorrências moderadas nas dependências de desenvolvimento permanecem como manutenção separada.
