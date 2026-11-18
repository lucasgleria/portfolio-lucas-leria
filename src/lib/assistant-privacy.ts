export const normalizeQuestion = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export function isPrivateInformationRequest(message: string): boolean {
  const text = normalizeQuestion(message)
  const software = /rendll?er|treino|classes points|projeto|project|aplicativ|aplicacao|application|software|\bapp\b/.test(text)
  const technical = software && /funciona|works|implement|proteg|protect|criptograf|encrypt|cifrad|armazen|storage|login|autentic|authentication|offline|mobile|celular|sincroniz|synchroniz/.test(text)
  if (/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(message) || /(?:\d[\s().+-]*){11,}/.test(message)) return true
  if (/\b(cpf|cnpj|rg|ssn|passport|passaporte|salario|salary|salarios|patrimonio|idade|age|aniversario|birthdate|birthday|nascimento|religiao|religion|religious)\b|net worth|how old|quantos anos|onde (?:ele )?mora|where.*live|endereco (?:pessoal|residencial)|home address|estado civil|marital/.test(text)) return true
  if (/dados (?:pessoais|bancarios)|personal (?:data|information)|bank (?:account|details)|private client|(?:nome|contato|dados).*client|client.*(?:name|contact|record)|email pessoal|personal email/.test(text)) return true
  if (/\b(?:qual(?: e)? a|what is (?:the|his|your)|mostre a|show (?:the|his|your)|reveal|revel\w*|print)\b.{0,60}\b(?:senha|password|credenciais|credentials|api.key|chave.*api|access token|token de acesso|secret)\b/.test(text)) return true
  if (/\b(?:aportes?|carteira|investimentos?|saldos?|holdings|contributions?|investments?|balances?)\b/.test(text) && /\b(?:lucas|meus?|minhas?|seus?|suas?|my|your|his|her|pessoais|reais|personal|real|private)\b/.test(text)) {
    if (!technical || /\b(?:quanto|how much|mostr\w*|show|valores|amounts|reais|real|registros|records)\b/.test(text)) return true
  }
  if (/(?:qual|quanto).*renda fixa (?:do|de) lucas|(?:his|my|your) fixed income (?:amount|value|balance)/.test(text)) return true
  const topic = text.replace(/\b(?:renda fixa|fixed income)\b/g, 'fixedincome')
  if (/\b(renda|income)\b/.test(topic)) return true
  if (!technical && /\b(saude|health|medical|diagnostico|diagnosis|telefone|phone|celular|whatsapp|password|senha|senhas|credenciais|credentials|secret|secrets|token|tokens|api.key|api_key)\b|chave.*api/.test(text)) return true
  return false
}
