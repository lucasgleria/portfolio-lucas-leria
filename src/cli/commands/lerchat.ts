import { CommandContext } from "./types"


export const lerchat = (context: CommandContext) => {
    const {setShowLerChatModal} = context

    setShowLerChatModal(true)
    return '🖥️  Opening Ler Chat desktop application...'
}