import { CommandContext } from "./types"


export const resume = (context: CommandContext) => {
    const {setShowResumeModal} = context
    setShowResumeModal(true)
    return context.language === 'pt-BR' ? 'Abrindo perfil profissional...' : 'Opening professional profile...'
}
