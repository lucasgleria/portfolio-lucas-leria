import { CommandContext } from "./types"


export const resume = (context: CommandContext) => {
    const {setShowResumeModal} = context
    setShowResumeModal(true)
      return 'Opening resume viewer...'
}