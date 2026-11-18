# Qualidade das respostas do assistente

Revisão motivada pelo relato de respostas genéricas ou erradas. As consultas de diagnóstico ao site retornaram o modo `professional-profile`; esse resultado, isoladamente, não distingue credenciais ausentes de falha do provedor.

| Pergunta observada | Antes | Comportamento corrigido |
|---|---|---|
| Qual é o link do Rendller? | Descrição sem link | Ações para aplicação, código, documentação e página do projeto |
| Quais são os projetos de inteligência artificial? | Lista misturando outras categorias e ferramentas locais | Somente projetos selecionados na categoria de IA |
| Qual é o prazo para desenvolver um projeto? | Lista de projetos que não responde à pergunta | Informa que o dado não está confirmado |
| E quais são as tecnologias? | Perde o projeto da pergunta anterior | Mantém o assunto da conversa ou esclarece uma ambiguidade |
| Como funciona o login por senha no Rendller? | Podia ser confundida com pedido de credenciais | Explica somente os fluxos documentados do software |

## Implementação

- Recuperação de fatos por projeto, categoria e assunto usando o catálogo compartilhado, suas traduções e os cases existentes.
- Histórico limitado a oito mensagens alternadas, quatro trocas completas e 12.000 caracteres. Trocas privadas e falhas não viram contexto de geração.
- Respostas desconhecidas pedem esclarecimento ou reconhecem a ausência da informação. Não são preenchidas com a biografia.
- Links estruturados do catálogo, renderizados como ações; URLs não são geradas pelo modelo.
- Integração REST com Gemini, substituindo o SDK legado. A chave pode usar o nome `GOOGLE_API_KEY` ou `GEMINI_API_KEY`, com modelo estável padrão e opção de substituição.
- Saída estruturada com referências aos fatos selecionados. Referências inválidas, URLs geradas, números sem suporte e respostas incompletas usam o resultado local.
- Idioma explícito no pedido ao modelo. Perguntas rápidas localizadas, painel lateral com a resposta recebida e reinício de conversa com cancelamento.

## Validação

A suíte inclui regressões das perguntas acima, continuidade e troca de assunto, recusa de registros privados, descarte de histórico privado, limites de entrada, integração de modelo simulada, validação de referências e renderização segura de links. Testes de navegador cobrem continuação, nova conversa e atualização do painel lateral em desktop e celular. A simulação de um provedor não comprova que a hospedagem tenha uma chave válida ou acesso ao modelo; isso deve ser observado separadamente em produção.

O orçamento de geração continua limitado por processo de servidor. Uma cota compartilhada entre instâncias requer infraestrutura própria e não foi criada nesta correção.

## Referências técnicas

- [API de geração e conversas](https://aistudio.google.com/api-reference/generate-content)
- [Saídas estruturadas](https://aistudio.google.com/docs/structured-output)
- [Modelo estável padrão](https://aistudio.google.com/docs/models/gemini-3.1-flash-lite)
- [Bibliotecas atuais e situação do SDK legado](https://ai.google.dev/gemini-api/docs/libraries)
