import type { CommandContext } from './types'
import { formatProjectCatalog } from '../data/project-catalog'

export const projects = (context: CommandContext) => formatProjectCatalog(context.language)
