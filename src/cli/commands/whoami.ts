import { CommandContext } from "./types"


export const whoami = (context: CommandContext) => {
    return `User: portfolio-visitor\nAccess: guest\nSession: ${new Date().toISOString()}\nViewing: Lucas Leria's Portfolio CLI`
}