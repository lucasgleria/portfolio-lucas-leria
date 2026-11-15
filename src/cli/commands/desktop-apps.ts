import type { CommandContext } from './types'
import { formatProjectCatalog } from '../data/project-catalog'

export const desktopApps = (context: CommandContext) => formatProjectCatalog(context.language, 'desktop')
