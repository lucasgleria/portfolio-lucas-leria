import { CommandContext } from "./types"
import { portfolioData } from "../data/portfolio"

export const contact = (context: CommandContext) => { 
    return `Contact Information:
  📧 Email: ${portfolioData.contact.email}
  📱 Phone: +55 11 94573-5280
  📍 Location: São Paulo, Brazil
  💻 GitHub: ${portfolioData.contact.github}
  💼 LinkedIn: ${portfolioData.contact.linkedin}`
}