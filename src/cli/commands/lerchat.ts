import { CommandContext } from "./types"


export const lerchat = (context: CommandContext) => {
    const {setShowLerChatModal} = context

    setShowLerChatModal(true)
    return context.language === 'pt-BR' ? 'Abrindo conversa com Ler...' : 'Opening chat with Ler...'
}
