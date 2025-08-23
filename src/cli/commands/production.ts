import { CommandContext } from "./types"


export const production = (context: CommandContext) => {
    const {setShowProductionModal} = context
    
    setShowProductionModal(true)
    return 'Opening production projects viewer...'
}