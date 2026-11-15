import type { CommandContext } from './types'
import { formatProjectCatalog } from '../data/project-catalog'

export const aiProjects = (context: CommandContext) => formatProjectCatalog(context.language, 'ai')
