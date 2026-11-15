export function rememberCommand(history: string[], command: string): string[] {
  return history.at(-1) === command ? history : [...history, command].slice(-20)
}

export function navigateHistory(commands: string[], input: string, index: number, draft: string, direction: 'up' | 'down') {
  if (!commands.length) return { input, index: -1, draft }
  if (direction === 'up') {
    const next = Math.min(index + 1, commands.length - 1)
    return { input: commands[commands.length - 1 - next], index: next, draft: index === -1 ? input : draft }
  }
  if (index === -1) return { input, index, draft }
  const next = index - 1
  return { input: next === -1 ? draft : commands[commands.length - 1 - next], index: next, draft }
}
