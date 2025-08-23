import { CommandContext } from "./types"
import { portfolioData } from "../data/portfolio"

export const about = (context: CommandContext) => {
    return portfolioData.about
}