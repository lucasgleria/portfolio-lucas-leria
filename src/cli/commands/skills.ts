import { CommandContext } from "./types"
import { skillCategories } from "../data/skills"

export const skills = (context: CommandContext) => {
      let output = "Technical Skills by Category:\n\n"
      Object.entries(skillCategories).forEach(([category, skills]) => {
        output += `${category}:\n`
        skills.forEach(skill => output += `  • ${skill}\n`)
        output += "\n"
      })
      return output
}
