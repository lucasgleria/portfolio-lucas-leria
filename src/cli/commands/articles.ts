import { CommandContext } from "./types"

export const articles = (context: CommandContext) => { 
    const { setShowArticlesModal } = context

    setShowArticlesModal(true)
    return 'Opening articles viewer...'
}