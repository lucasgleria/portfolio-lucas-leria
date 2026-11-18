# Base profissional do portfólio

Revisão: 2026-11-14. Fonte: repositório privado `lucasgleria/vault`, árvore `1bb589f4ef76cd1340672bc402c8904b41c26047`, consultada pelo conector do GitHub. A sincronização local do vault não foi alterada.

## Critério de seleção

Somente resumos profissionais necessários ao portfólio: formação, atuação, trabalhos técnicos, ferramentas e estudos atuais. As notas originais não são copiadas para o projeto, o bundle do navegador ou o contexto da IA.

Projetos de clientes são descritos por função, tecnologias e estágio, sem identificar clientes ou interlocutores. Exclusões solicitadas pelo usuário também retiram os resumos anônimos correspondentes. Não foram importados contatos, localização, idade, rotina, registros financeiros ou de saúde, religião, documentos, credenciais, registros operacionais ou achados de segurança brutos. Os canais públicos que já existiam no portfólio continuam separados da base profissional usada pelo assistente.

## Fontes verificadas

Os blobs permitem conferir a evidência no repositório privado sem publicar caminhos de notas que identificam clientes.

| ID | Conteúdo profissional aproveitado | Blob |
|---|---|---|
| V01 | Perfil: somente formação e atuação profissional | `e52e72b3c15fac4481a479f42ee58fbabf54582b` |
| V02 | Trilha de estudos BIX Technology | `00adcaa6e42f5221a6029ce98cea550d8f1e234a` |
| V03 | Fonte retirada da seleção pública por solicitação do usuário | `00a3773321d9d07d908699ea1761f6d7607f743d` |
| V04 | Fonte retirada da seleção pública por solicitação do usuário | `2ce3ef81304b0cdf2b6909b9db89561237b28047` |
| V05 | Contexto técnico da central de agentes | `452e07961aefc9d3bb753013962973f5c9d0cfd9` |
| V06 | Ecossistema profissional freelance | `a17dc37f817806a2edb39922599eae6ca6eab2bd` |
| V07 | Uso do gerador local de documentos | `f28310db97e1223734b26dac32da946d4105ca39` |
| V08 | Fonte retirada da seleção pública por solicitação do usuário | `3511f577f66c69df6e39a5e32effb06c93c6be2a` |
| V09 | Fonte retirada da seleção pública por solicitação do usuário | `19ae049bbde157e2204d7c8a4b80d1276965e311` |
| V10 | Critérios de escolha de ferramentas de automação | `9a5b9a4a0e355541c9498ebdb394e0df9affe730` |
| V11 | Treino IA: estágio de desenvolvimento | `00e8e7b9f801f055fa88b47edb4f9d9ad0f7d9e5` |
| V12 | Treino IA: contexto técnico | `6f698359300cef69e042f6b9bdf4415adfe95fbf` |
| V13 | Classes Points: estágio de desenvolvimento | `eecad891cf6cfab00b60e86ddba971d3338ab6e1` |
| V14 | Classes Points: contexto técnico | `0d8b39d7d36a52d93c82378fea6f6d75a1d29ea9` |

O produto `vault-template` foi verificado diretamente no repositório **público** `lucasgleria/vault-template`, árvore `f8f78f8899485174c465d68b600226c54c7011c2`. Este produto é separado do vault privado usado como fonte das notas profissionais.

| ID | Fonte pública | Blob |
|---|---|---|
| P01 | README do vault-template: configuração, portabilidade e continuidade | `c358548acd78577af4a0bafcd786e4bec8be2904` |
| P02 | Licença MIT do vault-template | `fec99b4370e24cb8814e75c127a2fb2ef8c6a244` |
| P03 | README atual do Rendller: finalidade, arquitetura e funcionalidades; revisão incremental em 17/11/2026 | `0a060acc1a1462a54b95a6d534aab50bd32f55ed` |
| P04 | Manifesto do Rendller: stack e scripts | `1d05e110c470cd34ebc90142eb20ee90dcfa0662` |

## Distinções preservadas

- Graduação em Banco de Dados e formação técnica em TI: confirmadas no perfil. Sem inventar datas, grau acadêmico específico ou médias.
- Trilha BIX: em andamento. Não equivale a certificação concluída.
- vault-template: produto publicado como repositório público reutilizável, com licença MIT. Não precisa de aplicação hospedada para ser distribuído. A operação depende das capacidades de acesso a arquivos e das instruções de projeto do agente escolhido.
- Treino IA: implementação publicada documentada em outubro de 2026; sem afirmar validação atual dos fluxos de produção ou entrega de Web Push. Repositório privado e nenhum registro real importado.
- Classes Points: uso docente documentado em outubro de 2026; sem afirmar implantação atual verificada, ranking combinado em uso ou PDF finalizado. Painel docente e registros reais não são vinculados ao case.
- Rendller: aplicação publicada, com links de produção, repositório e documentação autorizados pelo proprietário em 17/11/2026. Apenas finalidade, stack e fluxos de software; sem importar registros financeiros, fixtures ou prometer exatidão de projeções.
- Central de agentes: protótipo validado e supervisionado; não é apresentada como sistema autônomo.
- Gerador de documentos: ferramenta local implementada; nenhum registro real de cliente foi importado.
- As fontes V03, V04, V08 e V09 deixam de alimentar o perfil e o assistente. Os projetos excluídos pelo usuário não reaparecem como cases anônimos.
- Anos de experiência, senioridade, certificações antigas, percentuais de proficiência e ganhos de produtividade sem comprovação foram retirados dos textos de perfil e do contexto do assistente.

## Manutenção

A fonte compartilhada é `src/cli/data/professional-profile.ts`. O perfil em português e inglês, os comandos profissionais e o assistente utilizam esses dados. O catálogo `src/cli/data/productionProjects.ts` inclui vault-template, Rendller, Treino IA, Classes Points e os projetos anteriores. Links são opcionais: um resumo técnico não autoriza divulgar repositório privado ou painel operacional. As contagens são calculadas. A seleção e as pendências estão em [Revisão dos projetos recentes](recent-projects-publication-review.md).

Rendller integra o catálogo normalmente como aplicação publicada, com os links públicos autorizados pelo proprietário. Relatórios privados de auditoria ficam na pasta ignorada `tmp/`, separados dos arquivos destinados à publicação e do contexto do assistente; a autorização dos links não equivale à conclusão dessa revisão independente. O assistente reconhece as grafias Rendller e Rendler e recusa pedidos de registros financeiros pessoais.

O assistente recebe apenas fatos profissionais pertinentes ao assunto, nunca notas brutas. Perguntas sobre dados privados são recusadas antes de qualquer chamada externa; trocas privadas também são removidas do histórico encaminhado ao provedor. Histórico de conversa não é evidência sobre Lucas. O contexto da aba limita-se a quatro trocas completas e não é persistido em banco ou armazenamento do navegador.

`GOOGLE_API_KEY` ou `GEMINI_API_KEY` habilita a geração; `GOOGLE_MODEL` é uma substituição opcional do modelo estável padrão. Na ausência de credenciais válidas, no limite de geração ou diante de uma saída inválida, respostas factuais locais continuam disponíveis. Links vêm exclusivamente do catálogo autorizado. Não há segredo ou valor de credencial neste documento.

A revisão não altera nem publica o currículo hospedado externamente. Os links públicos previamente cadastrados são preservados.

