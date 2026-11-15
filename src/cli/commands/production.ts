import { CommandContext } from "./types"


export const production = (context: CommandContext) => {
    const {setShowProductionModal} = context
    
    setShowProductionModal(true)
    return context.language === 'pt-BR' ? 'Abrindo projetos, produtos e cases...' : 'Opening projects, products and technical cases...'
}
