import { CommandContext } from "./types"


export const ler = (context: CommandContext, args:string[]) => {
    const message = args.join(' ')
    if (!message) {
        return 'Please provide a question for Ler. Example: "ler Tell me about Lucas\'s AI projects"'
    }
    // This command is handled specially in the CLI component
    return `🤖 Ler is processing your question: "${message}"`
}