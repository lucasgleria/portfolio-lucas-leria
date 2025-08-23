import { CommandContext } from "./types"


export const gameProjects = (context: CommandContext) => {
    const webProjects = [
      {
         name: "FlappyZap",
         description: "WhatsApp-themed Game",
         tech: ["Python", "Pygame", "-", "-", "-"],
         highlight: "A classic game parody to learn Pygame"
        },
        {
         name: "Mystical Number Castle",
         description: "Web-based guessing game",
         tech: ["Vue.js", "Vite", "Pinia", "Node.js", "SCSS"],
         highlight: "Modern web remake of a classic CLI game"
        },
        {
         name: "The Froca",
         description: "A web-based hangman game",
         tech: ["Python", "FastAPI", "Vanilla JS", "Tailwind CSS", "SCSS"],
         highlight: "Hangman game with a dedicated RESTful API"
        }
      ]

      let output = "Game Development (3 projects):\n\n"
      webProjects.forEach(project => {
        output += `📁 ${project.name}\n`
        output += `   ${project.description}\n`
        output += `   Technologies: ${project.tech.join(', ')}\n`
        output += `   Highlight: ${project.highlight}\n\n`
      })
      return output
}