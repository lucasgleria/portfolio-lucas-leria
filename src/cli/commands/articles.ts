import { CommandContext } from "./types"

export const articles = (context: CommandContext) => { 
    const { setShowArticlesModal } = context

    setShowArticlesModal(true)
    return context.language === 'pt-BR' ? 'Abrindo artigos...' : 'Opening articles...'
}
