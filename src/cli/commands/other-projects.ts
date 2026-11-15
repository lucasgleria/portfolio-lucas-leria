import type { CommandContext } from './types'
import { formatProjectCatalog } from '../data/project-catalog'

export const otherProjects = (context: CommandContext) => formatProjectCatalog(context.language, 'systems')
