import type { CommandContext } from './types'
import { formatProjectCatalog } from '../data/project-catalog'

export const gameProjects = (context: CommandContext) => formatProjectCatalog(context.language, 'games')
