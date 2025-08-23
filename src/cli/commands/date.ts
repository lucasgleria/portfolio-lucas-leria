import { CommandContext } from "./types"


export const date = (context: CommandContext) => {
    return new Date().toString()
}