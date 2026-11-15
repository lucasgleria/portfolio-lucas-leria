import type { CommandContext } from './types'
import { formatProjectCatalog } from '../data/project-catalog'

export const webProjects = (context: CommandContext) => formatProjectCatalog(context.language, 'web')
